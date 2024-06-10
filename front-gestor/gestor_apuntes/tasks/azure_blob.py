# azure_blob.py
# ARCHIVO DE CONFIGURACION DE AZURE BLOB STORAGE
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import uuid
import json

# CONEXION A AZURE 
AZURE_ACCOUNT_NAME = 'juradotfg'
AZURE_ACCOUNT_KEY = 'LaqUB+yjsMfDDiuipA4q04Fl5DkKQJboxiTqsRAwoLVcRMFCilL+VjJtxhiFgoa32XkeF6ZRUzOh+AStLNK48g=='
AZURE_CONTAINER_NAME = 'apuntes'

blob_service_client = BlobServiceClient(
    account_url=f"https://{AZURE_ACCOUNT_NAME}.blob.core.windows.net",
    credential=AZURE_ACCOUNT_KEY
)

blob_service_client = BlobServiceClient(
    account_url=f"https://{AZURE_ACCOUNT_NAME}.blob.core.windows.net",
    credential=AZURE_ACCOUNT_KEY
)

container_client = blob_service_client.get_container_client(AZURE_CONTAINER_NAME)

#METODO PARA SUBIR ARCHIVO A AZURE
def upload_file_to_azure(file):
    try:
        blob_name = str(uuid.uuid4()) + "-" + file.name
        blob_client = container_client.get_blob_client(blob_name)
        blob_client.upload_blob(file)
        return blob_client.url
    except Exception as e:
        print(f"Error uploading file to Azure Blob Storage: {e}")
        return None
#METODO PARA CONVERTIR LA NOTA A JSON
def upload_json_to_azure(data, user_id):
    try:
        blob_name = f"{user_id}/{str(uuid.uuid4())}.json"
        blob_client = container_client.get_blob_client(blob_name)
        blob_client.upload_blob(json.dumps(data))
        return blob_client.url
    except Exception as e:
        print(f"Error uploading JSON to Azure Blob Storage: {e}")
        return None