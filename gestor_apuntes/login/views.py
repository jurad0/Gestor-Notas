# login/views.py

from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password
from .serializers import UserRegistrationSerializer
import logging
from .database import get_db_handle
from .models import CustomUser
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

logger = logging.getLogger(__name__)

# Conexión a la base de datos MongoDB
db_handle, mongo_client = get_db_handle()



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    #METODO POST QUE REGISTRA EL USUARIO EN LA BASE DE DATOS
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.validated_data
            user_data['password'] = make_password(user_data['password'])
            db_handle['users'].insert_one(user_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    #METODO POST QUE PARA HACER EL LOGIN EN LA BBDD
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user_dict = db_handle['users'].find_one({"username": username})
        if user_dict and check_password(password, user_dict['password']):
            # Crear instancia de CustomUser
            user = CustomUser(user_dict)
            # Generar JWT manualmente
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
