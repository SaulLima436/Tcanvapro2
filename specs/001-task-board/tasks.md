---
description: "Lista de tareas para implementar el tablero de tareas"
---

# Tasks: Gestor de tareas con tablero

**Input**: Design documents from `/specs/001-task-board/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/board-api.md

**Tests**: No se generan tareas de pruebas automatizadas porque no fueron solicitadas. Cada
historia tiene un criterio de aceptaciÃ³n verificable manualmente en el navegador y la guÃ­a estÃ¡
en `quickstart.md`.

**Organization**: Las tareas estÃ¡n agrupadas por historia de usuario para entregar el producto
por incrementos.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede ejecutarse en paralelo: toca archivos distintos y no tiene dependencias pendientes.
- **[Story]**: Historia de usuario asociada (`US1`, `US2`, `US3`).
- Cada tarea nombra los archivos que debe crear o modificar.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Crear el proyecto web y su configuraciÃ³n local.

- [X] T001 Inicializar `package.json` con scripts `dev`, `api`, `build` y `preview`, y dependencias React, Vite, `@vitejs/plugin-react` y `better-sqlite3` en `package.json`.
- [X] T002 [P] Ignorar dependencias, artefactos compilados y la base local SQLite en `.gitignore` (`node_modules/`, `dist/`, `data/*.sqlite`, `data/*.sqlite-wal` y `data/*.sqlite-shm`).
- [X] T003 Crear la entrada HTML y React, e instalar la configuraciÃ³n Vite con proxy `/api` al servidor local en `index.html`, `src/main.jsx` y `vite.config.js`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Dejar disponible el vocabulario comÃºn, la persistencia y el servidor local antes
de comenzar las historias.

- [X] T004 Definir los cÃ³digos, nombres visibles y orden de las tres columnas (`assigned_recently`, `in_progress`, `completed`) en `shared/columns.js`.
- [X] T005 Crear `data/tcanvapro.sqlite` al iniciar, con tabla de tareas, identificador Ãºnico y columnas de datos, validando el tÃ­tulo con la regla Â«al menos un carÃ¡cter distinto de espacio despuÃ©s de recortarloÂ» y `column` con uno de los tres cÃ³digos de `shared/columns.js` en `server/db.js`.
- [X] T006 Crear el servidor HTTP local en `server/index.js`, enlazarlo solo a `127.0.0.1:3001` y aÃ±adir lectura JSON y respuestas de error en espaÃ±ol segÃºn `contracts/board-api.md`.

**Checkpoint**: Cliente Vite, configuraciÃ³n de columnas, SQLite y API local base listos.

---

## Phase 3: User Story 1 - Organizar tareas en el tablero (Priority: P1) ðŸŽ¯ MVP

**Goal**: Ver el tablero de referencia, crear tareas y conservarlas al recargar.

**Independent Test**: Iniciar la aplicaciÃ³n, comprobar las tres columnas oscuras con conteo y
acciÃ³n de agregar; crear una tarea en Â«Asignadas recientementeÂ», recargar y verificar que el
tÃ­tulo y la columna persisten. Intentar guardar un tÃ­tulo vacÃ­o y verificar el mensaje.

### Implementation for User Story 1

- [X] T007 [P] [US1] Implementar `GET /api/tasks` y `POST /api/tasks` en `server/index.js`; recortar y rechazar tÃ­tulos vacÃ­os y validar el cÃ³digo de columna segÃºn `shared/columns.js`.
- [X] T008 [P] [US1] Crear los componentes presentacionales del tablero, columnas y tarjetas con los nombres/orden del prototipo, conteos y formulario de tÃ­tulo por columna en `src/components/TaskBoard.jsx`, `src/components/TaskColumn.jsx`, `src/components/TaskCard.jsx` y `src/styles.css`.
- [X] T009 [P] [US1] Crear las llamadas JSON para listar y crear tareas en `src/api/tasks.js`, usando las rutas y respuestas de `contracts/board-api.md`.
- [X] T010 [US1] Conectar carga inicial y creaciÃ³n de tareas desde la columna elegida, mostrar errores de tÃ­tulo y mantener los conteos derivados de la lista de tareas en `src/App.jsx` y `src/components/TaskBoard.jsx`.

**Checkpoint**: La persona puede ver el tablero, agregar tareas y conservarlas tras recargar.

---

## Phase 4: User Story 2 - Avanzar tareas con el tablero (Priority: P2)

**Goal**: Mover una tarea entre columnas mediante arrastrar y soltar y conservar el cambio.

**Independent Test**: Arrastrar una tarea desde Â«Asignadas recientementeÂ» a Â«En procesoÂ» y
despuÃ©s a Â«TerminadoÂ»; observar que se actualizan las dos columnas y sus conteos, y recargar
para comprobar que el cambio persiste.

### Implementation for User Story 2

- [X] T011 [P] [US2] AÃ±adir `PATCH /api/tasks/:id` para guardar cambios de columna, validar el identificador y el valor recibido y responder `404` si la tarea no existe en `server/index.js`.
- [X] T012 [P] [US2] AÃ±adir la operaciÃ³n cliente para cambiar una tarea de columna mediante `PATCH /api/tasks/:id` en `src/api/tasks.js`.
- [X] T013 [US2] Habilitar arrastrar tarjetas y soltarlas en una columna vÃ¡lida; guardar el movimiento, actualizar conteos y restaurar la columna anterior con un mensaje claro si falla en `src/components/TaskCard.jsx`, `src/components/TaskColumn.jsx` y `src/App.jsx`.

**Checkpoint**: Las tareas se mueven entre las tres columnas y el estado se conserva.

---

## Phase 5: User Story 3 - Mantener actualizadas las tareas (Priority: P3)

**Goal**: Corregir el tÃ­tulo o eliminar una tarea existente.

**Independent Test**: Cambiar el tÃ­tulo de una tarea y guardar; iniciar otra ediciÃ³n y cancelarla;
eliminar una tarea distinta y comprobar que ya no aparece.

### Implementation for User Story 3

- [X] T014 [P] [US3] Completar `PATCH /api/tasks/:id` para actualizar tÃ­tulos y aÃ±adir `DELETE /api/tasks/:id`, con validaciÃ³n del tÃ­tulo, `404` para tareas inexistentes y `204` al eliminar en `server/index.js`.
- [X] T015 [P] [US3] AÃ±adir las operaciones cliente para editar y eliminar tareas usando el contrato de `src/api/tasks.js`.
- [X] T016 [US3] AÃ±adir ediciÃ³n de tÃ­tulo con guardar/cancelar y eliminaciÃ³n de tarjeta; mostrar errores de la API y actualizar el conteo derivado en `src/components/TaskCard.jsx` y `src/App.jsx`.

**Checkpoint**: La persona puede editar y eliminar tareas sin perder el resto del tablero.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mantener alineadas las instrucciones de uso y el proyecto.

- [X] T017 Actualizar los comandos de inicio y los pasos manuales de aceptaciÃ³n para reflejar los scripts reales en `AGENTS.md` y `specs/001-task-board/quickstart.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sin dependencias; T001 y T002 pueden empezar en paralelo. T003 requiere la estructura inicial del proyecto.
- **Foundational (Phase 2)**: Depende de Setup; T004 precede T005 porque la base valida los cÃ³digos de columna; T005 precede T006.
- **User Story 1 (Phase 3)**: Depende de toda la fundaciÃ³n. T007, T008 y T009 pueden empezar en paralelo; T010 integra sus resultados.
- **User Story 2 (Phase 4)**: Depende de US1. T011 y T012 pueden empezar en paralelo; T013 integra ambos con la interfaz.
- **User Story 3 (Phase 5)**: Depende de US1. T014 y T015 pueden empezar en paralelo; T016 integra ediciÃ³n y eliminaciÃ³n con la tarjeta. Se coloca despuÃ©s de US2 para entregar en prioridad y evitar cambios simultÃ¡neos en los mismos componentes.
- **Polish (Phase 6)**: DespuÃ©s de las historias implementadas, T017 ajusta documentaciÃ³n local.

### User Story Dependencies

- **US1 (P1)**: Comienza despuÃ©s de la fundaciÃ³n; no depende de otras historias y constituye el MVP.
- **US2 (P2)**: Depende de la tarjeta y carga de tareas entregadas en US1.
- **US3 (P3)**: Depende de la tarjeta y las acciones API de US1; no requiere US2 para funcionar.

### Parallel Opportunities

- **Setup**: T001 con T002.
- **US1**: T007, T008 y T009, despuÃ©s de completar la fundaciÃ³n.
- **US2**: T011 con T012.
- **US3**: T014 con T015.

## Parallel Example: User Story 1

```text
DespuÃ©s de la fundaciÃ³n, se pueden asignar estas tareas a la vez:
- T007: GET/POST de tareas en server/index.js
- T008: estructura visual en src/components/TaskBoard.jsx, TaskColumn.jsx, TaskCard.jsx y src/styles.css
- T009: cliente JSON en src/api/tasks.js

Luego ejecutar T010 para conectar carga, creaciÃ³n, validaciÃ³n y conteos.
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Setup y Foundational.
2. Completar US1 para mostrar el tablero, crear tareas y conservarlas.
3. Detenerse para revisar el recorrido independiente descrito en `quickstart.md`.

### Incremental Delivery

1. Setup + Foundational â†’ servidor, cliente y almacenamiento listos.
2. US1 â†’ tablero visible y tareas persistentes (MVP).
3. US2 â†’ movimiento entre columnas con conteos actualizados.
4. US3 â†’ ediciÃ³n de tÃ­tulo y eliminaciÃ³n.
5. Polish â†’ comandos locales y guÃ­a de aceptaciÃ³n alineados con el proyecto.

## Notes

- Todas las tareas tienen identificador, checkbox, archivo(s) destino y etiqueta de historia donde corresponde.
- No se incluyeron tareas de pruebas automatizadas porque no fueron solicitadas; los criterios independientes son manuales y estÃ¡n en `quickstart.md`.
- La funciÃ³n de columnas personalizadas, fechas, etiquetas, comentarios, reacciones y adjuntos no se implementa en esta versiÃ³n.
