# GradeBook

Sistema completo de gestión académica que permite administrar estudiantes, materias y calificaciones de manera centralizada y eficiente.

GradeBook consta de dos aplicaciones independientes pero integradas:

- **Backend**: API REST desarrollada con Java y Spring Boot
- **Frontend**: Aplicación web interactiva con React y TypeScript

## Descripción general

GradeBook es una solución escalable para la gestión académica que proporciona:

- Gestión completa de estudiantes (crear, leer, actualizar, eliminar)
- Gestión completa de materias académicas (crear, leer, actualizar, eliminar)
- Registro y consulta de calificaciones
- Dashboard centralizado con un resumen del sistema
- Interfaz intuitiva y responsiva
- API REST completamente documentada con Swagger/OpenAPI

## Documentación

El repositorio incluye diagramas que documentan el aplicativo y además un documento con la paleta de colores utilizada y algunos mockups.

## Estructura del proyecto

```txt
Gradebook/
├── academic-grades-api/          # Backend - API REST con Java y Spring Boot
│   ├── src/
│   ├── database/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pom.xml
│   └── README.md
│
├── academic-grades-frontend/     # Frontend - Aplicación React con TypeScript
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── Documentación                 # Documentación del aplicativo
└── README.md                     # Este archivo
```

## Tecnologías principales

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Docker & Docker Compose
- Swagger/OpenAPI

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Sass/SCSS

## Inicio rápido

### Requisitos

Antes de empezar, asegúrate de tener instalado:

- **Para el backend/db/frontend**:
  - Docker
  - Docker Compose
  - Git

- **Para el frontend local**:
  - Node.js (versión 18 o superior)
  - npm o yarn

### Ejecución completa del sistema

Esto es un resumen de la ejecución completa del sistema para más información se recomienda leer el README específico de cada carpeta backend y frontend.

#### Iniciar el aplicativo

Navega a la carpeta del backend y ejecuta:

```bash
cd academic-grades-api
docker compose up --build
```

El backend estará disponible en: `http://localhost:8080`

El frontend estará disponible en: `http://localhost:5173`

La base de datos: PostgreSQL en puerto 5432 (interno en Docker)

La documentación interactiva de la API (Swagger) en: `http://localhost:8080/swagger-ui/index.html`

### Datos de prueba

El proyecto incluye un archivo `.dump` con datos de prueba en la siguiente ruta:

```txt
academic-grades-api/database/academic_grades.dump
```

Para restaurar los datos de prueba en la base de datos dockerizada, primero se debe acceder a la carpeta del backend

```bash
cd .\academic-grades-api\
```

Se deben levantar los contenedores:

```bash
docker compose up --build
```

Luego, en otra terminal, ejecutar:

```bash
docker cp ./database/academic_grades.dump academic_grades_db:/tmp/academic_grades.dump
```

Después restaurar el backup dentro de PostgreSQL:

```bash
docker exec -it academic_grades_db pg_restore -U academic_user -d academic_grades --clean --if-exists /tmp/academic_grades.dump
```

Después de ejecutar estos comandos, la base de datos quedará cargada con los datos de prueba.

> Nota: el comando de restauración usa `--clean`, por lo que puede eliminar objetos existentes antes de restaurar el backup.

#### Iniciar el Frontend LOCAL (opcional)

El aplicativo ya se despliega por compkleto utilizando docker pero si se requiere desarrollar el local: 

En otra terminal, navega a la carpeta del frontend y ejecuta:

```bash
cd academic-grades-frontend
npm install
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## Documentación específica

Para información detallada sobre cada componente del sistema, consulta los archivos README específicos:

- **[Backend README](./academic-grades-api/README.md)**: Instrucciones de instalación, configuración de variables de entorno, datos de prueba, endpoints de la API y estructura del backend.

- **[Frontend README](./academic-grades-frontend/README.md)**: Guía de desarrollo, estructura de componentes, configuración de la API, páginas principales y estructura de estilos.

## Características principales

### Dashboard
- Resumen de estadísticas del sistema
- Total de estudiantes registrados
- Total de materias disponibles
- Total de calificaciones registradas
- Accesos rápidos a los módulos

### Gestión de Estudiantes
- Crear nuevos estudiantes
- Actualizar información de estudiantes
- Eliminar estudiantes
- Listar todos los estudiantes
- Filtrado y búsqueda

### Gestión de Materias
- Crear nuevas materias
- Actualizar información de materias
- Eliminar materias
- Listar todas las materias
- Información de créditos académicos

### Gestión de Calificaciones
- Registrar calificaciones de estudiantes
- Consultar calificaciones por estudiante
- Filtrar por materia
- Visualizar historial de calificaciones
- Rango de calificaciones (0-5)

## Variables de entorno

### Backend (.env en academic-grades-api/)

```env
POSTGRES_DB=academic_grades
DB_USER=academic_user
DB_PASSWORD=academic_pass
DB_PORT=5432
DB_URI=jdbc:postgresql://db:5432/academic_grades
DB_DRIVER=org.postgresql.Driver
SERVER_PORT=8080

FRONTEND_PORT=5173
VITE_API_URL=/api
```

### Frontend LOCAL (.env en academic-grades-frontend/)

```env
VITE_API_URL=http://localhost:8080/api
```

## Detener el sistema

### Backend
```bash
cd academic-grades-api
docker compose down
```

Para eliminar también los volúmenes de base de datos:
```bash
docker compose down -v
```

### Frontend LOCAL
Presiona `Ctrl + C` en la terminal donde se ejecuta `npm run dev`

## Notas importantes

- Los datos se persisten en la base de datos PostgreSQL del backend
- La aplicación es completamente responsiva
- Todos los textos están en español
- La API incluye manejo de errores y validación de datos

