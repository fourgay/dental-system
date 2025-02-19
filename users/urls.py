from django.urls import path
from .views import register, login, Update_user, Admin_Update_user, update_booking, delete_booking, Register_booking,\
get_user_info, get_user_profile, get_all_doctors, get_services, get_all_users, admin_register, admin_delete_user, \
admin_get_in_for_booking, create_result, delete_result, Update_Result, get_all_results, Doctor_get_results, Doctor_get_booking, \
admin_create_tableWorking, admin_delete_tableWorking, admin_update_tableWorking, admin_get_tableWorking, get_tableWorking, \
admin_Create_tableAvatar, admin_update_tableAvatar, admin_delete_tableAvatar, admin_get_tableAvatar, get_tableAvatar, \
user_get_results, user_get_booking,change_password, user_delete_booking


        

urlpatterns = [
    path('accounts/Register/', register, name='register'),
    path('accounts/Login/', login, name='login'),
    path('accounts/User/', get_user_info, name='get_user_info'),
    path('accounts/User/<int:user_id>/', get_user_profile, name='get_user_profile'),
    path('Services/', get_services, name='get_services'),
    path('user/Update_user/', Update_user, name='Update_user'),
    path('user/Get_all_doctor/', get_all_doctors, name='get_all_doctors'),
    path('admin/Get_all_users/', get_all_users, name='get_all_users'),
    path('admin/Register_account/', admin_register, name='admin_register'),
    path('admin/Delete/', admin_delete_user, name='admin_delete_user'),
    path('admin/Update_user/', Admin_Update_user, name='Admin_Update_user'),
    path('admin/Get_booking/', admin_get_in_for_booking, name='admin_get_in_for_booking'),
    path('admin/Register_booking/', Register_booking, name='Register_booking'),
    path('admin/Delete_booking/', delete_booking, name='delete_booking'),
    path('admin/Update_booking/', update_booking, name='update_booking'),
    path('admin/Create_result/', create_result, name='create_result'),
    path('admin/Delete_result/', delete_result, name='delete_result'),
    path('admin/Update_result/', Update_Result, name='Update_Result'),
    path('admin/Get_all_result/', get_all_results, name='get_all_results'),
    path('doctor/Get_all_result/', Doctor_get_results, name='Doctor_get_results'),
    path('doctor/Get_all_booking/', Doctor_get_booking, name='Doctor_get_booking'),
    path('user/Get_result/', user_get_results, name='user_get_results'),
    path('user/Get_booking/', user_get_booking, name='user_get_booking'),
    path('admin/Create_Table_working/', admin_create_tableWorking, name='admin_create_tableWorking'),
    path('admin/Delete_Table_working/', admin_delete_tableWorking, name='admin_delete_tableWorking'),
    path('admin/Update_Table_working/', admin_update_tableWorking, name='admin_update_tableWorking'),
    path('admin/Get_Table_working/', admin_get_tableWorking, name='admin_get_tableWorking'),
    path('user/Get_Table_working/', get_tableWorking, name='get_tableWorking'),
    path('admin/Create_Table_avatar/', admin_Create_tableAvatar, name='admin_Create_tableAvatar'),
    path('admin/Update_Table_avatar/', admin_update_tableAvatar, name='admin_update_tableAvatar'),
    path('admin/Delete_Table_avatar/', admin_delete_tableAvatar, name='admin_delete_tableAvatar'),
    path('admin/Get_Table_avatar/', admin_get_tableAvatar, name='admin_get_tableAvatar'),
    path('user/Get_Table_avatar/', get_tableAvatar, name='get_tableAvatar'),
    path('change_password/', change_password, name='change_password')
    path('user/user_delete_booking ',user_delete_booking, name='user_delete_booking')
]