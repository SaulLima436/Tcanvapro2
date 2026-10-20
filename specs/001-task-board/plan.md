# Implementation Plan: Gestor de tareas con tablero

**Branch**: `001-task-board` | **Date**: 2026-10-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-task-board/spec.md`

## Summary

Construir el tablero de tareas descrito en la especificación con React y Vite, usando una API
Node.js pequeña para acceder al archivo SQLite local. La interfaz seguirá la referencia
validada: fondo oscuro, columnas «Asignadas recientemente», «En proceso» y «Terminado»,
conteos por columna y una acción para agregar tareas en cada columna. La funcionalidad queda
limitada a crear, editar, eliminar, mover y conservar tareas; fechas, etiquetas, reacciones,
comentarios y creación de columnas no entran en esta versión.

## Technical Context

**Language/Version**: JavaScript ESM; Node.js 24 LTS para el servidor y Vite.

**Primary Dependencies**: React, Vite, `@vitejs/plugin-react` y `better-sqlite3`. El servidor
usa el módulo `node:http` integrado; no se añade un framework de servidor ni una biblioteca
de arrastrar y soltar.

**Storage**: SQLite en `data/tcanvapro.sqlite`; el archivo generado se excluye de Git.

**Testing**: Recorrido manual de los escenarios de aceptación desde el navegador, descrito en
`quickstart.md`; generar el bundle local con `npm run build`. No se añade un framework de
pruebas en esta planificación.

**Target Platform**: Navegador web con un proceso Node.js que sirve la API y mantiene la base
SQLite en el mismo equipo/entorno.

**Project Type**: Aplicación web pequeña con cliente React/Vite y API local Node.js.

**Performance Goals**: Las acciones del tablero se reflejan inmediatamente tras responder la
API. Se aplica el criterio de la spec: crear una tarea en menos de 30 segundos y reconocer el
cambio de columna inmediatamente.

**Constraints**: Español de Perú; tema oscuro y nombres/orden de columnas según el prototipo;
un tablero y una persona; solo título y columna como datos de tarea; sin autenticación,
colaboración ni funciones adicionales del prototipo. El acceso a SQLite permanece en Node,
nunca en el navegador.

**Scale/Scope**: Una persona, un tablero, tres columnas fijas y el conjunto de tareas de una
versión inicial. No se diseña para concurrencia entre usuarios ni para alta disponibilidad.

## Constitution Check

| Principio | Resultado | Aplicación al diseño |
|---|---|---|
| Simplicidad ante todo | PASS | Un cliente, una API pequeña, un archivo SQLite; no se añade estado global ni una biblioteca DnD. |
| Idioma y mercado: Perú | PASS | Toda la interfaz y los mensajes se escriben en español de Perú; no hay importes en esta función. |
| Cero alcance fantasma | PASS | El plan implementa solo FR-001–FR-010. Los elementos extra visibles en el prototipo se excluyen hasta que se especifiquen. |
| Éxito verificable por una persona no técnica | PASS | Cada escenario se comprueba en el navegador con tareas visibles y recarga de la página. |
| Respeto por los datos del usuario | PASS | Se conserva únicamente el título y la columna; no hay cuentas ni secretos. |

**Gate pre-investigación**: PASS. La spec tiene escenarios, requisitos y límites de alcance
concretos. La decisión de uso personal/sin cuentas queda como supuesto de la versión inicial;
no se incluye una experiencia multiusuario.

**Gate post-diseño**: PASS. El modelo y el contrato no amplían el alcance de la spec. La API
solo sirve a la interfaz local y no expone consultas SQL al navegador.

## Project Structure

### Documentation (this feature)

```text
specs/001-task-board/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── board-api.md
└── tasks.md                 # Se generará con $speckit-tasks
```

### Source Code (repository root)

```text
server/
├── db.js                    # Conexión y esquema SQLite
└── index.js                 # API HTTP local
shared/
└── columns.js               # Códigos y nombres fijos de columnas
src/
├── api/
│   └── tasks.js             # Llamadas JSON a la API
├── components/
│   ├── TaskBoard.jsx
│   ├── TaskColumn.jsx
│   └── TaskCard.jsx
├── App.jsx                  # Estado de tareas y acciones principales
├── main.jsx
└── styles.css               # Presentación oscura según el prototipo
data/                        # Creado localmente; SQLite ignorado por Git
vite.config.js               # Proxy /api al servidor local en desarrollo
package.json
```

**Structure Decision**: Un solo proyecto en la raíz con una carpeta `src/` para React y una
carpeta `server/` para el servidor de datos. La base SQLite vive fuera del código y no se
versiona. Las columnas son valores fijos; no requieren CRUD ni tabla de configuración.

## Complexity Tracking

No hay excepciones a la constitución que requieran justificación.
