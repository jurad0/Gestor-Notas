from rest_framework import serializers
# SERIALIZADOR CHECKLIST
class ChecklistSerializer(serializers.Serializer):
    user = serializers.CharField(max_length=100)
    title = serializers.CharField(max_length=200)
    completed = serializers.BooleanField(default=False)
    created_at = serializers.DateTimeField(required=False)
    updated_at = serializers.DateTimeField(required=False)
