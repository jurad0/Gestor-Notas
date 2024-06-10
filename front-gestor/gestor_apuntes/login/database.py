import pymongo

# Configuración de la conexión a MongoDB
MONGO_URI = 'mongodb+srv://jurado:vM8VEEeGgv0rF6yn@gestor-jurado.izvvtru.mongodb.net/'

def get_db_handle():
    client = pymongo.MongoClient(MONGO_URI)
    db = client['gestor-apuntes']
    return db, client

