from django.contrib import admin
from .models import Data, Doctor

class DataAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'phone', 'role', 'is_staff', 'is_active', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('fullname', 'phone')

admin.site.register(Data, DataAdmin)
admin.site.register(Doctor)
