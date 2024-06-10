# authentication.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from pymongo import MongoClient
from bson.objectid import ObjectId
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

#METODO DE CONFIGURACIÓN PARA EL JWT
class MongoDBJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get('user_id')

        if not user_id:
            raise ValueError("No user_id found in token")

        try:
            user_id = ObjectId(user_id)
        except Exception as e:
            raise ValueError(f"Invalid user_id format: {e}")

        client = MongoClient(settings.MONGO_URI)
        db = client[settings.MONGO_DB_NAME]
        user_data = db.users.find_one({'_id': user_id})
        client.close()

        if not user_data:
            raise User.DoesNotExist

        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={'id': str(user_data['_id'])}
        )

        return user
