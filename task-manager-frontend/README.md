# task-manager-frontend 🎨

SPA para el sistema de gestión de tareas **TaskFlow (Mini Jira)**, construida con Angular 17+ y Angular Material con tema oscuro personalizado.

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| Angular 17+ | Framework frontend (Standalone Components) |
| Angular Material | Componentes UI |
| TypeScript | Tipado estático |
| RxJS | Programación reactiva |
| Angular Signals | Estado reactivo local |
| JWT (localStorage) | Persistencia de autenticación |

## 📁 Estructura del Proyecto

```
task-manager-frontend/
└── src/app/
    ├── core/
    │   ├── guards/         auth.guard.ts       # AuthGuard + GuestGuard
    │   ├── interceptors/   jwt.interceptor.ts  # Adjunta Bearer token
    │   ├── models/         user.model.ts, task.model.ts
    │   └── services/       auth.service.ts, task.service.ts
    ├── auth/
    │   ├── login/          # Página de login
    │   └── register/       # Página de registro
    ├── tasks/
    │   ├── task-list/      # Lista de tareas con filtros
    │   ├── task-card/      # Tarjeta de tarea
    │   └── task-form/      # Modal crear/editar tarea
    ├── app.routes.ts        # Lazy loading + Guards
    └── app.config.ts        # Providers (HTTP + Interceptor)
```

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
ng serve
```

Navegar a `http://localhost:4200` 🚀

> ⚠️ Asegúrate de que el backend esté corriendo en `http://localhost:3000`

## ✨ Funcionalidades

- 🔐 **Autenticación** — Registro e inicio de sesión con JWT
- 🛡 **AuthGuard** — Rutas protegidas que redirigen al login
- 🔄 **JWT Interceptor** — Token adjuntado automáticamente en cada request
- 📋 **CRUD de tareas** — Crear, editar, eliminar tareas
- ✅ **Toggle de estado** — Marcar como completada/pendiente
- 🎯 **Filtros** — Por estado (pendiente, en progreso, completada)
- 🔍 **Búsqueda** — Por título en tiempo real
- 🌙 **Tema oscuro** — Diseño moderno con modo oscuro

## 🎨 Diseño

- Tema oscuro con paleta **indigo/violeta** (`#7c4dff`)
- Tipografía **Inter** (Google Fonts)  
- Animaciones de entrada y hover en tarjetas
- Badges de estado y prioridad con colores semánticos
- Diseño responsivo con grid adaptativo
