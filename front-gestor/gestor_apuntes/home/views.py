from django.shortcuts import render

from django.http import HttpResponse

# METODO QUE RETORNA UN MENSAJE DE BIENVENIDA
def index(request):
    return HttpResponse("Bienvenido a la página principal de mi sitio.")
