from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChecklistSerializer
from checklist.database import get_db_handle
from bson.objectid import ObjectId, InvalidId
from datetime import datetime
import json

#CLASE BASADA EN EL SERIALIZADOR
class ChecklistAPIView(APIView):
    permission_classes = []  # Disable authentication for testing

    def __init__(self):
        self.db_handle, self.mongo_client = get_db_handle()
        self.collection = self.db_handle['checklists']

    def __del__(self):
        self.mongo_client.close()
    #METODO GET PARA RECIBIR LOS DATOS DE LA BBDD 
    def get(self, request, pk=None):
        user = request.query_params.get('user')
        if not user:
            return Response({"error": "User parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if pk:
            try:
                checklist_item = self.collection.find_one({"_id": ObjectId(pk), "user": user})
            except InvalidId:
                return Response({"error": "Invalid ID format"}, status=status.HTTP_400_BAD_REQUEST)
            
            if checklist_item:
                checklist_item['_id'] = str(checklist_item['_id'])
                return Response(checklist_item, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Checklist item not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            checklist_items = list(self.collection.find({"user": user}))
            for item in checklist_items:
                item['_id'] = str(item['_id'])
            return Response(checklist_items, status=status.HTTP_200_OK)
    # METODO POST PARA INTRODUCIR DATOS EN LA BBDD
    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        
        data['created_at'] = datetime.now().isoformat()
        data['updated_at'] = datetime.now().isoformat()
        
        serializer = ChecklistSerializer(data=data)
        if serializer.is_valid():
            checklist_item = serializer.validated_data
            result = self.collection.insert_one(checklist_item)
            checklist_item['_id'] = str(result.inserted_id)
            return Response(checklist_item, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #METODO PUT PARA EDITAR LOS DATOS DE LA BBDD
    def put(self, request, pk):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        
        data['updated_at'] = datetime.now().isoformat()
        
        serializer = ChecklistSerializer(data=data)
        if serializer.is_valid():
            checklist_item = serializer.validated_data
            try:
                result = self.collection.update_one(
                    {"_id": ObjectId(pk)},
                    {"$set": checklist_item}
                )
            except InvalidId:
                return Response({"error": "Invalid ID format"}, status=status.HTTP_400_BAD_REQUEST)
            
            if result.matched_count:
                checklist_item['_id'] = pk
                return Response(checklist_item, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Checklist item not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #METODO DELETE PARA BORRAR LOS DATOS DE LA BBDD
    def delete(self, request, pk):
        print(f"Attempting to delete checklist item with pk: {pk}")
        try:
            result = self.collection.delete_one({"_id": ObjectId(pk)})
            print(f"Delete result: {result.deleted_count}")
        except InvalidId:
            return Response({"error": "Invalid ID format"}, status=status.HTTP_400_BAD_REQUEST)
        
        if result.deleted_count:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Checklist item not found"}, status=status.HTTP_404_NOT_FOUND)
