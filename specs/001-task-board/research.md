# Investigación y decisiones

**Fecha**: 2026-10-20
**Feature**: `001-task-board`

## Arquitectura local

**Decisión**: React/Vite en el navegador y una API pequeña en Node.js que es el único proceso
que abre el archivo SQLite. En desarrollo Vite reenvía `/api` al proceso Node. La base de datos
permanece en el mismo equipo o entorno que el servidor.

**Motivo**: El prototipo es una aplicación web, pero la base SQLite es un archivo y el navegador
no debe abrirlo directamente. SQLite documenta que el modelo funciona bien cuando el archivo
está en el mismo equipo que el proceso de aplicación; también recomienda un motor cliente-servidor
si varios equipos acceden directamente al mismo archivo [SQLite: Appropriate Uses](https://www.sqlite.org/whentouse.html).

**Alternativas consideradas**:

- SQLite en WebAssembly dentro del navegador: evita una API, pero agrega trabajo de persistencia
  del archivo en el navegador. No se elige para esta versión.
- Acceso simultáneo al mismo archivo SQLite desde varios equipos: no se incluye; no corresponde
  al supuesto de un tablero personal.

## Runtime y acceso a SQLite

**Decisión**: Node.js 24 LTS y `better-sqlite3`, con consultas preparadas cortas dentro de la API.
El repositorio de la biblioteca documenta una API síncrona y binarios precompilados para
versiones LTS y plataformas principales [better-sqlite3 README](https://github.com/WiseLibs/better-sqlite3).
Node 24 figura como LTS en la tabla oficial de versiones y satisface el requisito actual de Vite
[Node.js releases](https://nodejs.org/en/about/previous-releases), [Vite Getting Started](https://vite.dev/guide/).

**Alternativa considerada**: `node:sqlite` está integrado en Node y reduce una dependencia,
pero la documentación de Node 26 lo clasifica como *Release Candidate* (estabilidad 1.2). Para
este plan se prefiere la biblioteca mantenida y su instalación de binarios LTS antes que basar
la primera versión en una API que aún puede cambiar
[Node.js SQLite API](https://nodejs.org/api/sqlite.html).

## Cliente React y tablero

**Decisión**: Una sola colección de tareas es el estado canónico del cliente. Las tareas de cada
columna y los conteos del encabezado se derivan de esa colección; no se guardan copias del conteo.
React recomienda evitar estado redundante y construir el árbol de componentes a partir del diseño
[React: Managing State](https://react.dev/learn/managing-state), [React: Thinking in React](https://react.dev/learn/thinking-in-react).

La estructura de Vite se mantiene estándar con su integración oficial de React
[Vite: Features](https://vite.dev/guide/features.html). El movimiento usa los eventos nativos del
navegador para arrastrar y soltar; la columna de destino acepta el soltar y manda la actualización
a la API. La documentación de MDN requiere habilitar el destino durante `dragover`
[MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations).

## Aplicación del prototipo y límite de alcance

Se adoptan el fondo oscuro, el orden y los nombres de columnas del prototipo, los conteos y la
acción para agregar tarea. Los conteos se calculan de las tareas reales. No se incluyen fechas,
etiquetas, reacciones, comentarios, adjuntos ni creación de columnas: aunque aparecen en la imagen,
la especificación los deja fuera de esta versión.

## Validación

La validación funcional se realiza recorriendo los escenarios de `spec.md` desde el navegador y
comprobando persistencia tras recargar. No se incorpora un sistema de pruebas automatizadas ni se
ejecutan pruebas en esta fase de planificación.
