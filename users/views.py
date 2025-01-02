from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Data, Doctor, Service
from .serializers import DataSerializer, DoctorSerializer, ServiceSerializer
from rest_framework.pagination import PageNumberPagination
import random

class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_doctor()

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'ADMIN'

class StandardresultsSetPagination(PageNumberPagination):
    page_size = 10
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
@permission_classes([IsAuthenticated, IsAdmin])
def get_all_doctors(request):
    if request.user.role != 'ADMIN':
        return Response({
            'message': 'Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)',
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response({
        'message': '',
        'data': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_services(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response({
        'message': '',
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    if request.user.role != 'ADMIN':
            messages = [
                'Bạn phải là ADMIN mới có thể truy cập được API này 👍',
                'Gà thì không có quyền dùng API này đâu 🚫',
                'Búng cu đi rồi cho dùng API'
            ]
            return Response({
                'message': random.choice(messages)  
            }, status=status.HTTP_401_UNAUTHORIZED)
    users = Data.objects.all()
    paginator = StandardresultsSetPagination()
    paginated_users = paginator.paginate_queryset(users, request)
    serializer = DataSerializer(paginated_users, many=True)
    return paginator.get_paginated_response({
        'message': '',
        'data': {
            'meta': {
                'current': paginator.page.number,
                'pageSize': paginator.page_size,
                'pages': paginator.page.paginator.num_pages,
                'total': paginator.page.paginator.count
            },
            'results': serializer.data
        }
    })