from django.shortcuts import render
from django.http import HttpResponse

def admin(request):
    return HttpResponse("Bienvenido al panel de administrador .")
