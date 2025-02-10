from django.urls import path
from .views import register, login, Update_user, Admin_Update_user, update_booking, delete_booking, Register_booking, \
    get_user_info, get_user_profile, get_all_doctors, get_services, get_all_users, admin_register, admin_delete_user, \
    admin_get_in_for_booking, create_result, delete_result, Update_Result, get_all_results

urlpatterns = [
    path('accounts/register/', register, name='register'),
    path('accounts/login/', login, name='login'),
    path('accounts/user/', get_user_info, name='get_user_info'),
    path('accounts/user/<int:user_id>/', get_user_profile, name='get_user_profile'),
    path('services/', get_services, name='get_services'),
    path('users/', get_all_users, name='get_all_users'),
    path('users/Update_user/', Update_user, name='Update_user'),
    path('admin/admin_register/', admin_register, name='admin_register'),
    path('admin/delete/', admin_delete_user, name='admin_delete_user'),
    path('admin/get-all-doctor/', get_all_doctors, name='get_all_doctors'),
    path('admin/Update_user/', Admin_Update_user, name='Admin_Update_user'),
    path('admin/Booking/', admin_get_in_for_booking, name='admin_get_in_for_booking'),
    path('admin/register_booking/', Register_booking, name='Register_booking'),
    path('admin/delete-booking/', delete_booking, name='delete_booking'),
    path('admin/update-booking/', update_booking, name='update_booking'),
    path('admin/create-result/', create_result, name='create_result'),
    path('admin/delete-result/', delete_result, name='delete_result'),
    path('admin/update-result/', Update_Result, name='Update_Result'),
    path('admin/Get-result/', get_all_results, name='get_all_results'),  
]