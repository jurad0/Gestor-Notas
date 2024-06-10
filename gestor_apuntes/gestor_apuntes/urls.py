# gestor_apuntes/urls.py

from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from tasks.views import TaskAPIView
from login.views import RegisterView, LoginView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from checklist.views import ChecklistAPIView

#URLS PARA DEFINIR LOS ENDPOINTS DE LAS APIS
urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/tasks/', TaskAPIView.as_view(), name='task-list-create'),
    path('api/tasks/<str:title>/', TaskAPIView.as_view(), name='task-detail'),
    path('api/checklist/', ChecklistAPIView.as_view(), name='checklist-list-create'),
    path('api/checklist/<pk>/', ChecklistAPIView.as_view(), name='checklist-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
