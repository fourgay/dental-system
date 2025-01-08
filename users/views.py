from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Data, Service, Booking
from .serializers import DataSerializer, DoctorSerializer, ServiceSerializer, BookingSerializer
from rest_framework.pagination import PageNumberPagination
import random
from .pagination import CustomPagination

class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_doctor()

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'ADMIN'

class StandardresultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['POST'])
def register(request):
    serializer = DataSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.save()
        response_serializer = DataSerializer(data)
        return Response({
            'message': 'Tạo người dùng thành công!',
            'data': response_serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Đăng ký không thành công.',
        'errors': serializer.errors  # Include detailed error messages
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    phone = request.data.get('phone')
    password = request.data.get('password')
    user = authenticate(request, phone=phone, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        user_data = DataSerializer(user).data
        return Response({
            'message': 'Đăng nhập thành công',
            'data': {
                'access_token': str(refresh.access_token),
                'user': {
                    'id': user_data['id'],
                    'fullname': user_data['fullname'],
                    'phone': user_data['phone'],
                    'role': user_data['role'],  
                    'avatar': user_data.get('avatar', 'default_avatar.png')
                }
            }
        }, status=status.HTTP_200_OK)
    return Response({'message': 'Thông tin đăng nhập không chính xác'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_register(request):
    if request.user.role != 'ADMIN':
        return Response({
            'message': 'Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)',
        }, status=status.HTTP_401_UNAUTHORIZED)
    serializer = DataSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.save()
        response_serializer = DataSerializer(data)
        return Response({
            'message': 'Tạo người dùng thành công!',
            'data': response_serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Đăng ký không thành công.',
        'errors': serializer.errors  # Include detailed error messages
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = DataSerializer(user)
    return Response({
        'message': '',
        'data': {
            'user': {
                'id': serializer.data['id'],
                'fullname': serializer.data['fullname'],
                'phone': serializer.data['phone'],
                'role': serializer.data['role'],
                'avatar': serializer.data['avatar']
            }
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request, user_id):
    try:
        user = Data.objects.get(id=user_id)
    except Data.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = DataSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_doctors(request):
    if request.user.role != 'ADMIN':
            messages = [
                'Bạn phải là ADMIN mới có thể truy cập được API này 👍',
                'Gà thì không có quyền dùng API này đâu 🚫',
                'Búng cu đi rồi cho dùng API'
            ]
            return Response({
                'message': random.choice(messages)  
            }, status=status.HTTP_401_UNAUTHORIZED)
    doctors = Data.objects.filter(role='DOCTOR')
    paginator = CustomPagination()
    paginated_doctors = paginator.paginate_queryset(doctors, request)
    serializer = DoctorSerializer(paginated_doctors, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_services(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response({
        'message': '',
        'data': serializer.data
    }, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_users(request):
#     if request.user.role != 'ADMIN':
#             messages = [
#                 'Bạn phải là ADMIN mới có thể truy cập được API này 👍',
#                 'Gà thì không có quyền dùng API này đâu 🚫',
#                 'Búng cu đi rồi cho dùng API'
#             ]
#             return Response({
#                 'message': random.choice(messages)  
#             }, status=status.HTTP_401_UNAUTHORIZED)
#     users = Data.objects.all()
#     paginator = CustomPagination()
#     paginated_users = paginator.paginate_queryset(users, request)
#     serializer = DataSerializer(paginated_users, many=True)
#     return paginator.get_paginated_response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def admin_delete(request):
    if not hasattr(request.user, 'role') or request.user.role != 'ADMIN':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    phone = request.query_params.get('phone')
    fullname = request.query_params.get('fullname') 
    if not phone:
        return Response({"error": "Thiếu tham số phone trong query params."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = Data.objects.get(phone=phone)
        user.delete()
        fullname_display = fullname if fullname else user.fullname
        return Response({"message": f"User với tên là {fullname_display} và phone {phone} đã được xoá thành công."}, status=status.HTTP_200_OK)
    except Data.DoesNotExist:
        return Response({"error": f"Không tìm thấy user với phone {phone}."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": f"Đã xảy ra lỗi: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    if not hasattr(request.user, 'role') or request.user.role != 'ADMIN':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    phone = request.query_params.get('phone')
    fullname = request.query_params.get('fullname')
    role = request.query_params.get('role')

    try:
        #tim theo phone
        if phone:
            users = Data.objects.filter(phone=phone)
            if not users.exists():
                return Response({"message": f"Không tìm thấy user với phone {phone}."}, status=status.HTTP_404_NOT_FOUND)
            paginator = CustomPagination()
            paginated_users = paginator.paginate_queryset(users, request)
            serializer = DataSerializer(paginated_users, many=True)
            return paginator.get_paginated_response(serializer.data)
        #tim theo role
        if role:
            users = Data.objects.filter(role=role)
            if not users.exists():
                return Response({"message": f"Không tìm thấy user với role {role}."}, status=status.HTTP_404_NOT_FOUND)
            paginator = CustomPagination()
            paginated_users = paginator.paginate_queryset(users, request)
            serializer = DataSerializer(paginated_users, many=True)
            return paginator.get_paginated_response(serializer.data)
            #tim theo ten
        if fullname:
            users = Data.objects.filter(fullname__icontains=fullname)
            if not users.exists():
                return Response({"error": f"Không tìm thấy user với fullname chứa {fullname}."}, status=status.HTTP_404_NOT_FOUND)
            paginator = CustomPagination()
            paginated_users = paginator.paginate_queryset(users, request)
            serializer = DataSerializer(paginated_users, many=True)
            return paginator.get_paginated_response(serializer.data)
        users = Data.objects.all()
        paginator = CustomPagination()
        paginated_users = paginator.paginate_queryset(users, request)
        serializer = DataSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Data.DoesNotExist:
        return Response({"error": f"Không tìm thấy user với phone {phone}."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": f"Đã xảy ra lỗi: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_booking(request):
    if not hasattr(request.user, 'role') or request.user.role != 'ADMIN':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    bookings = Booking.objects.all()
    paginator = CustomPagination()
    paginated_bookings = paginator.paginate_queryset(bookings, request)
    serializer = BookingSerializer(paginated_bookings, many=True)
    return paginator.get_paginated_response(serializer.data)