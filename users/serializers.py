from rest_framework import serializers
from .models import Data, Doctor, Service

class DataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role', 'password']

    def create(self, validated_data):
        validated_data['avatar'] = 'avatars/avatar-1.png' 
        data = Data.objects.create_user(
            fullname=validated_data['fullname'],
            phone=validated_data['phone'],
            password=validated_data['password']
        )
        return data

    def validate_phone(self, value):
        if Data.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Số điện thoại đã tồn tại.")
        return value

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['fullname', 'work', 'img']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'title', 'detail', 'img']
