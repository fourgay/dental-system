from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Data, Service, Booking, Result, TimeWorking, TableAvatar
from .serializers import DataSerializer, ServiceSerializer, BookingSerializer, \
    DataSerializer_admin,DataSerializer_booking,DoctorSerializer, ResultSerializer,\
    TimeWorkingSerializer,CustomTimeWorkingSerializer,AvatarSerializer
from .pagination import CustomPagination
from django.db.models import Q
from django.db import transaction
import re
 

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
    fullname = request.query_params.get('fullname')
    phone = request.query_params.get('phone')
    work = request.query_params.get('work')

    filters = Q(role='DOCTOR')  # Lọc kết quả theo vai trò bác sĩ
    if fullname:
        filters &= Q(fullname__icontains=fullname)
    if phone:
        filters &= Q(phone__icontains=phone)
    if work:
        filters &= Q(work__icontains=work)

    try:
        doctors = Data.objects.filter(filters)
        if not doctors.exists():
            return Response({
                'message': 'Không tìm thấy kết quả với các điều kiện đã chọn.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        paginator = CustomPagination()
        paginated_doctors = paginator.paginate_queryset(doctors, request)
        serializer = DoctorSerializer(paginated_doctors, many=True)
        return Response({
            'message': '',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': f'Đã xảy ra lỗi: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_services(request):
    name = request.query_params.get('name')
    title = request.query_params.get('title')
    detail = request.query_params.get('detail')

    # Tạo bộ lọc
    filters = Q()
    if name:
        filters &= Q(name__icontains=name)
    if title:
        filters &= Q(title__icontains=title)
    if detail:
        filters &= Q(detail__icontains=detail)

    # Lọc danh sách dịch vụ
    services = Service.objects.filter(filters)

    # Phân trang
    paginator = CustomPagination()
    paginated_services = paginator.paginate_queryset(services, request)
    
    serializer = ServiceSerializer(paginated_services, many=True)
    
    return paginator.get_paginated_response(serializer.data)
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
            filters &= Q(phone__icontains=phone)  
        if fullname:
            filters &= Q(fullname__icontains=fullname)
        if role:
            filters &= Q(role__iexact=role)  

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

    # Lấy các tham số lọc từ query params
    fullname = request.query_params.get('fullname')
    account = request.query_params.get('account')
    service = request.query_params.get('service')
    doctor = request.query_params.get('doctor')

    # Tạo bộ lọc
    filters = Q()
    if fullname:
        filters &= Q(fullname__icontains=fullname)
    if account:
        filters &= Q(account__icontains=account)
    if service:
        filters &= Q(service__icontains=service)
    if doctor:
        filters &= Q(doctor__icontains=doctor)

    # Lọc các booking theo bộ lọc
    bookings = Booking.objects.filter(filters)
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
    password = request.data.get('password')
    role = request.data.get('role')
    work = request.data.get('work') 

    if not phone:
        return Response({'message': 'Thiếu thông tin phone'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = Data.objects.get(phone=phone)
    except Data.DoesNotExist:
        return Response({'message': 'Người dùng không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)

    user.fullname = fullname if fullname else user.fullname
    user.birthDay = birthDay if birthDay else user.birthDay
    user.address = address if address else user.address
    user.avatar = avatar if avatar else user.avatar
    user.role = role if role else user.role
    user.work = work if work else user.work
    if password:
        user.set_password(password)  # Hash the new password

    user.save()
    
    serializer = DataSerializer(user)
    return Response({
        'message': 'Cập nhật thông tin thành công.',
        'data': serializer.data
    }, status=status.HTTP_200_OK)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Register_booking(request):
    user = request.user
    if not hasattr(user, 'role') or (user.role != 'ADMIN' and user.role != 'DOCTOR'):
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    serializer = DataSerializer_booking(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                account = serializer.validated_data.get('account')
                doctor_phone = serializer.validated_data.get('Doctor_phone')
                
                if user.role == 'DOCTOR' and user.phone != doctor_phone:
                    return Response({
                        'message': 'Unauthorized: Số điện thoại của bạn không khớp với Doctor_phone.',
                    }, status=status.HTTP_403_FORBIDDEN)
                
                try:
                    user_data = Data.objects.get(phone=account)
                except Data.DoesNotExist:
                    return Response({
                        'message': 'Đặt lịch không thành công.',
                        'error': f'Số điện thoại {account} không tồn tại trong hệ thống.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                if user_data.isBooking:
                    return Response({
                        'message': 'Đặt lịch không thành công.',
                        'error': f'Người dùng với số điện thoại {account} đã có lịch hẹn. Vui lòng hoàn thành hoặc hủy lịch hẹn hiện tại trước khi đặt lịch mới.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                booking = serializer.save()
                user_data.isBooking = True
                user_data.save()
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
        'message': 'Đặt lịch không thành công.',
        'error': serializer.errors
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
    user = request.user
    if not hasattr(user, 'role') or (user.role != 'ADMIN' and user.role != 'DOCTOR'):
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    account = request.data.get('account')
    doctor_phone = request.data.get('Doctor_phone')
    
    if user.role == 'DOCTOR' and user.phone != doctor_phone:
        return Response({
            'message': 'Unauthorized: Số điện thoại của bạn không khớp với Doctor_phone.',
        }, status=status.HTTP_403_FORBIDDEN)

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
    phone = request.data.get('phone')
    fullname = request.data.get('fullname')
    birthDay = request.data.get('birthDay')
    address = request.data.get('address')
    password = request.data.get('password')
    work = request.data.get('work')
    avatar = request.data.get('avatar')

    if not phone:
        return Response({'message': 'Thiếu thông tin phone'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = Data.objects.get(phone=phone)
    except Data.DoesNotExist:
        return Response({'message': 'User không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)
    user.fullname = fullname if fullname else user.fullname
    user.birthDay = birthDay if birthDay else user.birthDay
    user.address = address if address else user.address
    user.work = work if work else user.work
    user.avatar = avatar if avatar else user.avatar
    if password: 
        user.set_password(password)
    user.save()
    refresh = RefreshToken.for_user(user)
    user_data = DataSerializer(user).data
    return Response({
        'message': 'Cập nhật thành công.',
        'data': {
            'access_token': str(refresh.access_token),
            'user': {
                'id': user_data['id'],
                'fullname': user_data['fullname'],
                'phone': user_data['phone'],
                'role': user_data['role'],  
                'birthDay': user_data['birthDay'],
                'address': user_data['address'],
                'avatar': user_data.get('avatar')
            }
        }
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_result(request):
    user = request.user
    if not hasattr(user, 'role') or (user.role != 'ADMIN' and user.role != 'DOCTOR'):
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    result_serializer = ResultSerializer(data=request.data)
    if result_serializer.is_valid():
        result = result_serializer.save()

        account = result.account
        doctor_phone = request.data.get('Doctor_phone')
        
        if user.role == 'DOCTOR' and user.phone != doctor_phone:
            return Response({
                'message': 'Unauthorized: Số điện thoại của bạn không khớp với Doctor_phone.',
            }, status=status.HTTP_403_FORBIDDEN)

        try:
            user_data = Data.objects.get(phone=account)
            user_data.isBooking = False
            user_data.save()
        except Data.DoesNotExist:
            return Response({
                'message': 'Tạo kết quả thành công, nhưng không tìm thấy tài khoản để cập nhật isBooking.',
                'data': result_serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'message': 'Tạo kết quả thành công!',
            'data': result_serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'message': 'Tạo kết quả không thành công.',
        'errors': result_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)@permission_classes([IsAuthenticated])
def delete_result(request):
    if not hasattr(request.user, 'role') or request.user.role not in ['ADMIN', 'DOCTOR']:
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    result_id = request.query_params.get('id')
    account = request.query_params.get('account')
    if not result_id or not account:
        return Response({
            'message': 'Thiếu tham số id hoặc account trong query params.',
        }, status=status.HTTP_400_BAD_REQUEST)
    try:
        result = Result.objects.get(id=result_id, account=account)
    except Result.DoesNotExist:
        return Response({
            'message': f'Không tìm thấy kết quả cho tài khoản có số điện thoại {account} với id {result_id}.',
        }, status=status.HTTP_404_NOT_FOUND)
    except Result.MultipleObjectsReturned:
        return Response({
            'message': f'Có nhiều kết quả cho tài khoản có số điện thoại {account} với id {result_id}.',
        }, status=status.HTTP_400_BAD_REQUEST)

    if request.user.role == 'USER' and result.account != request.user.phone:
        return Response({
            'message': 'Unauthorized: Bạn không có quyền truy cập mục này.',
        }, status=status.HTTP_403_FORBIDDEN)

    try:
        with transaction.atomic():
            result.delete()
            user = Data.objects.get(phone=account)
            user.isBooking = False
            user.save()

        return Response({
            'message': 'Xóa kết quả thành công.',
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': f'Lỗi khi xóa kết quả: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def Update_Result(request):
    if not hasattr(request.user, 'role') or request.user.role not in ['ADMIN', 'DOCTOR']:
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    result_id = request.data.get('id')
    account = request.data.get('account')
    if not result_id or not account:
        return Response({
            'message': 'Thiếu tham số id hoặc account trong dữ liệu gửi lên.',
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        result = Result.objects.get(id=result_id, account=account)
    except Result.DoesNotExist:
        return Response({
            'message': f'Không tìm thấy kết quả cho tài khoản có số điện thoại {account} với id {result_id}.',
        }, status=status.HTTP_404_NOT_FOUND)
    except Result.MultipleObjectsReturned:
        return Response({
            'message': f'Có nhiều kết quả cho tài khoản có số điện thoại {account} với id {result_id}.',
        }, status=status.HTTP_400_BAD_REQUEST)

    serializer = ResultSerializer(result, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Cập nhật kết quả thành công.',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    return Response({
        'message': 'Cập nhật không thành công.',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def get_all_results(request):
    if not hasattr(request.user, 'role') or request.user.role not in ['ADMIN', 'DOCTOR']:
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN hoặc DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)

    fullname = request.query_params.get('fullname')
    account = request.query_params.get('account')
    service = request.query_params.get('service')
    doctor = request.query_params.get('doctor')

    filters = Q()
    if fullname:
        filters &= Q(fullname__icontains=fullname)
    if account:
        filters &= Q(account__icontains=account)
    if service:
        filters &= Q(service__icontains=service)
    if doctor:
        filters &= Q(doctor__icontains=doctor)

    try:
        results = Result.objects.filter(filters)
        if not results.exists():
            return Response({
                'message': 'Không tìm thấy kết quả với các điều kiện đã chọn.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        paginator = CustomPagination()
        paginated_results = paginator.paginate_queryset(results, request)
        serializer = ResultSerializer(paginated_results, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({
            'error': f'Đã xảy ra lỗi: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#api doctor
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsDoctor])
def Doctor_get_results(request):
    if not hasattr(request.user, 'role') or request.user.role != 'DOCTOR':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    doctor_phone = request.user.phone  # Lấy số điện thoại của bác sĩ từ request user
    fullname = request.query_params.get('fullname')
    account = request.query_params.get('account')
    service = request.query_params.get('service')

    filters = Q(Doctor_phone=doctor_phone)  # Lọc kết quả theo số điện thoại của bác sĩ
    if fullname:
        filters &= Q(fullname__icontains=fullname)
    if account:
        filters &= Q(account__icontains=account)
    if service:
        filters &= Q(service__icontains=service)

    try:
        results = Result.objects.filter(filters)
        if not results.exists():
            return Response({
                'message': 'Không tìm thấy kết quả với các điều kiện đã chọn.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        paginator = CustomPagination()
        paginated_results = paginator.paginate_queryset(results, request)
        serializer = ResultSerializer(paginated_results, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({
            'error': f'Đã xảy ra lỗi: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsDoctor])
def Doctor_get_booking(request):
    if not hasattr(request.user, 'role') or request.user.role != 'DOCTOR':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền DOCTOR để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    doctor_phone = request.user.phone  # Lấy số điện thoại của bác sĩ từ request user
    fullname = request.query_params.get('fullname')
    account = request.query_params.get('account')
    service = request.query_params.get('service')

    filters = Q(Doctor_phone=doctor_phone)  # Lọc kết quả theo số điện thoại của bác sĩ
    if fullname:
        filters &= Q(fullname__icontains=fullname)
    if account:
        filters &= Q(account__icontains=account)
    if service:
        filters &= Q(service__icontains=service)

    try:
        bookings = Booking.objects.filter(filters)
        if not bookings.exists():
            return Response({
                'message': 'Không tìm thấy kết quả với các điều kiện đã chọn.'
            }, status=status.HTTP_404_NOT_FOUND)
        paginator = CustomPagination()
        paginated_Bookings = paginator.paginate_queryset(bookings, request)
        serializer = BookingSerializer(paginated_Bookings, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({
            'error': f'Đã xảy ra lỗi: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_create_tableWorking(request):
    if request.user.role != 'ADMIN':
        return Response({
            'message': 'Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)',
        }, status=status.HTTP_401_UNAUTHORIZED)
    serializer = TimeWorkingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Tạo bảng thời gian làm việc thành công!',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Tạo bảng thời gian làm việc thất bại!',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_update_tableWorking(request):
    if not hasattr(request.user, 'role') or request.user.role not in ['ADMIN']:
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    id = request.data.get('id')
    if not id:
        return Response({
            'message': 'Thiếu thông tin id của bảng thời gian làm việc.',
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        time_working = TimeWorking.objects.get(id=id)
    except time_working.DoesNotExist:
        return Response({
            'message': 'Không tìm thấy bảng thời gian làm việc.',
        }, status=status.HTTP_404_NOT_FOUND)

    time_working_serializer = TimeWorkingSerializer(time_working, data=request.data, partial=True)
    if time_working_serializer.is_valid():
        time_working_serializer.save()
        return Response({
            'message': 'Cập nhật bảng thời gian làm việc thành công!',
            'data': time_working_serializer.data
        }, status=status.HTTP_200_OK)
    return Response({
        'message': 'Cập nhật bảng thời gian làm việc thất bại!',
        'errors': time_working_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_delete_tableWorking(request):
    if request.user.role != 'ADMIN':
        return Response({
            'message': 'Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)',
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    id = request.query_params.get('id')
    if not id:
        return Response({
            'message': 'Thiếu thông tin id của bảng thời gian làm việc.',
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        time_working = TimeWorking.objects.get(id=id)
        time_working.delete()
        return Response({
            'message': 'Xóa bảng thời gian làm việc thành công!',
        }, status=status.HTTP_200_OK)
    except TimeWorking.DoesNotExist:
        return Response({
            'message': 'Không tìm thấy bảng thời gian làm việc.',
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'message': f'Lỗi khi xóa bảng thời gian làm việc: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_get_results(request):
    account = request.query_params.get('account')

    if not account:
        return Response({
            'message': 'Vui lòng cung cấp số điện thoại.'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        results = Result.objects.filter(account__icontains=account)
        if not results.exists():
            return Response({
                'message': 'Không tìm thấy kết quả cho số điện thoại này.'
            }, status=status.HTTP_404_NOT_FOUND)

        paginator = CustomPagination()
        paginated_results = paginator.paginate_queryset(results, request)
        serializer = ResultSerializer(paginated_results, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response({
            'error': f'Đã xảy ra lỗi: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_get_tableWorking(request):
    if not hasattr(request.user, 'role') or request.user.role != 'ADMIN':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    try:
        time_working = TimeWorking.objects.all()
        if not time_working.exists():
            return Response({
                'message': 'Không tìm thấy bảng thời gian làm việc nào.',
            }, status=status.HTTP_404_NOT_FOUND)
        paginator = CustomPagination()
        paginated_time_working = paginator.paginate_queryset(time_working, request)
        serializer = TimeWorkingSerializer(paginated_time_working, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({
            'message': f'Đã xảy ra lỗi: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tableWorking(request):
    try:
        time_working = TimeWorking.objects.all()
        if not time_working.exists():
            return Response({
                'message': 'Không tìm thấy bảng thời gian làm việc nào.',
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = CustomTimeWorkingSerializer(time_working, many=True)
        return Response({
            'message': 'Lấy danh sách bảng thời gian làm việc thành công!',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': f'Đã xảy ra lỗi: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_Create_tableAvatar(request):
    if request.user.role != 'ADMIN':
        return Response({
            'message': 'Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)',
        }, status=status.HTTP_401_UNAUTHORIZED)
    Avatar = AvatarSerializer(data=request.data)
    if Avatar.is_valid():
        Avatar.save()
        return Response({
            'message': 'Thêm Avatar thành công!',
            'data': Avatar.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Thêm Avatar thất bại!',
        'errors': Avatar.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_update_tableAvatar(request):
    if not hasattr(request.user, 'role') or request.user.role not in ['ADMIN']:
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    id = request.data.get('id')
    if not id:
        return Response({
            'message': 'Thiếu thông tin id của Avatar.',
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        avatar = TableAvatar.objects.get(id=id)
    except TableAvatar.DoesNotExist:
        return Response({
            'message': 'Không tìm thấy Avatar.',
        }, status=status.HTTP_404_NOT_FOUND)

    avatar_serializer = AvatarSerializer(avatar, data=request.data, partial=True)
    if avatar_serializer.is_valid():
        avatar_serializer.save()
        return Response({
            'message': 'Cập nhật Avatar thành công!',
            'data': avatar_serializer.data
        }, status=status.HTTP_200_OK)
    return Response({
        'message': 'Cập nhật Avatar thất bại!',
        'errors': avatar_serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_delete_tableAvatar(request):
    if request.user.role != 'ADMIN':
        return Response({
            'message': 'Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)',
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    id = request.query_params.get('id')
    if not id:
        return Response({
            'message': 'Thiếu thông tin id của Avatar.',
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        avatar = TableAvatar.objects.get(id=id)
        avatar.delete()
        return Response({
            'message': 'Xóa Avatar thành công!',
        }, status=status.HTTP_200_OK)
    except TableAvatar.DoesNotExist:
        return Response({
            'message': 'Không tìm thấy Avatar.',
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'message': f'Lỗi khi xóa Avatar: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_get_tableAvatar(request):
    if not hasattr(request.user, 'role') or request.user.role != 'ADMIN':
        return Response({
            'message': 'Unauthorized: Bạn cần quyền ADMIN để thực hiện hành động này.',
        }, status=status.HTTP_401_UNAUTHORIZED)
    try:
        avatars = TableAvatar.objects.all()
        if not avatars.exists():
            return Response({
                'message': 'Không tìm thấy Avatar nào.',
            }, status=status.HTTP_404_NOT_FOUND)
        paginator = CustomPagination()
        paginated_avatars = paginator.paginate_queryset(avatars, request)
        serializer = AvatarSerializer(paginated_avatars, many=True)
        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({
            'message': f'Đã xảy ra lỗi: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tableAvatar(request):
    try:
        avatars = TableAvatar.objects.all()
        if not avatars.exists():
            return Response({
                'message': 'Không tìm thấy Avatar nào.',
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = AvatarSerializer(avatars, many=True)
        return Response({
            'message': 'Lấy danh sách Avatar thành công!',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
            return Response({
                'message': f'Đã xảy ra lỗi: {str(e)}',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_get_booking(request):
    account = request.user.phone

    try:
        booking = Booking.objects.filter(account=account).first()
        if not booking:
            return Response({
                'message': 'Không tìm thấy lịch hẹn nào cho tài khoản này.'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = BookingSerializer(booking)
        return Response({
            'message': 'Lấy danh sách lịch hẹn thành công!',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': f'Đã xảy ra lỗi: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_pass')
    new_password = request.data.get('new_pass')
    if not user.check_password(old_password):
        return Response({'message': 'Mật khẩu cũ không chính xác.'}, status=status.HTTP_400_BAD_REQUEST)
    if old_password == new_password:
        return Response({'message': 'Mật khẩu mới không được trùng với mật khẩu cũ.'}, status=status.HTTP_400_BAD_REQUEST)
    if len(new_password) < 6:
        return Response({'message': 'Mật khẩu phải có ít nhất 6 ký tự.'}, status=status.HTTP_400_BAD_REQUEST)
    if not re.match(r'^[a-zA-Z0-9]+$', new_password):
        return Response({'message': 'Mật khẩu không được chứa ký tự đặc biệt.'}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(new_password)
    user.save()
    refresh = RefreshToken.for_user(user)
    return Response({
        'message': 'Đổi mật khẩu thành công.',
        'data': {
            'access_token': str(refresh.access_token)
        }
    }, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def user_delete_booking(request):
    user = request.user
    phone = user.phone  
    try:
        booking = Booking.objects.get(account=phone)
    except Booking.DoesNotExist:
        return Response({
            'message': f'Không tìm thấy lịch hẹn cho số điện thoại {phone}.',
        }, status=status.HTTP_404_NOT_FOUND)

    try:
        with transaction.atomic():
            booking.delete()
            user.isBooking = False
            user.save()

        return Response({
            'message': 'Xóa lịch hẹn thành công.',
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'message': f'Lỗi khi xóa lịch hẹn: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)