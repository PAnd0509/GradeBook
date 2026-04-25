# GradeBook - Frontend

Frontend de la aplicación GradeBook desarrollado con React, TypeScript y Vite para la gestión académica de estudiantes, materias y calificaciones.

La interfaz proporciona una experiencia de usuario interactiva y responsiva para gestionar toda la información académica de manera centralizada.

## Tecnologías utilizadas

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- Sass/SCSS
- ESLint
- FontAwesome

## Requisitos previos

Para ejecutar el proyecto se necesita tener instalado:

- Docker
- Docker Compose
- Git

No es necesario instalar Node.js, npm ni ninguna otra dependencia localmente, ya que la aplicación se ejecuta mediante Docker.

## Estructura del proyecto

```txt
academic-grades-frontend/
├── src/
│   ├── api/
│   │   ├── apiClient.ts
│   │   ├── gradeService.ts
│   │   ├── studentService.ts
│   │   └── subjectService.ts
│   ├── components/
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── StudentsPage.tsx
│   │   ├── SubjectsPage.tsx
│   │   └── GradesPage.tsx
│   ├── styles/
│   │   ├── global.scss
│   │   └── pages/
│   │       ├── dashboard.scss
│   │       ├── students.scss
│   │       ├── subjects.scss
│   │       └── grades.scss
│   ├── types/
│   │   ├── Grade.ts
│   │   ├── Student.ts
│   │   └── Subject.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Ejecución con Docker

El frontend se ejecuta automáticamente como parte del stack completo de la aplicación. Desde la raíz del proyecto backend, ejecutar:

```bash
docker compose up --build
```

Esto levanta tanto el backend como el frontend:

- **Frontend**: disponible en `http://localhost:5173`
- **Backend**: disponible en `http://localhost:8080`
- **Base de datos**: PostgreSQL en puerto 5432

## Desarrollo local (sin Docker)

Si necesitas desarrollar localmente sin Docker, puedes ejecutar el frontend de forma independiente.

## Configuración de la API

### Con Docker (recomendado)

Cuando se ejecuta con Docker, el frontend se conecta automáticamente al backend mediante la configuración interna de Docker Compose. No se requiere configuración manual.

La configuración en `docker-compose.yml` utiliza:
- `VITE_API_URL=/api`: URL relativa que permite al frontend comunicarse con el backend a través del proxy inverso

### Desarrollo local

El frontend se conecta al backend a través de la variable de entorno `VITE_API_URL`. 

Si necesitas desarrollar localmente sin Docker, crea un archivo `.env` en la raíz del proyecto frontend:

```env
VITE_API_URL=http://localhost:8080/api
```

### Variables de entorno disponibles

| Variable | Descripción | Valor (Docker) | Valor (Local) |
|----------|-------------|----------------|---------------|
| `VITE_API_URL` | URL base de la API | `/api` | `http://localhost:8080/api` |

> **Nota**: El archivo `.env.example` en el repositorio incluye la configuración para desarrollo local.

## Notas

- El frontend requiere que el backend esté ejecutándose para funcionar correctamente
- Los datos se persisten en la base de datos del backend
- La aplicación es completamente responsiva y funciona en dispositivos móviles
