from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import*
import json
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
def register(request):
    form = UserCreationForm()
    contetx = {'form': form}
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Registration successful'})
        else:
            return JsonResponse({'errors': form.errors})
    return render(request,'FrontEnd/pages/registerPage.html')
def login(request):
    contetx = {}
    return render(request,'FrontEnd/pages/loginPage.html')
def home(request):
    return render(request, 'app/home.html')