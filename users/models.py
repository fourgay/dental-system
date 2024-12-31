from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, fullname, phone, password=None):
        if not fullname:
            raise ValueError('Tên không được để trống!')
        if not phone:
            raise ValueError('Số điện thoại không được để trống!')
        data = self.model(fullname=fullname, phone=phone, role='USER')
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

class Data(AbstractBaseUser):
    fullname = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, unique=True)
    avatar = models.CharField(max_length=255, default='default_avatar.png')
    role = models.CharField(max_length=50, default='USER')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['fullname']

    def __str__(self):
        return self.fullname

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def is_doctor(self):
        return self.role == 'DOCTOR'

class Doctor(models.Model):
    fullname = models.CharField(max_length=255)
    work = models.CharField(max_length=255)
    img = models.CharField(max_length=255)

    def __str__(self):
        return self.fullname
