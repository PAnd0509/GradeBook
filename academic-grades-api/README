# GradeBook

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
│       └── java/
│           └── com/
│               └── academicgrades/
│                   └── api/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── pom.xml
└── README.md
````

## Variables de entorno

El proyecto utiliza variables de entorno para configurar la conexión a la base de datos y el puerto de la API.

Ejemplo de archivo `.env`:

```env
POSTGRES_DB=academic_grades
DB_USER=academic_user
DB_PASSWORD=academic_pass
DB_PORT=5432
DB_URI=jdbc:postgresql://db:5432/academic_grades
DB_DRIVER=org.postgresql.Driver
SERVER_PORT=8080
```

Si el repositorio incluye un archivo `.env.example`, se puede crear el archivo `.env` copiando su contenido:

```bash
cp .env.example .env
```

En Windows PowerShell:

```bash
Copy-Item .env.example .env
```

## Ejecución del proyecto

Desde la raíz del proyecto, ejecutar:

```bash
docker compose up --build
```

Este comando levanta dos servicios:

* `academic_grades_db`: base de datos PostgreSQL.
* `academic_grades_api`: API REST desarrollada con Spring Boot.

Para verificar que los contenedores estén activos:

```bash
docker ps
```

La API queda disponible en:

```txt
http://localhost:8080
```

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

## Comandos principales

```bash
git clone <repository-url>
cd academic-grades-api
cp .env.example .env
docker compose up --build
docker ps
docker cp ./database/academic_grades.dump academic_grades_db:/tmp/academic_grades.dump
docker exec -it academic_grades_db pg_restore -U academic_user -d academic_grades --clean --if-exists /tmp/academic_grades.dump
```

En Windows PowerShell, para crear el archivo `.env`:

```bash
Copy-Item .env.example .env
```

## Endpoints principales

### Alumnos

| Método | Endpoint             | Descripción                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/students`      | Crear un alumno            |
| GET    | `/api/students`      | Listar todos los alumnos   |
| GET    | `/api/students/{id}` | Consultar un alumno por ID |
| PUT    | `/api/students/{id}` | Actualizar un alumno       |
| DELETE | `/api/students/{id}` | Eliminar un alumno         |

### Materias

| Método | Endpoint             | Descripción                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/subjects`      | Crear una materia            |
| GET    | `/api/subjects`      | Listar todas las materias    |
| GET    | `/api/subjects/{id}` | Consultar una materia por ID |
| PUT    | `/api/subjects/{id}` | Actualizar una materia       |
| DELETE | `/api/subjects/{id}` | Eliminar una materia         |

### Notas

| Método | Endpoint                                              | Descripción                                 |
| ------ | ----------------------------------------------------- | ------------------------------------------- |
| POST   | `/api/grades`                                         | Registrar una nota                          |
| GET    | `/api/grades`                                         | Listar todas las notas                      |
| GET    | `/api/grades/{id}`                                    | Consultar una nota por ID                   |
| GET    | `/api/grades/student/{studentId}`                     | Listar notas por alumno                     |
| GET    | `/api/grades/student/{studentId}/subject/{subjectId}` | Consultar notas de un alumno en una materia |

## Ejemplos de uso

### Crear alumno

```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "birthDate": "2000-05-12"
}
```

### Crear materia

```json
{
  "name": "Mathematics",
  "code": "MATH101",
  "credits": 3
}
```

### Registrar nota

```json
{
  "value": 4.5,
  "studentId": 1,
  "subjectId": 1
}
```

## Detener el proyecto

Para detener los contenedores:

```bash
docker compose down
```

Para detenerlos y eliminar también los volúmenes de base de datos:

```bash
docker compose down -v
```

## Notas importantes

* La aplicación se conecta a PostgreSQL usando variables de entorno.
* La base de datos se ejecuta en Docker.
* La API REST se ejecuta en Docker.
* El archivo `.dump` permite restaurar datos de prueba para validar el funcionamiento del sistema.
* La documentación de la API está disponible mediante Swagger.

```
```