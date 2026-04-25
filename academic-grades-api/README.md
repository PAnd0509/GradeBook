# GradeBook - Backend

GradeBook es una API REST desarrollada con Java y Spring Boot para la gestión académica de alumnos, materias y notas.

El backend permite realizar operaciones CRUD sobre alumnos y materias, además de registrar y consultar notas asociadas a un alumno y una materia.

## Tecnologías utilizadas

- Java 17
- Spring Boot
- Spring Data JPA
- Maven
- PostgreSQL
- Docker
- Docker Compose
- Swagger / OpenAPI

## Requisitos previos

Para ejecutar el proyecto se necesita tener instalado:

- Docker
- Docker Compose
- Git

No es necesario instalar Java, Maven ni PostgreSQL localmente, ya que la aplicación y la base de datos se ejecutan mediante Docker.

## Estructura general del proyecto

```txt
academic-grades-api/
├── database/
│   └── academic_grades.dump
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── academicgrades/
│       │           └── api/
│       │               ├── config/
│       │               ├── controller/
│       │               ├── dto/
│       │               ├── exception/
│       │               ├── model/
│       │               ├── repository/
│       │               ├── service/
│       │               └── AcademicGradesApiApplication.java
│       └── resources/
│           └── application.properties
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── pom.xml
└── README.md
````

## Variables de entorno

El proyecto utiliza variables de entorno para configurar la conexión a la base de datos, puertos y la URL de la API. Estas variables se aplican tanto al backend como al frontend.

Ejemplo de archivo `.env`:

```env
# Configuración de PostgreSQL
POSTGRES_DB=academic_grades
DB_USER=academic_user
DB_PASSWORD=academic_pass
DB_PORT=5432
DB_URI=jdbc:postgresql://db:5432/academic_grades
DB_DRIVER=org.postgresql.Driver

# Configuración del backend
SERVER_PORT=8080

# Configuración del frontend
FRONTEND_PORT=5173
VITE_API_URL=/api
```

### Descripción de variables

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `POSTGRES_DB` | Nombre de la base de datos PostgreSQL | `academic_grades` |
| `DB_USER` | Usuario de PostgreSQL | `academic_user` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `academic_pass` |
| `DB_PORT` | Puerto interno de PostgreSQL en Docker | `5432` |
| `DB_URI` | URI de conexión a la base de datos | `jdbc:postgresql://db:5432/academic_grades` |
| `DB_DRIVER` | Driver de PostgreSQL | `org.postgresql.Driver` |
| `SERVER_PORT` | Puerto del backend (API) | `8080` |
| `FRONTEND_PORT` | Puerto del frontend (React) | `5173` |
| `VITE_API_URL` | URL base de la API para el frontend | `/api` |

El repositorio incluye un archivo `.env.example`, se puede crear el archivo `.env` copiando su contenido:

```bash
cp .env.example .env
```

> **Nota**: La variable `VITE_API_URL=/api` permite que el frontend se comunique con el backend a través de un proxy inverso en Docker. Para desarrollo local sin Docker, deberías usar `http://localhost:8080/api`.

## Ejecución del proyecto

Para ejecutar la aplicación completa (backend, frontend y base de datos), desde la raíz de la carpeta `academic-grades-api`, ejecutar:

```bash
docker compose up --build
```

Este comando levanta tres servicios:

* `academic_grades_db`: Base de datos PostgreSQL.
* `academic_grades_api`: API REST desarrollada con Spring Boot.
* `academic_grades_frontend`: Aplicación frontend desarrollada con React y TypeScript.

> **Nota**: El archivo `docker-compose.yml` también configura y levanta el frontend. Asegúrate de estar en la carpeta correcta.

Para verificar que los contenedores estén activos:

```bash
docker ps
```

Los servicios quedan disponibles en:

* **Frontend**: `http://localhost:5173`
* **Backend / API**: `http://localhost:8080`
* **Base de datos**: PostgreSQL en puerto 5432 (interno en Docker)

## Documentación Swagger

La documentación interactiva de la API está disponible en:

```txt
http://localhost:8080/swagger-ui/index.html
```

Desde Swagger se pueden probar los endpoints de alumnos, materias y notas.

## Datos de prueba

El proyecto incluye un archivo `.dump` con datos de prueba en la siguiente ruta:

```txt
database/academic_grades.dump
```

Para restaurar los datos de prueba en la base de datos dockerizada, primero se deben levantar los contenedores:

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

## Detener el proyecto

Para detener todos los contenedores (frontend, backend y base de datos):

```bash
docker compose down
```

Para detenerlos y eliminar también los volúmenes de base de datos:

```bash
docker compose down -v
```
