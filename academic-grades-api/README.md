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

El repositorio incluye un archivo `.env.example`, se puede crear el archivo `.env` copiando su contenido:

```bash
cp .env.example .env
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

## Detener el proyecto

Para detener los contenedores:

```bash
docker compose down
```

Para detenerlos y eliminar también los volúmenes de base de datos:

```bash
docker compose down -v
```
