import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, listTasks, updateTask } from './api/tasks.js';
import TaskBoard from './components/TaskBoard.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draggingId, setDraggingId] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setTasks(await listTasks());
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function addTask(title, column) {
    const created = await createTask({ title: title.trim(), column });
    setTasks((current) => [...current, created]);
  }

  async function editTask(id, title) {
    const updated = await updateTask(id, { title: title.trim() });
    setTasks((current) => current.map((task) => task.id === id ? updated : task));
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task.id !== id));
      setError('');
    } catch (actionError) {
      setError(actionError.message);
    }
  }

  async function moveTask(id, column) {
    const current = tasks.find((task) => task.id === id);
    if (!current || current.column === column) return;
    setTasks((items) => items.map((task) => task.id === id ? { ...task, column } : task));
    try {
      const updated = await updateTask(id, { column });
      setTasks((items) => items.map((task) => task.id === id ? updated : task));
      setError('');
    } catch (actionError) {
      setTasks((items) => items.map((task) => task.id === id ? current : task));
      setError(actionError.message);
    } finally {
      setDraggingId(null);
    }
  }

  function startDragging(event, task) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(task.id));
    setDraggingId(task.id);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">ORGANIZA TU TRABAJO</p>
          <h1>Tcanvapro</h1>
        </div>
        <p className="header-caption">Tablero de tareas</p>
      </header>
      {error && <div className="global-error" role="alert">{error}<button type="button" onClick={() => setError('')} aria-label="Cerrar mensaje">×</button></div>}
      {loading ? <p className="loading-message">Cargando tareas…</p> : <TaskBoard tasks={tasks} onCreate={addTask} onEdit={editTask} onDelete={removeTask} onDropTask={moveTask} draggingId={draggingId} onDragStart={startDragging} onDragEnd={() => setDraggingId(null)} />}
    </div>
  );
}
