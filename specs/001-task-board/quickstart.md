# Guía de ejecución y validación manual

## Requisitos previos

- Node.js 24 LTS y npm.
- Navegador web actualizado.

## Iniciar la aplicación

1. Desde la raíz del proyecto, instala las dependencias: `npm install`.
2. En una terminal, inicia la API y SQLite: `npm run api`.
3. En otra terminal, inicia Vite: `npm run dev`.
4. Abre `http://localhost:5173`.

La API escucha solo en el equipo local. Vite reenvía `/api` al servidor local y la primera ejecución crea `data/tcanvapro.sqlite`.

## Recorrido de aceptación

1. **Presentación:** comprueba el fondo oscuro y las columnas «Asignadas recientemente», «En proceso» y «Terminado», en ese orden. Cada encabezado muestra el conteo de tareas.
2. **Creación:** agrega una tarea con título desde «Asignadas recientemente»; aparece allí y el conteo aumenta en uno.
3. **Validación:** intenta guardar un título vacío o con espacios; aparece un mensaje claro y no se crea la tarjeta.
4. **Movimiento:** arrastra una tarjeta a «En proceso» y luego a «Terminado». En cada movimiento, se actualizan ambas columnas y sus conteos.
5. **Persistencia:** recarga la página y comprueba que la tarjeta mantiene su título y columna.
6. **Edición y eliminación:** cambia y guarda el título de una tarjeta; elimina otra y comprueba que desaparece y cambia el conteo.
7. **Columna vacía:** deja una columna sin tareas y comprueba que sigue visible y admite una tarjeta arrastrada.
8. **Soltar fuera del tablero:** arrastra una tarjeta fuera de una columna; debe permanecer en la columna original.

## Construcción

Ejecuta `npm run build` para generar los archivos optimizados de Vite.
