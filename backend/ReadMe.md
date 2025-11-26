# 🚀 TaskMaster API - Backend

TaskMaster es el componente de API RESTful para la aplicación Full-Stack de gestión de tareas, desarrollado como proyecto integrador final. Se enfoca en proporcionar una **API segura y estructurada** para las operaciones CRUD de tareas y la autenticación de usuarios.

---

## 🌟 Características Principales y Requisitos Cumplidos

Este backend fue desarrollado siguiendo una arquitectura en capas estricta y aplicando medidas de seguridad avanzadas, tal como exige el enunciado del trabajo integrador.

### Arquitectura y Estructura
* **Arquitectura en Capas:** Estructura modular y limpia con separación clara de responsabilidades:
    * `routes/`: Define las rutas y dirige la petición.
    * `controllers/`: Maneja la lógica de Request/Response.
    * `services/`: Contiene la **lógica de negocio** principal del proyecto.
    * `repositories/`: Encargado del **acceso a la base de datos** (Consultas y ORM).
* **Middlewares Esenciales:** Implementación de CORS, validación de input (ej. Joi o Express-validator) y un manejo centralizado de errores (`try-catch` y un *handler* de errores global).

### Seguridad y Autenticación
* **Autenticación Segura:**
    * **Registro y Login** que devuelve un JSON Web Token (JWT).
    * **Hash de Contraseñas** usando `bcrypt` para máxima seguridad.
    * **JWT Protection:** Rutas sensibles (CRUD de tareas) protegidas con un middleware que verifica el JWT.
* **Verificación de Email:**
    * Al registrarse, el usuario recibe un email con un link/token de activación.
    * Implementación de *endpoint* dedicado para la verificación.
* **Variables de Entorno:** Uso de `dotenv` para manejar secretos (claves JWT, URI de DB, etc.).
* **Envío de Emails:** Uso de `nodemailer` para el flujo de verificación y otros emails.

### Entidades Gestionadas (CRUD Real)
1.  **Entidad Principal:** **`Task`** (Tarea) - CRUD completo: crear, obtener, editar, eliminar. Incluye el manejo de estados (`archivar/desarchivar`).
2.  **Entidad Relacionada:** **`User`** (Usuario) - Gestiona el registro y autenticación. El modelado de la relación es un vínculo 1:N (un usuario tiene muchas tareas), manejado mediante la referencia (`ref` o `populate`) en Mongoose.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Backend** | **Node.js, Express** | Entorno de ejecución y framework RESTful. |
| **Base de Datos** | **MongoDB** | Base de datos NoSQL flexible y escalable. |
| **ORM** | **Mongoose** | Modelado y conexión con MongoDB. |
| **Seguridad** | **bcrypt, jsonwebtoken** | Hashing de contraseñas y creación/manejo de tokens. |
| **Mailing** | **Nodemailer** | Servicio para el envío de correos (verificación de email). |
| **Despliegue** | **Render** | Plataforma de hosting para el despliegue público de la API. |

---

## ⚙️ Instalación y Configuración Local

### Prerrequisitos
* **Node.js** (versión recomendada: 18+ o superior)
* Una instancia de **MongoDB** (local o en la nube, ej. MongoDB Atlas).

### Pasos para el Setup
1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/alee093/TaskMaster_backend.git](https://github.com/alee093/TaskMaster_backend.git)
    cd TaskMaster_backend
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto y establece las siguientes variables:

    ```env
    # CONEXIÓN A LA BASE DE DATOS
    MONGO_URI="tu_uri_de_conexion_a_mongodb"

    # CONFIGURACIÓN DEL SERVIDOR
    PORT=3001 # O el puerto que prefieras

    # SEGURIDAD Y JWT
    JWT_SECRET="una_cadena_larga_y_secreta"
    JWT_EXPIRES_IN="1h" # Tiempo de expiración del token de sesión

    # CONFIGURACIÓN DE EMAIL (Nodemailer)
    EMAIL_USER="tu_correo_de_envio"
    EMAIL_PASS="tu_contrasena_o_app_password"
    # URL DEL FRONTEND (necesario para generar el link de verificación)
    FRONTEND_URL="http://localhost:5173" # Asegúrate de usar la URL correcta
    ```

4.  **Iniciar el Servidor:**
    ```bash
    npm start
    # o para desarrollo con hot-reload:
    npm run dev
    ```

---

## 🌐 Endpoints de la API (Documentación)

La API opera sobre dos entidades principales: **Auth/User** y **Tasks**.

### 🔐 Autenticación y Usuarios

| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registra un nuevo usuario y envía email de verificación. | No |
| `GET` | `/api/auth/verify-email/:token` | Verifica el email usando el token recibido. | No |
| `POST` | `/api/auth/login` | Inicia sesión y devuelve el token JWT. | No |
| `GET` | `/api/auth/me` | Obtiene la información del usuario logueado. | Sí |

### 📝 Tareas (CRUD Protegido)

**Todas las rutas de Tareas requieren el `Bearer Token` en el encabezado `Authorization`.**

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Crea una nueva tarea. | `{ title, description?, status? }` |
| `GET` | `/api/tasks` | Obtiene todas las tareas del usuario (con filtros/paginación opcional). | N/A |
| `GET` | `/api/tasks/:id` | Obtiene una tarea específica. | N/A |
| `PUT` | `/api/tasks/:id` | Actualiza título o descripción de una tarea. | `{ title?, description? }` |
| `PATCH` | `/api/tasks/:id/archive` | Cambia el estado a 'archivado'. | N/A |
| `PATCH` | `/api/tasks/:id/unarchive` | Cambia el estado a 'activo'. | N/A |
| `DELETE` | `/api/tasks/:id` | Elimina una tarea. | N/A |

> **Nota:** Se incluye una **Postman Collection** en el repositorio para facilitar las pruebas de todos los endpoints.

---

## 🔗 Despliegue Público

El backend se encuentra desplegado y accesible en la siguiente URL:

* **URL de la API Desplegada:** `https://taskmaster-backend-1-7xl6.onrender.com`

---

## 🤝 Autor y Contacto

* **Autor:** instagram: alee_baran - email: baran.alejandro04@gmail.com
* **Repositorio Frontend:** [TaskMaster_frontend](https://github.com/alee093/TaskMaster_frontend)
* **Web App Desplegada:** [task-master-frontend-nu.vercel.app](https://task-master-frontend-nu.vercel.app)