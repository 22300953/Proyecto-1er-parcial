# MiProyecto

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Backend API (Node + Express + PostgreSQL)

El proyecto incluye una API REST en `backend/` para exponer productos en formato JSON.

### Nota sobre `postgres:latest`

Este proyecto usa `postgres:latest` en `backend/compose.yaml`.

Si vienes de una imagen anterior (por ejemplo 16), puede fallar al arrancar por formato de datos en volumenes viejos. Para evitarlo, el compose monta el volumen en `/var/lib/postgresql` y usa un volumen nuevo (`pgdata_latest`).

Si aun asi quieres reiniciar desde cero, revisa la seccion **Comandos utiles**.

### 1. Configurar variables de entorno

Dentro de `backend/`, crea el archivo `.env` usando `backend/.env.example` como base:

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=tienda
```

### 2. Levantar PostgreSQL con Podman

Dentro de `backend/`:

```bash
podman-compose -f compose.yaml up -d
```

Si todavia no tienes Podman en Arch Linux:

```bash
sudo pacman -S --needed podman podman-compose
```

Verificar estado del contenedor:

```bash
podman ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

### 3. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 4. Ejecutar la API

```bash
npm run dev
```

Debes ver en consola:

- `Conexion exitosa a PostgreSQL`
- `Servidor corriendo en http://localhost:3000`

Endpoints disponibles:

- `GET http://localhost:3000/api/productos` (alias de compatibilidad)
- `GET http://localhost:3000/api/products`
- `GET http://localhost:3000/health`
- `GET http://localhost:3000/`

La app Angular consume `http://localhost:3000/api/productos`.

## Levantar la app completa (BD + backend + frontend)

Usa 3 terminales:

1. Base de datos (Podman)

```bash
cd backend
podman-compose -f compose.yaml up -d
```

2. Backend (Express)

```bash
cd backend
npm install
npm run dev
```

3. Frontend (Angular)

```bash
cd ..
npm install
npm start
```

Abrir:

- Frontend: `http://localhost:4200`
- API: `http://localhost:3000/`

## Comandos utiles

Estado general:

```bash
cd backend
podman-compose -f compose.yaml ps
podman ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

Ver logs de PostgreSQL:

```bash
cd backend
podman logs -f backed-bliss-postgres
```

Parar y volver a levantar BD:

```bash
cd backend
podman-compose -f compose.yaml down
podman-compose -f compose.yaml up -d
```

Reset total de la base (borra datos persistentes):

```bash
cd backend
podman-compose -f compose.yaml down
podman volume ls | rg pgdata_latest
podman volume rm backend_pgdata_latest
podman-compose -f compose.yaml up -d
```

Si no existe `backend_pgdata_latest`, usa el nombre real que te muestre `podman volume ls`.

Validar conexion API -> BD:

```bash
curl -sS http://localhost:3000/health
curl -sS http://localhost:3000/api/productos
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
