# Examen 4 - Frontend CRUD ITM

LINK DEL VIDEO - Karen Cardona 
https://youtu.be/_oZnTQqUS3E

Aplicación frontend desarrollada con Angular para consumir la API REST del proyecto backend del examen 4.

El proyecto utiliza una estructura compartida para que cada integrante del equipo pueda desarrollar el módulo correspondiente a una entidad, manteniendo un mismo diseño y una integración uniforme con el backend.

## Tecnologías

- Angular 21
- TypeScript
- HTML y CSS
- HttpClient para consumir la API REST
- Backend desarrollado con FastAPI

## Requisitos

Antes de ejecutar el proyecto, es necesario tener instalado:

- Node.js
- npm
- Angular CLI

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/KarenProgramadora/examen-4-frontend.git
```

2. Ingresar a la carpeta:

```bash
cd examen-4-frontend
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
ng serve
```

5. Abrir la aplicación en el navegador:

```text
http://localhost:4200/
```

## Conexión con el backend

El frontend consume el backend mediante peticiones HTTP utilizando Angular HttpClient.

La dirección base de la API se configura en un único archivo:

```text
src/environments/environments.ts
```

Configuración actual:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

El backend debe estar ejecutándose en:

```text
http://localhost:8000
```

Documentación interactiva de la API:

```text
http://localhost:8000/docs
```

Cada integrante debe tener el backend disponible localmente para probar su módulo.

## Estructura del proyecto

```text
src/
 ├── app/
 │   ├── layout/
 │   ├── pages/
 │   │   └── estudiantes/
 │   ├── services/
 │   │   └── estudiantes/
 │   ├── app.config.ts
 │   ├── app.routes.ts
 │   └── app.ts
 │
 ├── environments/
 │   └── environments.ts
 │
 ├── index.html
 └── styles.css
```

## Entidades del backend

El backend dispone de los siguientes módulos:

- Estudiantes
- Empleados
- Mascotas
- Personas
- Productos
- Vehículos

La interfaz cuenta con un menú lateral compartido. Cada integrante debe desarrollar el módulo de la entidad que tenga asignada, respetando la estructura y el diseño existentes.

## Trabajo colaborativo

Para evitar conflictos entre los integrantes:

1. Cada integrante debe clonar el repositorio.
2. Antes de comenzar a trabajar, debe actualizar su copia con los cambios de `main`.
3. Cada integrante debe crear una rama independiente para desarrollar su módulo.
4. Los cambios deben integrarse mediante Pull Requests hacia `main`.
5. No se deben realizar modificaciones directamente sobre `main` sin coordinación del equipo.

Ejemplos de nombres de ramas:

```text
feat/empleados
feat/mascotas
feat/personas
feat/productos
feat/vehiculos
```

## Consideraciones

- Mantener el diseño general y el menú lateral.
- Utilizar los servicios de Angular para realizar las peticiones HTTP.
- No duplicar la dirección base del backend en los servicios.
- Respetar las rutas y los esquemas definidos por el backend.
- Probar las operaciones CRUD antes de integrar los cambios.

---

**Proyecto académico - Examen 4 - ITM**
