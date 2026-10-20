async function request(path, options) {
  let response;
  try {
    response = await fetch(path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    });
  } catch {
    throw new Error('No se pudo conectar con el tablero. Comprueba que la API esté iniciada.');
  }

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || 'No se pudo completar la acción.');
  }
  return response.status === 204 ? undefined : response.json();
}

export const listTasks = () => request('/api/tasks');
export const createTask = (task) => request('/api/tasks', { method: 'POST', body: JSON.stringify(task) });
export const updateTask = (id, changes) => request(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(changes) });
export const deleteTask = (id) => request(`/api/tasks/${id}`, { method: 'DELETE' });
