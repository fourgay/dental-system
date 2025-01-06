from django.contrib import admin
from .models import Data, Service

class DataAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'phone', 'role', 'is_staff', 'is_active', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('fullname', 'phone')

    # Tùy chọn lọc bác sĩ
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # Lọc toàn bộ dữ liệu hoặc thêm logic nếu cần
        return qs

    # Hành động tùy chỉnh để lọc bác sĩ
    actions = ['filter_doctors']

    def filter_doctors(self, request, queryset):
        # Lọc ra các tài khoản là bác sĩ
        doctor_queryset = queryset.filter(role='DOCTOR')
        return doctor_queryset

    filter_doctors.short_description = "Lọc tài khoản bác sĩ"

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'detail', 'img')
    search_fields = ('name', 'title')

# Đăng ký các model
admin.site.register(Data, DataAdmin)
admin.site.register(Service, ServiceAdmin)
