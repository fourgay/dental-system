from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),  # API endpoints
    path('register/', TemplateView.as_view(template_name='register.html'), name='register_page'),
    path('login/', TemplateView.as_view(template_name='login.html'), name='login_page'),
    path('home/', TemplateView.as_view(template_name='home.html'), name='home'),
    path('profile/<int:user_id>/', TemplateView.as_view(template_name='profile.html'), name='profile'),
]
