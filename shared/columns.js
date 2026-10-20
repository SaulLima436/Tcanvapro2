export const COLUMNS = [
  { code: 'assigned_recently', label: 'Asignadas recientemente' },
  { code: 'in_progress', label: 'En proceso' },
  { code: 'completed', label: 'Terminado' },
];

export const COLUMN_CODES = new Set(COLUMNS.map(({ code }) => code));
