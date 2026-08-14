// src/data/provisionalServiciosData.js
// Cada local tiene (hasta) 5 servicios: uno por cada tipo definido en TIPOS_SERVICIO.
// Solo el servicio de tipo 'Desratización' usa estaciones (ver provisionalStationsData.js).
// Los demás servicios se registran mediante bitácora de visitas (ver provisionalVisitasData.js).

export const TIPOS_SERVICIO = [
  'Desinsectación',
  'Desinfección',
  'Desratización',
  'Limpieza de cisternas',
  'Diagnóstico y monitoreo',
]

// Icono (tabler icons) sugerido para cada tipo de servicio
export const iconoServicio = (tipo) => ({
  'Desinsectación': 'ti-bug',
  'Desinfección': 'ti-spray',
  'Desratización': 'ti-paw',
  'Limpieza de cisternas': 'ti-droplet',
  'Diagnóstico y monitoreo': 'ti-clipboard-check',
}[tipo] || 'ti-shield-check')

export const serviciosProvisionales = [
  // ── Local 1 ──────────────────────────────────────
  { id: 1, localId: 1, tipo: 'Desinsectación', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Jorge Salas', ultimaVisita: '02/07/2026', proximaVisita: '02/08/2026' },
  { id: 2, localId: 1, tipo: 'Desinfección', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Jorge Salas', ultimaVisita: '02/07/2026', proximaVisita: '02/08/2026' },
  { id: 3, localId: 1, tipo: 'Desratización', estado: 'Activo', frecuencia: 'Quincenal', responsable: 'Ana Cárdenas', ultimaVisita: '28/07/2026', proximaVisita: '11/08/2026' },
  { id: 4, localId: 1, tipo: 'Limpieza de cisternas', estado: 'Pendiente', frecuencia: 'Semestral', responsable: 'Por asignar', ultimaVisita: 'Sin registros', proximaVisita: '15/09/2026' },
  { id: 5, localId: 1, tipo: 'Diagnóstico y monitoreo', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Jorge Salas', ultimaVisita: '02/07/2026', proximaVisita: '02/08/2026' },

  // ── Local 2 ──────────────────────────────────────
  { id: 6, localId: 2, tipo: 'Desinsectación', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Luis Prado', ultimaVisita: '10/07/2026', proximaVisita: '10/08/2026' },
  { id: 7, localId: 2, tipo: 'Desratización', estado: 'Activo', frecuencia: 'Quincenal', responsable: 'Luis Prado', ultimaVisita: '05/07/2026', proximaVisita: '19/07/2026' },
]
