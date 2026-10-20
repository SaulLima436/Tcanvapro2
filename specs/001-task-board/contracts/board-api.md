# Contrato interno de la API del tablero

La interfaz React consume esta API JSON local. No es una API pública ni requiere autenticación
en la versión inicial. El servidor valida cada operación antes de acceder a SQLite.

## Modelo JSON

```json
{
  "id": 1,
  "title": "Preparar propuesta",
  "column": "assigned_recently"
}
```

Los códigos admitidos para `column` son `assigned_recently`, `in_progress` y `completed`, que
se presentan como «Asignadas recientemente», «En proceso» y «Terminado».

## Operaciones

| Método y ruta | Solicitud | Respuesta correcta | Errores esperados |
|---|---|---|---|
| `GET /api/tasks` | Ninguna | `200`: lista de tareas, ordenada por `id` ascendente. | `500`: error de almacenamiento. |
| `POST /api/tasks` | `{ "title": "...", "column": "assigned_recently" }` | `201`: tarea creada con su `id`. | `400`: título vacío o columna desconocida; `500`: error de almacenamiento. |
| `PATCH /api/tasks/:id` | Uno o ambos campos: `title`, `column`. | `200`: tarea actualizada. | `400`: valor inválido; `404`: tarea inexistente; `500`: error de almacenamiento. |
| `DELETE /api/tasks/:id` | Ninguna | `204`: tarea eliminada. | `404`: tarea inexistente; `500`: error de almacenamiento. |

## Reglas

- Los cuerpos de `POST` y `PATCH` usan `Content-Type: application/json`.
- El servidor recorta el título y rechaza el resultado si queda vacío.
- `PATCH` admite solo `title` y `column`; se rechazan códigos de columna desconocidos.
- Los errores devuelven JSON `{ "error": "Mensaje en español" }` salvo `204`, que no lleva
  cuerpo.
- El cliente actualiza la vista con la respuesta guardada. Si el movimiento falla, conserva o
  restaura la columna original y muestra un error comprensible.
- En desarrollo, el cliente llama `/api` en el mismo origen de Vite; Vite lo reenvía al servidor
  local.
