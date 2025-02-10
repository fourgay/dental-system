from django.urls import path
from .views import register, login, Update_user, Admin_Update_user, update_booking, delete_booking, Register_booking, \
    get_user_info, get_user_profile, get_all_doctors, get_services, get_all_users, admin_register, admin_delete_user, \
    admin_get_in_for_booking, create_result, delete_result, Update_Result, get_all_results,Doctor_get_results,Doctor_get_booking

urlpatterns = [
    path('accounts/Register/', register, name='register'),
    path('accounts/Login/', login, name='login'),
    path('accounts/User/', get_user_info, name='get_user_info'),
    path('accounts/User/<int:user_id>/', get_user_profile, name='get_user_profile'),
    path('Services/', get_services, name='get_services'),
    path('users/Update_user/', Update_user, name='Update_user'),
    path('user/Get_all_doctor/', get_all_doctors, name='get_all_doctors'),
    path('admin/Get_all_users/', get_all_users, name='get_all_users'),
    path('admin/Register_account/', admin_register, name='admin_register'),
    path('admin/Delete/', admin_delete_user, name='admin_delete_user'),
    path('admin/Update_user/', Admin_Update_user, name='Admin_Update_user'),
    path('admin/Booking/', admin_get_in_for_booking, name='admin_get_in_for_booking'),
    path('admin/Register_booking/', Register_booking, name='Register_booking'),
    path('admin/Delete_booking/', delete_booking, name='delete_booking'),
    path('admin/Update_booking/', update_booking, name='update_booking'),
    path('admin/Create_result/', create_result, name='create_result'),
    path('admin/Delete_result/', delete_result, name='delete_result'),
    path('admin/Update_result/', Update_Result, name='Update_Result'),
    path('admin/Get_all_result/', get_all_results, name='get_all_results'),  
    path('doctor/Get_all_result/', Doctor_get_results, name='Doctor_get_results'),  
    path('doctor/get_all_booking/', Doctor_get_booking, name='Doctor_get_booking')
]