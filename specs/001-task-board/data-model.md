# Modelo de datos: tablero de tareas

## Entidad: Tarea

Representa una tarea de la persona usuaria.

| Campo | Tipo lógico | Reglas |
|---|---|---|
| `id` | Entero | Identificador único asignado al crear la tarea. |
| `title` | Texto | Obligatorio; debe contener al menos un carácter distinto de espacio después de recortarlo. |
| `column` | Código de columna | Obligatorio; uno de `assigned_recently`, `in_progress` o `completed`. |

La interfaz presenta los códigos así:

| Código | Nombre visible | Orden |
|---|---|---:|
| `assigned_recently` | Asignadas recientemente | 1 |
| `in_progress` | En proceso | 2 |
| `completed` | Terminado | 3 |

## Relaciones e invariantes

- Cada tarea pertenece exactamente a una columna.
- Cada columna contiene cero o más tareas.
- Las tres columnas son fijas y están definidas por la aplicación; no son entidades editables.
- Las columnas y sus conteos se muestran aunque no tengan tareas.
- Una tarea nueva empieza en `assigned_recently`, salvo que el usuario la agregue desde otra
  columna; en ese caso empieza en la columna desde la que se agregó.
- El orden dentro de cada columna es estable por `id` ascendente. Reordenar tareas dentro de una
  columna no forma parte de la funcionalidad especificada.
- Título y columna se conservan después de cerrar o recargar la aplicación.

## Persistencia

Una tabla SQLite `tasks` contiene `id`, `title` y `column`. Se valida el título vacío antes de
insertar y se limita el valor de columna al conjunto fijo. El archivo de datos es local, se crea
al iniciar la API si aún no existe y no se incluye en Git.

No se modelan fechas, etiquetas, personas responsables, comentarios, reacciones, adjuntos,
columnas personalizadas ni historial.
