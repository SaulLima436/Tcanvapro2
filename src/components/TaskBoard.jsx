import { COLUMNS } from '../../shared/columns.js';
import TaskColumn from './TaskColumn.jsx';

export default function TaskBoard(props) {
  return (
    <main className="board" aria-label="Tablero de tareas">
      {COLUMNS.map((column) => (
        <TaskColumn key={column.code} column={column} tasks={props.tasks.filter((task) => task.column === column.code)} {...props} />
      ))}
    </main>
  );
}
