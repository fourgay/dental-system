from rest_framework import serializers
from .models import Data, Service, Booking

class DataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    birthDay = serializers.DateField(input_formats=['%Y-%m-%d', '%d-%m-%Y'], required=False)

    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role', 'password', 'birthDay', 'isBooking', 'address']

    def create(self, validated_data):
        validated_data['avatar'] = 'avatars/avatar-1.png'
        if 'role' in validated_data:
            data = Data.objects.admin_create_user(
                fullname=validated_data['fullname'],
                phone=validated_data['phone'],
                password=validated_data['password'],
                role=validated_data['role'],
                birthDay=validated_data['birthDay'],
                isBooking=validated_data['isBooking'],
                address=validated_data['address']
            )
        else:
            data = Data.objects.create_user(
                fullname=validated_data['fullname'],
                phone=validated_data['phone'],
                password=validated_data['password'],
            )
        return data

    def validate_phone(self, value):
        if Data.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Số điện thoại đã tồn tại. Vui lòng thử số khác.")
        return value

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['fullname', 'work', 'img','phone']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'title', 'detail', 'img']
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'