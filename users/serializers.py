from rest_framework import serializers
from .models import Data, Service, Booking

class DataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    birthDay = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Data
        fields = ['id', 'fullname', 'phone', 'avatar', 'role', 'password', 'birthDay', 'isBooking', 'address']
    def create(self, validated_data):
        validated_data['avatar'] = 'avatars/avatar-1.png'
        data = Data.objects.create_user(
            fullname=validated_data['fullname'],
            phone=validated_data['phone'],
            password=validated_data['password'],
            # birthDay=validated_data['birthDay'],
            # isBooking=validated_data['isBooking'],
            # address=validated_data['address']
        )
        return data
    def validate_phone(self, value):
        if Data.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Số điện thoại đã tồn tại. Vui lòng thử số khác.")
        return value

class DataSerializer_admin(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    birthDay = serializers.CharField(required=False, allow_blank=True)

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

class DataSerializer_booking(serializers.ModelSerializer):
    date = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Booking
        fields = ['fullname', 'date','time', 'forAnother','remark','service','account','doctor','status',]
    def create(self, validated_data):
        data = Data.objects.register_booking(
            fullname=validated_data['fullname'],
            date=validated_data['date'],
            time=validated_data['time'],
            forAnother=validated_data['forAnother'],
            remark=validated_data['remark'],
            service=validated_data['service'],
            account=validated_data['account'],
            doctor=validated_data['doctor'],
            status=validated_data['status']
        )
        return data