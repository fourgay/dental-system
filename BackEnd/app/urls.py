from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('registerPage/', views.register,name= 'register'),
    path('loginPage/', views.login,name= 'login'),

]
