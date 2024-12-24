from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
