from rest_framework import serializers
from .models import Data

class DataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Data
        fields = ['fullname', 'phone', 'password']

    def create(self, validated_data):
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
