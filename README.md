# Proyecto Gestor  - DAW
### Alumno: [Antonio Jurado Miranda]

## Índice
1. [Introducción](#introducción)
2. [Funcionalidades y Tecnologías Utilizadas](#funcionalidades-y-tecnologías-utilizadas)
3. [Guía de Instalación](#guía-de-instalación)
4. [Guía de Uso](#guía-de-uso)
5. [Enlace a la Documentación](#enlace-a-la-documentación)
6. [Enlace a Figma de la Interfaz](#enlace-a-figma-de-la-interfaz)
7. [Conclusión](#conclusión)
8. [Contribuciones, Agradecimientos y Referencias](#contribuciones-agradecimientos-y-referencias)
9. [Licencias](#licencias)
10. [Contacto](#contacto)

## Introducción
### Descripción del Proyecto
El **Gestor de Apuntes** es una aplicación web diseñada para ayudar a los estudiantes a gestionar y organizar sus apuntes de manera eficiente. Esta aplicación permite crear, editar, visualizar y eliminar tareas y apuntes, además de subir y visualizar archivos PDF relacionados con las tareas.

### Justificación
Este proyecto nace de la necesidad de contar con una herramienta que facilite la organización de tareas y apuntes para estudiantes del ciclo DAW, mejorando así la eficiencia y el manejo del tiempo.

### Objetivos
- Desarrollar una aplicación web funcional que permita la gestión de tareas y apuntes.
- Implementar autenticación y autorización mediante JWT.
- Utilizar Azure Blob Storage para el almacenamiento de archivos PDF.

### Motivación
La motivación principal es proporcionar una herramienta útil para los estudiantes que les permita gestionar mejor su carga académica, contribuyendo así a un mejor rendimiento y organización.

## Funcionalidades y Tecnologías Utilizadas
### Funcionalidades
- **Gestión de Tareas:** Crear, editar, eliminar y visualizar tareas.
- **Subida de Archivos PDF:** Subir y visualizar archivos PDF asociados a las tareas.
- **Autenticación y Autorización:** Uso de JWT para la seguridad de la aplicación.
- **Interfaz de Usuario:** Diseño intuitivo y fácil de usar.

### Tecnologías Utilizadas
- **Frontend:** React, React Bootstrap
- **Backend:** Django, Django Rest Framework
- **Almacenamiento:** Azure Blob Storage
- **Autenticación:** JWT (Json Web Token)
- **Otros:** Axios para las peticiones HTTP, Formik para la gestión de formularios en React

## Guía de Instalación
### Requisitos Previos
- Node.js y npm instalados
- Python y pip instalados
- Azure Storage Account configurada

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/usuario/proyecto-gestor-apuntes.git
   cd proyecto-gestor-apuntes

2. **Instalar dependencias del Frontend:**
    ```bash
    npm install

3. **Instalar dependencias del Backend:**
    ```bash
    pip install -r requirements.txt

4. **Configurar variables de entorno:**
    ```bash
    SECRET_KEY=tu_secret_key
    DEBUG=True
    ALLOWED_HOSTS=localhost
    AZURE_ACCOUNT_NAME=tu_azure_account_name
    AZURE_ACCOUNT_KEY=tu_azure_account_key
    AZURE_CONTAINER_NAME=tu_azure_container_name

5. **Iniciar los servidores de desarrollo:**
    ```bash
    - Frontend: npm run dev

    - Backend: python manage.py runserver

## Guía de Uso

### Registro e Inicio de Sesión:
- Acceder a la página de inicio de sesión y registrarse si es un nuevo usuario.
- Iniciar sesión para acceder a la aplicación.

### Gestión de Tareas:
- Crear una nueva tarea utilizando el formulario.
- Editar tareas existentes seleccionándolas de la lista.
- Eliminar tareas según sea necesario.

### Subida y Visualización de PDF:
- Subir archivos PDF al crear o editar una tarea.
- Visualizar los archivos PDF desde la lista de tareas.

## Enlace a la Documentación
[Documentación del Proyecto](https://github.com/usuario/proyecto-gestor-apuntes/wiki)

## Enlace a Figma de la Interfaz
[Diseño de la Interfaz en Figma](https://www.figma.com/file/ejemplo/proyecto-gestor-apuntes)

## Conclusión
Este proyecto proporciona una herramienta esencial para la gestión de tareas y apuntes, facilitando la organización y mejorando la productividad de los estudiantes del ciclo DAW. La integración con Azure Blob Storage garantiza un manejo eficiente de los archivos, y la implementación de JWT asegura que la aplicación sea segura.

## Contribuciones, Agradecimientos y Referencias

### Contribuciones
Si deseas contribuir a este proyecto, por favor, sigue las [directrices de contribución](https://github.com/usuario/proyecto-gestor-apuntes/CONTRIBUTING.md).

### Agradecimientos
Agradezco a mis profesores y compañeros de clase por su apoyo y colaboración en este proyecto.

### Referencias
- [Documentación de Django](https://docs.djangoproject.com/)
- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/)

## Licencias
Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, ver el archivo [LICENSE](https://github.com/usuario/proyecto-gestor-apuntes/LICENSE).

## Contacto
Para cualquier consulta o sugerencia, puedes contactarme a través de:
- **Email:** [antoniojuradomiranda.com](mailto:antoniojuradomiranda.com)
- **GitHub:** [jurad0](https://github.com/jurad0)
- **LinkedIn:** [Antonio Jurado Miranda](https://www.linkedin.com/in/antonio-jurado-miranda/)