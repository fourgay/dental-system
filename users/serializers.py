from rest_framework import serializers
from .models import Data,Service

class DataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role', 'password']

    def create(self, validated_data):
        if 'role' in validated_data:
            validated_data['avatar'] = 'avatars/avatar-1.png'
            data = Data.objects.admin_create_user(
                fullname=validated_data['fullname'],
                phone=validated_data['phone'],
                password=validated_data['password'],
                role=validated_data['role']
            )
        else:
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
        model = Data
        fields = ['fullname', 'work', 'img','phone']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'title', 'detail', 'img']

class Dataserializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role']
