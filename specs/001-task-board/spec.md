# Feature Specification: Gestor de tareas con tablero

**Feature Branch**: `001-task-board`

**Created**: 2026-10-20

**Status**: Draft

**Input**: User description: "Crear una herramienta web simple para gestionar tareas con un tablero canva y mover tareas mediante drag and drop. Usar como referencia la imagen adjunta validada."

## Clarifications

### Session 2026-10-20

- Q: ¿Qué tipo de tablero debe usar Tcanvapro? → A: Tablero Kanban con tres columnas fijas, según los nombres del prototipo validado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Organizar tareas en el tablero (Priority: P1)

Como usuario, quiero crear tareas y verlas en un tablero con columnas claras para saber qué tengo pendiente y qué ya avancé.

**Why this priority**: Es el valor principal del producto: organizar tareas visualmente.

**Independent Test**: Crear una tarea y comprobar que aparece en la primera columna del tablero.

**Acceptance Scenarios**:

1. **Given** que el tablero está vacío, **When** el usuario crea una tarea con un título, **Then** la tarea aparece en «Asignadas recientemente».
2. **Given** que hay tareas en el tablero, **When** el usuario recarga la aplicación, **Then** las tareas y sus columnas siguen visibles.
3. **Given** que el usuario inicia la creación de una tarea, **When** intenta guardarla sin título, **Then** la aplicación indica que el título es obligatorio y no crea la tarea.

---

### User Story 2 - Avanzar tareas con el tablero (Priority: P2)

Como usuario, quiero mover una tarea entre las columnas arrastrándola para reflejar su progreso de forma directa.

**Why this priority**: El movimiento visual hace que el tablero represente el estado actual del trabajo.

**Independent Test**: Arrastrar una tarea a otra columna y comprobar que queda en la nueva columna.

**Acceptance Scenarios**:

1. **Given** una tarea en «Asignadas recientemente», **When** el usuario la arrastra a «En proceso», **Then** aparece en «En proceso».
2. **Given** una tarea en «En proceso», **When** el usuario la arrastra a «Terminado», **Then** aparece en «Terminado».
3. **Given** una tarea movida a otra columna, **When** el usuario recarga la aplicación, **Then** la tarea permanece en esa columna.

---

### User Story 3 - Mantener actualizadas las tareas (Priority: P3)

Como usuario, quiero cambiar el título o eliminar una tarea para que el tablero refleje mis necesidades actuales.

**Why this priority**: La edición y eliminación permiten corregir y retirar tareas sin complicar la organización básica.

**Independent Test**: Editar el título de una tarea y eliminar otra; verificar ambos resultados en el tablero.

**Acceptance Scenarios**:

1. **Given** una tarea existente, **When** el usuario cambia su título y guarda, **Then** el tablero muestra el nuevo título.
2. **Given** una tarea existente, **When** el usuario la elimina, **Then** deja de aparecer en el tablero.

### Edge Cases

- El sistema no permite crear ni guardar una tarea con título vacío o compuesto solo por espacios.
- Si una columna no contiene tareas, sigue visible como destino para arrastrar tareas.
- El usuario puede cancelar la edición de un título sin cambiar la tarea existente.
- Si se intenta soltar una tarea fuera de una columna válida, la tarea conserva su columna anterior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El tablero Kanban MUST mostrar tres columnas fijas en este orden: «Asignadas recientemente», «En proceso» y «Terminado».
- **FR-002**: El usuario MUST poder crear una tarea proporcionando un título no vacío.
- **FR-003**: El tablero MUST mostrar cada tarea en una sola columna a la vez.
- **FR-004**: El usuario MUST poder mover una tarea entre columnas mediante arrastrar y soltar.
- **FR-005**: El sistema MUST conservar las tareas y sus columnas al cerrar o recargar la aplicación.
- **FR-006**: El usuario MUST poder editar el título de una tarea existente.
- **FR-007**: El usuario MUST poder eliminar una tarea existente.
- **FR-008**: La aplicación MUST comunicar de forma comprensible por qué no se guarda un título vacío.
- **FR-009**: Toda interfaz y mensaje MUST estar en español de Perú.
- **FR-010**: La interfaz MUST seguir la presentación oscura del prototipo, mostrar el nombre y el conteo actual en el encabezado de cada columna, y ofrecer una acción para agregar una tarea en cada columna.

### Key Entities

- **Tarea**: Elemento de trabajo identificado por un título y la columna en la que se encuentra.
- **Columna**: Estado fijo del tablero Kanban: Asignadas recientemente, En proceso o Terminado; contiene las tareas de ese estado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un usuario puede crear una tarea con título y verla en el tablero en menos de 30 segundos.
- **SC-002**: Un usuario puede mover una tarea a otra columna con una acción de arrastrar y soltar, y reconocer su nueva ubicación de inmediato.
- **SC-003**: En una revisión manual de diez tareas creadas y movidas, las diez conservan su título y columna después de recargar la aplicación.
- **SC-004**: Una persona que no haya usado el tablero puede identificar las tres columnas y completar la creación y el movimiento de una tarea sin instrucciones externas.
- **SC-005**: Al abrir el tablero, el usuario reconoce las tres columnas por los nombres y el orden del prototipo validado, y ve el conteo correspondiente a las tareas de cada una.

## Assumptions

- El producto de esta versión está pensado para una persona que gestiona su propio tablero; no se incluyen colaboración ni cuentas de usuario.
- El tablero Kanban usa las tres columnas fijas del prototipo: Asignadas recientemente, En proceso y Terminado. No se incluyen columnas personalizadas.
- Una tarea requiere solo un título; fechas, responsables, etiquetas, prioridades y descripciones quedan fuera del alcance inicial.
- Las tareas pertenecen a un único tablero local de la aplicación.
- El prototipo validado es la referencia para la presentación y los nombres de columnas. Fechas, etiquetas, reacciones, comentarios y creación de columnas que aparecen en él quedan fuera del alcance funcional de esta versión hasta que se incorporen expresamente a los requisitos.
