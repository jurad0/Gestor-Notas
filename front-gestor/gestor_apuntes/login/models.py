from django.db import models
from django.contrib.auth.models import AbstractBaseUser
#METODO DEFINICION DE USUARIO
class CustomUser(AbstractBaseUser):
    id = models.CharField(max_length=24, primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    # otros campos necesarios

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
