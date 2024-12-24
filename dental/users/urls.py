from django.urls import path
from .views import register, login, get_user_info, get_user_profile

urlpatterns = [
    path('accounts/register/', register, name='register'),
    path('accounts/login/', login, name='login'),
    path('accounts/user/', get_user_info, name='get_user_info'),
    path('accounts/user/<int:user_id>/', get_user_profile, name='get_user_profile'),
]
