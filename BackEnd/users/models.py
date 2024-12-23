from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, fullname, phone, password=None):
        if not fullname:
            raise ValueError('Tên không được để trống!')
        if not phone:
            raise ValueError('Số điện thoại không được để trống!')
        user = self.model(fullname=fullname, phone=phone)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, fullname, phone, password=None):
        user = self.create_user(fullname, phone, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    fullname = models.CharField(max_length=255, unique=True, default='default_fullname')
    phone = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=100)

    objects = CustomUserManager()

    USERNAME_FIELD = 'fullname'
    REQUIRED_FIELDS = ['phone']

    def __str__(self):
        return self.fullname
