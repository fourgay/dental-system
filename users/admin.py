from django.contrib import admin
from .models import Data, Doctor, Service

class DataAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'phone', 'role', 'is_staff', 'is_active', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('fullname', 'phone')

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'detail', 'img')
    search_fields = ('name', 'title')

admin.site.register(Data, DataAdmin)
admin.site.register(Doctor)
admin.site.register(Service, ServiceAdmin)  # Register with ServiceAdmin
