from django.contrib import admin
from .models import Data, Service, Booking, Result

class DataAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'phone', 'role', 'is_staff', 'is_active', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('fullname', 'phone')
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs
    actions = ['filter_doctors']

    def filter_doctors(self, request, queryset):
        doctor_queryset = queryset.filter(role='DOCTOR')
        return doctor_queryset

    filter_doctors.short_description = "Lọc tài khoản bác sĩ"

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'detail', 'img')
    search_fields = ('name', 'title')

class BookingAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'date', 'time', 'forAnother', 'remark','service','account','doctor')
    list_filter = ('date', 'time', 'forAnother')
    search_fields = ('fullname', 'date')


admin.site.register(Data, DataAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Result)
