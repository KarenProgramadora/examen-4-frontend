# Examen 4 - Frontend Angular (Mascotas)

Frontend en Angular que consume la API del curso (FastAPI). Incluye un sidebar con las entidades **Estudiantes** y **Mascotas**, y el CRUD completo de cada una contra el backend.

## Como levantar el frontend en local

Requisitos: Node.js (version LTS) y npm.

```bash
npm install
npm start
```

Luego abrir http://localhost:4200

## Backend que usa la aplicacion

- URL base de la API: **http://localhost:8000**
- Repositorio del backend: https://github.com/KarenProgramadora/Aplicaciones-web-2026-2-Karen
- La URL base esta en un solo lugar: `src/environments/environments.ts` (variable `apiUrl`).

Para levantar el backend (en la carpeta de ese repositorio, con su `.env` y el entorno virtual activo):

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

El backend debe tener habilitado CORS para el origen `http://localhost:4200` (configurado en el `main.py` del backend).

## Operaciones de cada entidad

| Operacion | Metodo | Llamado |
| --- | --- | --- |
| Listar la coleccion | GET | /recurso |
| Consultar uno por id | GET | /recurso/{id} |
| Crear | POST | /recurso |
| Editar | PUT | /recurso/{id} |
| Eliminar | DELETE | /recurso/{id} |

Recursos: `/estudiantes` y `/mascotas`. Con la API apagada, la pantalla informa que no hubo conexion y no muestra datos.
