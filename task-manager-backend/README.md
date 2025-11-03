# task-manager-backend 🚀

API REST para el sistema de gestión de tareas **Mini Jira**, construida con Node.js, Express, PostgreSQL y JWT.

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js + Express | Servidor HTTP y enrutamiento |
| PostgreSQL | Base de datos relacional |
| Sequelize | ORM para PostgreSQL |
| bcryptjs | Encriptación de contraseñas |
| jsonwebtoken | Autenticación JWT |
| dotenv | Variables de entorno |
| cors | Manejo de CORS |
| nodemon | Hot-reload en desarrollo |

## 📁 Estructura del Proyecto

```
task-manager-backend/
├── src/
│   ├── config/
│   │   └── db.js               # Conexión Sequelize + PostgreSQL
│   ├── middleware/
│   │   └── auth.middleware.js   # Verificación de JWT
│   ├── models/
│   │   ├── user.model.js        # Modelo User
│   │   └── task.model.js        # Modelo Task
│   ├── routes/
│   │   ├── auth.routes.js       # /api/auth/*
│   │   └── task.routes.js       # /api/tasks/*
│   └── app.js                   # Entrada principal
├── .env                         # Variables de entorno (NO subir a git)
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore
└── package.json
```

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/task-manager-backend.git
cd task-manager-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```
Edita `.env` con tus credenciales:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=task_manager
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=24h
```

### 4. Crear la base de datos en PostgreSQL
```sql
CREATE DATABASE task_manager;
```

### 5. Iniciar el servidor
```bash
# Desarrollo (hot-reload)
npm run dev

# Producción
npm start
```

> ✅ Sequelize creará las tablas automáticamente al iniciar.

## 📡 Endpoints de la API

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | ❌ |
| POST | `/api/auth/login` | Iniciar sesión | ❌ |
| GET | `/api/auth/me` | Perfil del usuario | ✅ |

### Tareas

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/tasks` | Listar tareas (con filtros) | ✅ |
| POST | `/api/tasks` | Crear tarea | ✅ |
| GET | `/api/tasks/:id` | Obtener tarea | ✅ |
| PUT | `/api/tasks/:id` | Actualizar tarea | ✅ |
| DELETE | `/api/tasks/:id` | Eliminar tarea | ✅ |
| PATCH | `/api/tasks/:id/toggle` | Cambiar estado | ✅ |

### Filtros disponibles en GET /api/tasks
```
?status=pending|in_progress|completed
?priority=low|medium|high
?search=texto_a_buscar
```

### Ejemplo: Registrar usuario
```json
POST /api/auth/register
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

### Ejemplo: Crear tarea
```json
POST /api/tasks
Authorization: Bearer <token>
{
  "title": "Implementar login",
  "description": "Crear formulario de autenticación",
  "priority": "high",
  "status": "in_progress",
  "dueDate": "2024-12-31"
}
```

## 🔐 Autenticación

La API usa **JWT (JSON Web Tokens)**. Incluye el token en el header de cada request protegido:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 👥 Autor

Desarrollado como proyecto de portafolio — Sistema de gestión de tareas Mini Jira.
