from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Data
from .serializers import DataSerializer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.save()
            response_serializer = DataSerializer(data)
            return Response({
                'message': 'Tạo người dùng thành công!',
                'data': response_serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({'message': 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request, user_id):
    try:
        user = Data.objects.get(id=user_id)
    except Data.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = DataSerializer(user)
    return Response(serializer.data)
