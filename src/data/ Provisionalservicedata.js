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
  { id: 7, localId: 2, tipo: 'Desinfección', estado: 'Inactivo', frecuencia: 'Mensual', responsable: 'Luis Prado', ultimaVisita: '12/05/2026', proximaVisita: 'Sin programar' },
  { id: 8, localId: 2, tipo: 'Desratización', estado: 'Activo', frecuencia: 'Quincenal', responsable: 'Ana Cárdenas', ultimaVisita: '30/07/2026', proximaVisita: '13/08/2026' },
  { id: 9, localId: 2, tipo: 'Limpieza de cisternas', estado: 'Activo', frecuencia: 'Semestral', responsable: 'Luis Prado', ultimaVisita: '20/03/2026', proximaVisita: '20/09/2026' },
  { id: 10, localId: 2, tipo: 'Diagnóstico y monitoreo', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Luis Prado', ultimaVisita: '10/07/2026', proximaVisita: '10/08/2026' },

  // ── Local 3 ──────────────────────────────────────
  { id: 11, localId: 3, tipo: 'Desinsectación', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Karla Ríos', ultimaVisita: '05/07/2026', proximaVisita: '05/08/2026' },
  { id: 12, localId: 3, tipo: 'Desinfección', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Karla Ríos', ultimaVisita: '05/07/2026', proximaVisita: '05/08/2026' },
  { id: 13, localId: 3, tipo: 'Desratización', estado: 'Activo', frecuencia: 'Quincenal', responsable: 'Ana Cárdenas', ultimaVisita: '29/07/2026', proximaVisita: '12/08/2026' },
  { id: 14, localId: 3, tipo: 'Limpieza de cisternas', estado: 'Pendiente', frecuencia: 'Semestral', responsable: 'Por asignar', ultimaVisita: 'Sin registros', proximaVisita: '01/10/2026' },
  { id: 15, localId: 3, tipo: 'Diagnóstico y monitoreo', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Karla Ríos', ultimaVisita: '05/07/2026', proximaVisita: '05/08/2026' },

  // ── Local 4 ──────────────────────────────────────
  { id: 16, localId: 4, tipo: 'Desinsectación', estado: 'Inactivo', frecuencia: 'Mensual', responsable: 'Por asignar', ultimaVisita: '18/04/2026', proximaVisita: 'Sin programar' },
  { id: 17, localId: 4, tipo: 'Desinfección', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Diego Flores', ultimaVisita: '15/07/2026', proximaVisita: '15/08/2026' },
  { id: 18, localId: 4, tipo: 'Desratización', estado: 'Activo', frecuencia: 'Quincenal', responsable: 'Ana Cárdenas', ultimaVisita: '31/07/2026', proximaVisita: '14/08/2026' },
  { id: 19, localId: 4, tipo: 'Limpieza de cisternas', estado: 'Activo', frecuencia: 'Semestral', responsable: 'Diego Flores', ultimaVisita: '02/02/2026', proximaVisita: '02/08/2026' },
  { id: 20, localId: 4, tipo: 'Diagnóstico y monitoreo', estado: 'Activo', frecuencia: 'Mensual', responsable: 'Diego Flores', ultimaVisita: '15/07/2026', proximaVisita: '15/08/2026' },
]