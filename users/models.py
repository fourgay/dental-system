from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, fullname, phone, password=None, birthDay=None, isBooking=False, address=None):
        if not fullname:
            raise ValueError('Tên không được để trống!')
        if not phone:
            raise ValueError('Số điện thoại không được để trống!')
        data = self.model(
            fullname=fullname,
            phone=phone,
            role='USER',
            birthDay=birthDay,
            isBooking=isBooking,
            address=address
        )
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
    
    def admin_create_user(self, fullname, phone, password=None, role='USER',birthDay=None,isBooking=False,address=None):
        if not fullname:
            raise ValueError('Tên không được để trống!')
        if not phone:
            raise ValueError('Số điện thoại không được để trống!')
        data = self.model(fullname=fullname, phone=phone, role=role)
        data.set_password(password)
        if role == 'admin':
            data.is_staff = True
            data.is_superuser = True
        data.save(using=self._db)
        return data

class Data(AbstractBaseUser):
    fullname = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, unique=True)
    avatar = models.CharField(max_length=255, default='default_avatar.png')
    role = models.CharField(max_length=50, default='USER')  
    birthDay = models.DateField(null=True, blank=True)  # Sử dụng kiểu DateField
    isBooking = models.BooleanField(default=False, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    # Thông tin riêng cho bác sĩ
    work = models.CharField(max_length=255, null=True, blank=True)  # Công việc (chỉ dành cho bác sĩ)
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
    date = models.DateField()  # Chuyển sang DateField
    time = models.TimeField()  # Sử dụng TimeField
    forAnother = models.BooleanField(default=False)
    remark = models.TextField(null=True, blank=True)
    service = models.CharField(max_length=255)
    account = models.CharField(max_length=255)
    doctor = models.CharField(max_length=255)

    def __str__(self):
        return self.fullname