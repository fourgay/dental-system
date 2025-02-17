from django.urls import path
from .views import register, login, Update_user, Admin_Update_user, update_booking, delete_booking, Register_booking, user_get_results, user_get_booking, change_password, admin_Create_tableAvatar

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('update_user/', Update_user, name='update_user'),
    path('admin_update_user/', Admin_Update_user, name='admin_update_user'),
    path('update_booking/', update_booking, name='update_booking'),
    path('delete_booking/', delete_booking, name='delete_booking'),
    path('register_booking/', Register_booking, name='register_booking'),
    path('user_get_results/', user_get_results, name='user_get_results'),
    path('user_get_booking/', user_get_booking, name='user_get_booking'),
    path('change_password/', change_password, name='change_password'),
    path('admin_create_table_avatar/', admin_Create_tableAvatar, name='admin_create_table_avatar'),
]