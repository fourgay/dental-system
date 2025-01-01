from django.urls import path
from .views import register, login, get_user_info, get_user_profile, get_all_doctors, get_services

urlpatterns = [
    path('accounts/register/', register, name='register'),
    path('accounts/login/', login, name='login'),
    path('accounts/user/', get_user_info, name='get_user_info'),
    path('accounts/user/<int:user_id>/', get_user_profile, name='get_user_profile'),
    path('admin/get-all-doctor/', get_all_doctors, name='get_all_doctors'),
    path('services/', get_services, name='get_services'),  # Add this line
]
