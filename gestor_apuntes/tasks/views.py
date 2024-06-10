from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer
from azure.storage.blob import BlobServiceClient
from django.conf import settings
import json
from datetime import datetime

class TaskAPIView(APIView):
    permission_classes = []  
    #METODO DE CONEXIÓN A LA BBDD AZURE
    def get_blob_service_client(self):
        return BlobServiceClient(
            account_url=f"https://{settings.AZURE_ACCOUNT_NAME}.blob.core.windows.net",
            credential=settings.AZURE_ACCOUNT_KEY
        )
    #METODO GET PARA OBTENER LA NOTA
    def get(self, request, title=None):
        user = request.query_params.get('user')
        if not user:
            return Response({"error": "User parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        blob_service_client = self.get_blob_service_client()
        container_client = blob_service_client.get_container_client(settings.AZURE_CONTAINER_NAME)

        if title:
            # Obtener una tarea específica
            blob_client = container_client.get_blob_client(f"task_{user}_{title}.json")
            try:
                blob_data = blob_client.download_blob().readall()
                task_data = json.loads(blob_data)
                return Response(task_data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Obtener todas las tareas del usuario
            blob_list = container_client.list_blobs()
            tasks = []
            for blob in blob_list:
                if blob.name.startswith(f"task_{user}_") and blob.name.endswith('.json'):
                    blob_client = container_client.get_blob_client(blob)
                    blob_data = blob_client.download_blob().readall()
                    task_data = json.loads(blob_data)
                    tasks.append(task_data)
            return Response(tasks, status=status.HTTP_200_OK)
    #METODO POST PARA SUBIR LA NOTA
    def post(self, request):
        data = request.data.copy()
        
        if not data.get('description'):
            data['description'] = 'No description provided'
        
        data['created_at'] = datetime.now().isoformat()

        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            task_data = serializer.validated_data
            user = task_data['user']

            blob_service_client = self.get_blob_service_client()
            container_client = blob_service_client.get_container_client(settings.AZURE_CONTAINER_NAME)

            # Verificar si una tarea con el mismo título ya existe para el usuario
            blob_client = container_client.get_blob_client(blob=f"task_{user}_{task_data['title']}.json")
            if blob_client.exists():
                return Response({"error": "Task with this title already exists for this user"}, status=status.HTTP_400_BAD_REQUEST)

            # Manejar el archivo PDF
            pdf = request.FILES.get('pdf')
            if pdf:
                pdf_blob_client = container_client.get_blob_client(f"pdfs/{user}_{pdf.name}")
                pdf_blob_client.upload_blob(pdf, overwrite=True)
                task_data['pdf'] = pdf_blob_client.url

            # Manejar la URL de la foto
            photo_url = data.get('photo_url')
            if photo_url:
                task_data['photo_url'] = photo_url

            task_json = json.dumps(task_data, default=str)

            blob_client.upload_blob(task_json, overwrite=True)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #METODO PUT PARA EDITAR LA DESCRIPCION, ARCHIVO Y FOTO DE LA NOTA
    def put(self, request, title):
        data = request.data.copy()

        if not data.get('description'):
            data['description'] = 'No description provided'

        # Agregar 'created_at' al data si no está presente
        if 'created_at' not in data:
            # Obtener los datos actuales de la tarea para preservar 'created_at'
            user = request.query_params.get('user')
            if not user:
                return Response({"error": "User parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
            blob_service_client = self.get_blob_service_client()
            container_client = blob_service_client.get_container_client(settings.AZURE_CONTAINER_NAME)
            blob_client = container_client.get_blob_client(f"task_{user}_{title}.json")
            try:
                blob_data = blob_client.download_blob().readall()
                existing_task_data = json.loads(blob_data)
                data['created_at'] = existing_task_data['created_at']
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            task_data = serializer.validated_data

            blob_service_client = self.get_blob_service_client()
            container_client = blob_service_client.get_container_client(settings.AZURE_CONTAINER_NAME)

            # Manejar el archivo PDF
            pdf = request.FILES.get('pdf')
            if pdf:
                pdf_blob_client = container_client.get_blob_client(f"pdfs/{task_data['user']}_{pdf.name}")
                pdf_blob_client.upload_blob(pdf, overwrite=True)
                task_data['pdf'] = pdf_blob_client.url

            # Manejar la URL de la foto
            photo_url = data.get('photo_url')
            if photo_url:
                task_data['photo_url'] = photo_url

            task_json = json.dumps(task_data, default=str)

            blob_client = container_client.get_blob_client(
                blob=f"task_{task_data['user']}_{title}.json"
            )
            blob_client.upload_blob(task_json, overwrite=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(f"Serializer errors: {serializer.errors}")  # Registro de errores del serializador
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #METODO DELETE PARA BORRAR LA NOTA
    def delete(self, request, title):
        user = request.query_params.get('user')
        if not user:
            return Response({"error": "User parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        blob_service_client = self.get_blob_service_client()
        blob_client = blob_service_client.get_blob_client(
            container=settings.AZURE_CONTAINER_NAME,
            blob=f"task_{user}_{title}.json"
        )
        try:
            blob_client.delete_blob()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
