from rest_framework import serializers
from .models import Data, Service, Booking
from datetime import datetime

class DataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    birthDay = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role', 'password', 'birthDay', 'isBooking', 'address']

    def create(self, validated_data):
        # Kiểm tra và chuyển đổi birthDay nếu có
        if 'birthDay' in validated_data and validated_data['birthDay']:
            try:
                # Chuyển chuỗi ngày sinh thành kiểu date
                birthDay = datetime.strptime(validated_data['birthDay'], '%d/%m/%Y').date()
                validated_data['birthDay'] = birthDay
            except ValueError:
                raise serializers.ValidationError("Ngày sinh không đúng định dạng. Vui lòng sử dụng định dạng dd/mm/yyyy.")

        if 'role' in validated_data:
            validated_data['avatar'] = 'avatars/avatar-1.png'
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
            validated_data['avatar'] = 'avatars/avatar-1.png'
            data = Data.objects.create_user(
                fullname=validated_data['fullname'],
                phone=validated_data['phone'],
                password=validated_data['password'],
                birthDay=validated_data['birthDay'],
                isBooking=validated_data['isBooking'],
                address=validated_data['address']
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
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'