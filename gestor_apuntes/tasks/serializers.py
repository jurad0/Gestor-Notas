# serializers.py
from rest_framework import serializers
# SERIALIZADOR DE TAREAS
class TaskSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=1024, allow_blank=True)
    user = serializers.CharField(max_length=255)  # Asegúrate de incluir el campo user
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField(required=False)
    pdf = serializers.FileField(required=False, allow_empty_file=True)
    photo_url = serializers.URLField(required=False, allow_blank=True)
