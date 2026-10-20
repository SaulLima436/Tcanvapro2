import { createServer } from 'node:http';
import { COLUMN_CODES } from '../shared/columns.js';
import { createTask, db, deleteTask, getTask, getTasks, updateTask } from './db.js';

const port = 3001;
const host = '127.0.0.1';
const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

function sendJson(response, status, value) {
  response.writeHead(status, jsonHeaders);
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) throw new Error('La solicitud es demasiado grande.');
  }
  try {
    return JSON.parse(body || '{}');
  } catch {
    throw new Error('El contenido enviado no es válido.');
  }
}

function parseId(rawId) {
  if (!/^\d+$/.test(rawId)) return null;
  const id = Number(rawId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${host}:${port}`);
  const taskMatch = url.pathname.match(/^\/api\/tasks\/([^/]+)$/);

  try {
    if (url.pathname === '/api/tasks' && request.method === 'GET') {
      sendJson(response, 200, getTasks());
      return;
    }

    if (url.pathname === '/api/tasks' && request.method === 'POST') {
      const body = await readJson(request);
      const title = typeof body.title === 'string' ? body.title.trim() : '';
      if (!title) {
        sendJson(response, 400, { error: 'El título es obligatorio.' });
        return;
      }
      if (!COLUMN_CODES.has(body.column)) {
        sendJson(response, 400, { error: 'Selecciona una columna válida.' });
        return;
      }
      sendJson(response, 201, createTask(title, body.column));
      return;
    }

    if (taskMatch) {
      const id = parseId(taskMatch[1]);
      if (id === null) {
        sendJson(response, 400, { error: 'El identificador de la tarea no es válido.' });
        return;
      }

      if (request.method === 'PATCH') {
        const body = await readJson(request);
        const keys = Object.keys(body);
        if (!keys.length || keys.some((key) => !['title', 'column'].includes(key))) {
          sendJson(response, 400, { error: 'Los cambios enviados no son válidos.' });
          return;
        }
        if ('title' in body && (typeof body.title !== 'string' || !body.title.trim())) {
          sendJson(response, 400, { error: 'El título es obligatorio.' });
          return;
        }
        if ('column' in body && !COLUMN_CODES.has(body.column)) {
          sendJson(response, 400, { error: 'Selecciona una columna válida.' });
          return;
        }
        const updated = updateTask(id, body);
        if (!updated) {
          sendJson(response, 404, { error: 'No se encontró la tarea.' });
          return;
        }
        sendJson(response, 200, updated);
        return;
      }

      if (request.method === 'DELETE') {
        if (!deleteTask(id)) {
          sendJson(response, 404, { error: 'No se encontró la tarea.' });
          return;
        }
        response.writeHead(204);
        response.end();
        return;
      }

      if (request.method === 'GET') {
        const task = getTask(id);
        if (!task) {
          sendJson(response, 404, { error: 'No se encontró la tarea.' });
          return;
        }
        sendJson(response, 200, task);
        return;
      }
    }

    sendJson(response, 404, { error: 'No se encontró la operación solicitada.' });
  } catch (error) {
    const status = error instanceof Error && error.message.includes('solicitud') ? 400 : 500;
    sendJson(response, status, {
      error: status === 400 ? error.message : 'No se pudo guardar el cambio. Inténtalo nuevamente.',
    });
  }
});

server.listen(port, host, () => {
  console.log(`API local disponible en http://${host}:${port}`);
});

function close() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on('SIGINT', close);
process.on('SIGTERM', close);
