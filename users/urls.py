from django.urls import path
from .views import register, login, Update_user,update_booking,delete_booking,Register_booking, get_user_info, get_user_profile, get_all_doctors, get_services, get_all_users, admin_register, admin_delete_user, admin_get_in_for_booking

urlpatterns = [
    path('accounts/register/', register, name='register'),
    path('accounts/login/', login, name='login'),
    path('accounts/user/', get_user_info, name='get_user_info'),
    path('accounts/user/<int:user_id>/', get_user_profile, name='get_user_profile'),
    path('admin/get-all-doctor/', get_all_doctors, name='get_all_doctors'),
    path('services/', get_services, name='get_services'),  
    path('users/', get_all_users, name='get_all_users'),  
    path('admin/admin_register/', admin_register, name='admin_register'),
    path('admin/delete/', admin_delete_user, name='admin_delete_user'),
    path('admin/Booking/', admin_get_in_for_booking, name='admin_get_in_for_booking'),
    path('admin/Update_user/', Update_user, name='Update_user'),
    path('services/register_booking/', Register_booking, name='Register_booking'),
    path('delete-booking/', delete_booking, name='delete_booking'),
    path('update-booking/', update_booking, name='update_booking'),
]