from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import json
# Create your views here.
def register(request):
    contetx = {}
    return render(request,'FrontEnd/pages/registerPage.html')
def login(request):
    contetx = {}
    return render(request,'FrontEnd/pages/loginPage.html')
def home(request):
    return render(request, 'app/home.html')