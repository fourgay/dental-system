from rest_framework import serializers
from .models import Data, Service, Booking, Result,TimeWorking
import re

class DataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    birthDay = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=True)  # Change to CharField to allow custom validation

    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role', 'password', 'birthDay', 'isBooking', 'address']

    def create(self, validated_data):
        validated_data['avatar'] = 'avatars/avatar-1.png'
        data = Data.objects.create_user(
            fullname=validated_data['fullname'],
            phone=validated_data['phone'],
            password=validated_data['password'],
            role = validated_data.get('role', 'USER'),
            birthDay=validated_data['birthDay'],
            isBooking=validated_data['isBooking'],
            address=validated_data['address']
        )
        return data

    def validate_phone(self, value):
        if not re.match(r'^0\d{9}$', value):
            raise serializers.ValidationError("Số điện thoại phải chứa đúng 10 chữ số và bắt đầu bằng 0.")
        if Data.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Số điện thoại đã tồn tại. Vui lòng thử số khác.")
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Mật khẩu phải có ít nhất 6 ký tự.")
        if not re.match(r'^[a-zA-Z0-9]+$', value):
            raise serializers.ValidationError("Mật khẩu không được chứa ký tự đặc biệt.")
        return value

class DataSerializer_admin(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    birthDay = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=True)
    work = serializers.CharField(required=True)  # Cho phép nhập work thủ công

    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role', 'password', 'birthDay', 'isBooking', 'address', 'work']

    def create(self, validated_data):
        validated_data['avatar'] = 'avatars/avatar-1.png'

        # Không cần lấy work từ Service, lưu nguyên giá trị nhập vào
        data = Data.objects.admin_create_user(
            fullname=validated_data['fullname'],
            phone=validated_data['phone'],
            password=validated_data['password'],
            role=validated_data.get('role', 'USER'),
            birthDay=validated_data.get('birthDay'),
            address=validated_data.get('address'),
            work=validated_data.get('work')  # Giữ nguyên giá trị work
        )
        return data

    def validate_phone(self, value):
        if not re.match(r'^0\d{9}$', value):
            raise serializers.ValidationError("Số điện thoại phải chứa đúng 10 chữ số và bắt đầu bằng 0.")
        if Data.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Số điện thoại đã tồn tại. Vui lòng thử số khác.")
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Mật khẩu phải có ít nhất 6 ký tự.")
        if not re.match(r'^[a-zA-Z0-9]+$', value):
            raise serializers.ValidationError("Mật khẩu không được chứa ký tự đặc biệt.")
        return value

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['id', 'fullname', 'work', 'img', 'phone']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'title', 'detail', 'img']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class DataSerializer_booking(serializers.ModelSerializer):
    date = serializers.CharField(required=False, allow_blank=True)
    remark = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = Booking
        fields = ['fullname', 'date', 'time', 'forAnother', 'remark', 'service', 'account', 'doctor', 'status','Doctor_phone']

    def create(self, validated_data):
        validated_data.setdefault('remark', "")
        data = Data.objects.register_booking(
            fullname=validated_data['fullname'],
            date=validated_data['date'],
            time=validated_data['time'],
            forAnother=validated_data['forAnother'],
            remark=validated_data['remark'],
            service=validated_data['service'],
            account=validated_data['account'],
            doctor=validated_data['doctor'],
            status=validated_data['status'],
            Doctor_phone=validated_data['Doctor_phone']
        )
        return data

    def validate_account(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Tài khoản chỉ được chứa các chữ số.")
        return value

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'


class TimeWorkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeWorking
        fields = '__all__'

class CustomTimeWorkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeWorking
        fields = ['id', 'title', 'value']
