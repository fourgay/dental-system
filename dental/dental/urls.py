from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import register, login, get_user_info, get_user_profile, get_doctors, get_all_doctors, create_result

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # API endpoints
    path('profile/<int:user_id>/', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('accounts/register/', register, name='register'),
    path('accounts/login/', login, name='login'),
    path('accounts/user/', get_user_info, name='get_user_info'),
    path('accounts/user/<int:user_id>/', get_user_profile, name='get_user_profile'),
    path('doctors/', get_doctors, name='get_doctors'),
    path('admin/get-all-doctor/', get_all_doctors, name='get_all_doctors'),
    
]
