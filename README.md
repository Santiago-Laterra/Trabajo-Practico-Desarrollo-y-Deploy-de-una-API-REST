🎬 API REST de Películas (TypeScript, Express, MongoDB)Este proyecto es una API REST completamente funcional y segura, construida con TypeScript, Node.js y el framework Express. Permite a los usuarios consultar (público) y gestionar (requiere autenticación) un catálogo de películas.La API se encuentra desplegada en Render y lista para ser consumida:➡️ URL Base de Producción: https://trabajo-practico-desarrollo-y-deploy-de.onrender.com (Reemplazar con la URL final de Render)


⚙️ Tecnologías Utilizadas (El Stack)
Node.js & Express     Entorno de ejecución y framework para construir la API.


TypeScript    Lenguaje para añadir tipado estático, mejorando la calidad y mantenimiento del código.

MongoDB / Mongoose    Base de datos NoSQL y librería ORM para la gestión de datos.

Zod   Librería de validación de esquemas (para asegurar formato de email, rating, y campos requeridos).

JWT    Sistema de autenticación seguro para proteger las rutas de escritura.

bcryptjs     Librería para el hashing seguro de contraseñas.

express-rate-limit         Middleware para limitar las peticiones a las rutas de autenticación y prevenir ataques de fuerza bruta.


🛠️ Requisitos e Instalación Local 

Para ejecutar el proyecto localmente, necesitas tener instalado:

A. Node.js (versión LTS recomendada).
B. npm (incluido con Node.js).
C. MongoDB Atlas (o una instancia local de MongoDB) para la conexión a la base de datos.1. Clonar e Instalar Dependencias



# 1. Clona el repositorio
git clone <URL_DE_TU_REPOSITORIO>

# 2. Navega a la carpeta
cd nombre-del-proyecto

# 3. Instala todas las dependencias
npm install




2. Configuración de Variables de EntornoCrea un archivo llamado .env en la raíz del proyecto y añade las siguientes variables. Estas son esenciales para la conexión a la base de datos y la seguridad.

# Conexión a MongoDB Atlas (¡Debe ser tu URI real!)

URI_DB="mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>/<DB_NAME>?retryWrites=true&w=majority"

# Clave secreta para firmar los JWT (Cámbiala por una cadena larga y compleja)
JWT_SECRET="TuClaveSecretaMuyLargaYSeguraAquí"

# Puerto de ejecución
PORT=3000



3. Ejecutar el ServidorUna vez configurado el .env, puedes iniciar la aplicación en modo desarrollo:# Ejecuta el servidor usando ts-node-dev (con reinicio automático)
npm run dev 


🚀 Endpoints de la APILa API maneja dos rutas principales: 

1. Gestión de Películas (/movies)MétodoRutaDescripciónSeguridad
GET /movies/           Obtiene el listado de todas las películas 
GET /movies/:id        Obtiene una película por su ID.
POST /movies/          Crea una nueva película.Requiere JWT
PATCH /movies/:id      Actualiza parcial o totalmente una película por su ID. Requiere JWT
DELETE /movies/:id     Elimina una película por su ID.Requiere JWT


2. Uso del Token (Para rutas seguras):Debes incluir el Header Authorization en las peticiones POST, PATCH y DELETE.Authorization: Bearer <TU_TOKEN_JWT_AQUÍ>
