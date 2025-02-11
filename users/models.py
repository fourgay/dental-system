from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, fullname, phone, password=None, birthDay=None, isBooking=False, address=None,work=None):
        if not fullname:
            raise ValueError('Tên không được để trống!')
        if not phone:
            raise ValueError('Số điện thoại không được để trống!')
        service_name = None
        if work:
            try:
                service = Service.objects.get(id=work)
                service_name = service.name
            except Service.DoesNotExist:
                raise ValueError('Dịch vụ không tồn tại!')
            
        data = self.model(
            fullname=fullname,
            phone=phone,
            role='USER',
            birthDay=birthDay,
            isBooking=isBooking, 
            address=address      
        )
        if password:
            data.set_password(password)
        data.save(using=self._db)        
        return data 

    def create_superuser(self, fullname, phone, password=None):
        data = self.create_user(fullname, phone, password)
        data.is_staff = True
        data.is_superuser = True
        data.role = 'ADMIN'
        data.save(using=self._db)
        return data
    
    def admin_create_user(self, fullname, phone, password=None, role='USER', birthDay=None, isBooking=False, address=None, work=None):
        if not fullname:
            raise ValueError('Tên không được để trống!')
        if not phone:
            raise ValueError('Số điện thoại không được để trống!')

        # Nếu work là ID của service, lấy tên của service
        service_name = None
        if work:
            try:
                service = Service.objects.get(id=work)
                service_name = service.name
            except Service.DoesNotExist:
                raise ValueError('Dịch vụ không tồn tại!')

        data = self.model(
            fullname=fullname, 
            phone=phone, 
            role=role, 
            birthDay=birthDay, 
            address=address,
            work=service_name  # Gán name của service vào work
        )

        data.set_password(password)
        if role == 'ADMIN':
            data.is_staff = True
            data.is_superuser = True 
        return data

    def register_booking(self, fullname, date, time, forAnother, remark, service, account, doctor, status, Doctor_phone):
        # Kiểm tra các trường bắt buộc
        if not fullname:
            raise ValueError('Tên không được để trống!')
        if not date:
            raise ValueError('Ngày không được để trống!')
        if not time:
            raise ValueError('Thời gian không được để trống!')
        if not service:
            raise ValueError('Dịch vụ không được để trống!')
        if not account:
            raise ValueError('Tài khoản không đuợc để trống!')
        if not doctor:
            raise ValueError('Bác sĩ không được để trống!')
        if not status:
            raise ValueError('Trạng thái không được để trống!')
        if not Doctor_phone:
            raise ValueError('Số điện thoại của bác sĩ không được để trống!')
        
        data = Booking(
            fullname=fullname,
            date=date,
            time=time,
            forAnother=forAnother,
            remark=remark,
            service=service,
            account=account,
            doctor=doctor,
            status=status,
            Doctor_phone=Doctor_phone
            )
        data.save(using=self._db)  
        return data


class Data(AbstractBaseUser):
    fullname = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, unique=True)
    avatar = models.CharField(max_length=255, default='default_avatar.png')
    role = models.CharField(max_length=50, default='USER')  
    birthDay = models.CharField(max_length=255,null=True, blank=True) 
    isBooking = models.BooleanField(default=False)
    address = models.CharField(max_length=255,null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    # Thông tin riêng cho bác sĩ
    work = models.CharField(max_length=255, blank=True)  # Công việc (chỉ dành cho bác sĩ)
    img = models.CharField(max_length=255, null=True, blank=True)  # Ảnh đại diện (chỉ dành cho bác sĩ)

    objects = CustomUserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['fullname']

    def __str__(self):
        return self.fullname

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def has_doctor_role(self):
        return self.role == 'DOCTOR'


class Service(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    detail = models.TextField()
    img = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Booking(models.Model):
    fullname = models.CharField(max_length=255)
    date = models.CharField(max_length=255,null=True, blank=True)  
    time = models.TimeField()  # Sử dụng TimeField
    forAnother = models.BooleanField(default=False)
    remark = models.TextField(null=True, blank=True)
    service = models.CharField(max_length=255)
    account = models.CharField(max_length=255)
    doctor = models.CharField(max_length=255)
    status = models.CharField(max_length=255, null=True, blank=True)
    Doctor_phone = models.CharField(max_length=255, default='Unknown Phone')
    updatedAt = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fullname

class Result(models.Model):
    account = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    time = models.TimeField()
    title = models.CharField(max_length=255)
    decriptions = models.TextField(max_length=255)
    service = models.TextField(max_length=255)
    fullname = models.CharField(max_length=255)
    doctor = models.CharField(max_length=255, default='Unknown Doctor')
    Doctor_phone = models.CharField(max_length=255, default='Unknown Phone')
    updatedAt = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)

class TimeWorking(models.Model):
    title = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

