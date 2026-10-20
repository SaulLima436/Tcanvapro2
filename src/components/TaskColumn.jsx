import { useState } from 'react';
import TaskCard from './TaskCard.jsx';

export default function TaskColumn({ column, tasks, onCreate, onEdit, onDelete, onDropTask, draggingId, onDragStart, onDragEnd }) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }
    try {
      await onCreate(title, column.code);
      setTitle('');
      setError('');
      setAdding(false);
    } catch (createError) {
      setError(createError.message);
    }
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();
    const id = Number(event.dataTransfer.getData('text/plain'));
    if (id) onDropTask(id, column.code);
  }

  return (
    <section
      className={`task-column${draggingId ? ' drop-ready' : ''}`}
      onDragOver={allowDrop}
      onDrop={drop}
      aria-label={`${column.label}, ${tasks.length} tareas`}
    >
      <header className="column-header">
        <h2>{column.label}</h2>
        <span className="task-count">{tasks.length}</span>
      </header>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onDragStart={onDragStart} onDragEnd={onDragEnd} />
        ))}
        {adding && (
          <form className="task-card add-form" onSubmit={submit}>
            <label className="sr-only" htmlFor={`new-${column.code}`}>Nombre de la tarea</label>
            <textarea id={`new-${column.code}`} placeholder="Escribe el nombre de la tarea" value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
            {error && <p className="form-error">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="button-primary">Agregar</button>
              <button type="button" className="button-quiet" onClick={() => { setAdding(false); setTitle(''); setError(''); }}>Cancelar</button>
            </div>
          </form>
        )}
      </div>
      {!adding && <button type="button" className="add-task" onClick={() => setAdding(true)}>＋ Agregar tarea</button>}
    </section>
  );
}
