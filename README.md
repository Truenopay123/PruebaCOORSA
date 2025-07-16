# Proyecto CRUD
Este proyecto es una aplicación full-stack con un backend y un frontend, diseñada para gestionar diversas entidades a través de operaciones CRUD (Crear, Leer, Actualizar, Eliminar). La aplicación incluye las siguientes características principales:

# Desarrolador
Bryan Axel Cortes Cortes.

## Backend
El backend está ubicado en el directorio backend e incluye:

- routes: Define los puntos de acceso de la API para operaciones CRUD.
- db.js: Configuración y conexión de la base de datos.
- index.js: Punto de entrada principal del servidor backend.
- package.json y package-lock.json: Dependencias del proyecto y archivo de bloqueo.

## Frontend
El frontend está ubicado en el directorio frontend e incluye:

- components: Contiene componentes React para la interfaz de usuario.
- Dashboard.js: Componente principal del panel de control.
- MantenimientoCRUD.js: Gestiona operaciones CRUD para registros de mantenimiento (editar, listar, agregar, eliminar).
- PersonasCRUD.js: Gestiona operaciones CRUD para personas (editar, listar, agregar, eliminar).
- RelacionCRUD.js: Gestiona operaciones CRUD para relaciones (editar, listar, agregar, eliminar).
- VehiculoCRUD.js: Gestiona operaciones CRUD para vehículos (editar, listar, agregar, eliminar).

### Cada módulo CRUD (MantenimientoCRUD.js, PersonasCRUD.js, RelacionCRUD.js, VehiculoCRUD.js) soporta las siguientes operaciones:

- Crear (Agregar): Agregar nuevos registros a la entidad correspondiente.
- Leer (Listar): Mostrar una lista de registros existentes.
- Actualizar (Editar): Modificar registros existentes.
- Eliminar: Remover registros de la base de datos.

## Cómo Empezar
### Clona el repositorio.
- Navega a los directorios backend y frontend por separado.
- Ejecuta npm install en ambos directorios para instalar las dependencias.
- Inicia el servidor backend con node index.js en el directorio backend.
- Inicia el frontend con npm start en el directorio frontend.

## Tecnologías Utilizadas
- Backend: Node.js, Express
- Frontend: React
- Base de datos: Configurada vía db.js