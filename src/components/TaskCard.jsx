import { useState } from 'react';

export default function TaskCard({ task, onEdit, onDelete, onDragStart, onDragEnd }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState('');

  async function save(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }
    try {
      await onEdit(task.id, title);
      setEditing(false);
      setError('');
    } catch (saveError) {
      setError(saveError.message);
    }
  }

  function cancel() {
    setEditing(false);
    setTitle(task.title);
    setError('');
  }

  return (
    <article
      className="task-card"
      draggable={!editing}
      onDragStart={(event) => onDragStart(event, task)}
      onDragEnd={onDragEnd}
      aria-label={`Tarea: ${task.title}`}
    >
      {editing ? (
        <form className="edit-form" onSubmit={save}>
          <label className="sr-only" htmlFor={`edit-${task.id}`}>Título de la tarea</label>
          <textarea id={`edit-${task.id}`} value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="button-primary">Guardar</button>
            <button type="button" className="button-quiet" onClick={cancel}>Cancelar</button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-content">
            <span className="task-check" aria-hidden="true">✓</span>
            <p>{task.title}</p>
          </div>
          <div className="task-actions">
            <button type="button" className="button-quiet" onClick={() => setEditing(true)} aria-label={`Editar ${task.title}`}>Editar</button>
            <button type="button" className="button-quiet button-delete" onClick={() => onDelete(task.id)} aria-label={`Eliminar ${task.title}`}>Eliminar</button>
          </div>
        </>
      )}
    </article>
  );
}
