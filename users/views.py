from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Data, Service, Booking
<<<<<<< HEAD
from .serializers import DataSerializer, ServiceSerializer, BookingSerializer,DataSerializer_admin,DataSerializer_booking,DoctorSerializer
=======
from .serializers import DataSerializer, ServiceSerializer, BookingSerializer, \
    DataSerializer_admin,DataSerializer_booking,DoctorSerializer, ResultsSerializer
>>>>>>> c58fda9fdd2e737f1420e4d7ad4c692338e2056e
from .pagination import CustomPagination
from django.db.models import Q
from django.db import transaction


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.has_doctor_role()

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'ADMIN'

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
    serializer = DataSerializer_admin(data=request.data)
    if serializer.is_valid():
        data = serializer.save()
        response_serializer = DataSerializer_admin(data)
        return Response({
            'message': 'Tạo người dùng thành công!',
            'data': response_serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Đăng ký không thành công.',
        'errors': serializer.errors  
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
                'avatar': serializer.data['avatar'],
                'address': serializer.data['address'],
                'isBooking': serializer.data['isBooking'],
                'birthDay': serializer.data['birthDay']
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
                'Bạn phải là ADMIN mới có thể truy cập được API này 👍'
                'aaa'
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
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def admin_delete_user(request):
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
        filters = Q()
        if phone:
            filters &= Q(phone=phone)
        if fullname:
            filters &= Q(fullname=fullname)
        if role:
            filters &= Q(role=role)
        users = Data.objects.filter(filters)
        if not users.exists():
            return Response({
                "message": "Không tìm thấy user với các điều kiện đã chọn."
            }, status=status.HTTP_404_NOT_FOUND)
        paginator = CustomPagination()
        paginated_users = paginator.paginate_queryset(users, request)
        serializer = DataSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response({
            "error": f"Đã xảy ra lỗi: {str(e)}"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_get_in_for_booking(request):
    if not hasattr(request.user, 'role') or request.user.role != 'ADMIN':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    bookings = Booking.objects.all()
    paginator = CustomPagination()
    paginated_bookings = paginator.paginate_queryset(bookings, request)
    serializer = BookingSerializer(paginated_bookings, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def Admin_Update_user(request):
    if not hasattr(request.user, 'role') or request.user.role != 'ADMIN':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    phone = request.data.get('phone')
    fullname = request.data.get('fullname')
    birthDay = request.data.get('birthDay')
    address = request.data.get('address')
    avatar = request.data.get('avatar')

    if  not phone:
        return Response({'message': 'Thiếu thông tin phone'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = Data.objects.get(phone=phone)
    except Data.DoesNotExist:
        return Response({'message': 'User không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)
    user.fullname = fullname if fullname else user.fullname
    user.birthDay = birthDay if birthDay else user.birthDay
    user.address = address if address else user.address
    user.avatar = avatar if avatar else user.avatar
    user.save()
    serializer = DataSerializer(user)
    return Response({
        'message': 'Cập nhật thông tin thành công.',
        'data': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Register_booking(request):
    if not hasattr(request.user, 'role') or (request.user.role != 'ADMIN' and request.user.role != 'USER'):
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc USER để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    serializer = DataSerializer_booking(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                account = serializer.validated_data.get('account')
                try:
                    user = Data.objects.get(phone=account)
                except Data.DoesNotExist:
                    return Response({
                        'message': 'Đặt lịch không thành công.',
                        'error': f'Số điện thoại {account} không tồn tại trong hệ thống.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                if user.isBooking:
                    return Response({
                        'message': 'Đặt lịch không thành công.',
                        'error': f'Người dùng với số điện thoại {account} đã có lịch hẹn. Vui lòng hoàn thành hoặc hủy lịch hẹn hiện tại trước khi đặt lịch mới.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                booking = serializer.save()
                user.isBooking = True
                user.save()
                response_serializer = DataSerializer_booking(booking)
                return Response({
                    'message': 'Đặt lịch thành công!',
                    'data': response_serializer.data
                }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'message': 'Đặt lịch không thành công.',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({
        'message': f"Đặt lịch không thành công. Lỗi: {serializer.errors}"
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_booking(request):
    if not hasattr(request.user, 'role') or request.user.role not in ['ADMIN', 'USER']:
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc USER để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    phone = request.query_params.get('phone')
    if not phone:
        return Response({
            'message': 'Thiếu tham số phone trong query params.',
        }, status=status.HTTP_400_BAD_REQUEST)
    try:
        booking = Booking.objects.get(account=phone)
    except Booking.DoesNotExist:
        return Response({
            'message': f'Không tìm thấy lịch hẹn cho số điện thoại {phone}.',
        }, status=status.HTTP_404_NOT_FOUND)

    if request.user.role == 'USER' and booking.account != request.user.phone:
        return Response({
            'message': 'Unauthorized: Bạn không có quyền xóa lịch hẹn này.',
        }, status=status.HTTP_403_FORBIDDEN)

    try:
        with transaction.atomic():
            booking.delete()
            user = Data.objects.get(phone=phone)
            user.isBooking = False
            user.save()

        return Response({
            'message': 'Xóa lịch hẹn thành công.',
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': f'Lỗi khi xóa lịch hẹn: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_booking(request):
    if not hasattr(request.user, 'role') or request.user.role not in ['ADMIN', 'USER']:
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc USER để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    account = request.data.get('account')
    if not account:
        return Response({
            'message': 'Thiếu thông tin account để tìm booking.',
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        booking = Booking.objects.get(account=account)
    except Booking.DoesNotExist:
        return Response({
            'message': f'Không tìm thấy lịch hẹn cho account {account}.',
        }, status=status.HTTP_404_NOT_FOUND)

    if request.user.role == 'USER' and booking.account != request.user.phone:
        return Response({
            'message': 'Unauthorized: Bạn không có quyền cập nhật lịch hẹn này.',
        }, status=status.HTTP_403_FORBIDDEN)

    serializer = BookingSerializer(booking, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Cập nhật lịch hẹn thành công.',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    
    return Response({
        'message': 'Cập nhật không thành công.',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def Update_user(request):
    if not hasattr(request.user, 'role') or request.user.role != 'USER':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền USER để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    phone = request.data.get('phone')
    fullname = request.data.get('fullname')
    birthDay = request.data.get('birthDay')
    address = request.data.get('address')
    password = request.data.get('password')

    if not phone:
        return Response({'message': 'Thiếu thông tin phone'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = Data.objects.get(phone=phone)
    except Data.DoesNotExist:
        return Response({'message': 'User không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)
    user.fullname = fullname if fullname else user.fullname
    user.birthDay = birthDay if birthDay else user.birthDay
    user.address = address if address else user.address
    if password:
        user.set_password(password)
    user.save()
    refresh = RefreshToken.for_user(user)
    user_data = DataSerializer(user).data
    return Response({
        'message': 'Cập nhật không thành công.',
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_results_slip(request):
    if not hasattr(request.user, 'role') or (request.user.role != 'ADMIN' and request.user.role != 'Doctor'):
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)  
        
    serializer = ResultsSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.save()
        response_serializer = ResultsSerializer(data)
        return Response({
            'message': 'Cập nhật thành công!',
            'data': response_serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Cập nhật không thành công!',
        'errors': serializer.errors  
    }, status=status.HTTP_400_BAD_REQUEST)
