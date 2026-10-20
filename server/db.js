import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import Database from 'better-sqlite3';
import { COLUMN_CODES } from '../shared/columns.js';

const databasePath = resolve('data/tcanvapro.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });

export const db = new Database(databasePath);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL CHECK (length(trim(title)) > 0),
    column TEXT NOT NULL CHECK (column IN ('assigned_recently', 'in_progress', 'completed'))
  )
`);

const listTasks = db.prepare('SELECT id, title, column FROM tasks ORDER BY id ASC');
const findTask = db.prepare('SELECT id, title, column FROM tasks WHERE id = ?');
const addTask = db.prepare('INSERT INTO tasks (title, column) VALUES (?, ?)');
const setTask = db.prepare('UPDATE tasks SET title = ?, column = ? WHERE id = ?');
const removeTask = db.prepare('DELETE FROM tasks WHERE id = ?');

export function getTasks() {
  return listTasks.all();
}

export function getTask(id) {
  return findTask.get(id);
}

export function createTask(title, column) {
  const result = addTask.run(title, column);
  return getTask(Number(result.lastInsertRowid));
}

export function updateTask(id, patch) {
  const current = getTask(id);
  if (!current) return undefined;
  const title = patch.title ?? current.title;
  const column = patch.column ?? current.column;
  if (!title.trim()) throw new Error('El título es obligatorio.');
  if (!COLUMN_CODES.has(column)) throw new Error('Selecciona una columna válida.');
  setTask.run(title.trim(), column, id);
  return getTask(id);
}

export function deleteTask(id) {
  return removeTask.run(id).changes > 0;
}
