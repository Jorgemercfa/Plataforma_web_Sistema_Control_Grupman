// src/data/provisionalVisitasData.js
// "servicioId" referencia a un servicio de provisionalServiciosData.js
// cuyo tipo sea distinto de 'Desratización' (Desinsectación, Desinfección,
// Limpieza de cisternas, Diagnóstico y monitoreo).

export const visitasProvisionales = [
  // Local 1 · Desinsectación (servicio 1)
  { id: 1, servicioId: 1, fecha: '02/07/2026', tecnico: 'Jorge Salas', hallazgos: 'Sin presencia de insectos voladores', observaciones: 'Aplicación preventiva en zonas húmedas' },
  { id: 2, servicioId: 1, fecha: '02/06/2026', tecnico: 'Jorge Salas', hallazgos: 'Actividad leve de cucarachas en cocina', observaciones: 'Aplicación de gel cebo en zócalos' },

  // Local 1 · Desinfección (servicio 2)
  { id: 3, servicioId: 2, fecha: '02/07/2026', tecnico: 'Jorge Salas', hallazgos: 'Superficies desinfectadas correctamente', observaciones: 'Sin incidencias' },

  // Local 1 · Diagnóstico y monitoreo (servicio 5)
  { id: 4, servicioId: 5, fecha: '02/07/2026', tecnico: 'Jorge Salas', hallazgos: 'Condiciones sanitarias generales adecuadas', observaciones: 'Se recomienda sellar rejilla de desagüe' },

  // Local 2 · Desinsectación (servicio 6)
  { id: 5, servicioId: 6, fecha: '10/07/2026', tecnico: 'Luis Prado', hallazgos: 'Sin actividad de insectos', observaciones: 'Servicio sin novedades' },

  // Local 2 · Desinfección (servicio 7) — inactivo, último registro antiguo
  { id: 6, servicioId: 7, fecha: '12/05/2026', tecnico: 'Luis Prado', hallazgos: 'Desinfección de áreas comunes completada', observaciones: 'Cliente pausó el servicio' },

  // Local 2 · Limpieza de cisternas (servicio 9)
  { id: 7, servicioId: 9, fecha: '20/03/2026', tecnico: 'Luis Prado', hallazgos: 'Cisterna sin sedimentos relevantes', observaciones: 'Limpieza y desinfección completa' },

  // Local 2 · Diagnóstico y monitoreo (servicio 10)
  { id: 8, servicioId: 10, fecha: '10/07/2026', tecnico: 'Luis Prado', hallazgos: 'Instalaciones en buen estado', observaciones: 'Sin observaciones adicionales' },

  // Local 3 · Desinsectación (servicio 11)
  { id: 9, servicioId: 11, fecha: '05/07/2026', tecnico: 'Karla Ríos', hallazgos: 'Presencia leve de hormigas en almacén', observaciones: 'Aplicación de cebo en gel' },

  // Local 3 · Desinfección (servicio 12)
  { id: 10, servicioId: 12, fecha: '05/07/2026', tecnico: 'Karla Ríos', hallazgos: 'Superficies desinfectadas', observaciones: 'Sin incidencias' },

  // Local 3 · Diagnóstico y monitoreo (servicio 15)
  { id: 11, servicioId: 15, fecha: '05/07/2026', tecnico: 'Karla Ríos', hallazgos: 'Sin puntos críticos detectados', observaciones: 'Próxima revisión en un mes' },

  // Local 4 · Desinsectación (servicio 16) — inactivo
  { id: 12, servicioId: 16, fecha: '18/04/2026', tecnico: 'Diego Flores', hallazgos: 'Última visita antes de pausa del servicio', observaciones: 'Cliente solicitó pausar temporalmente' },

  // Local 4 · Desinfección (servicio 17)
  { id: 13, servicioId: 17, fecha: '15/07/2026', tecnico: 'Diego Flores', hallazgos: 'Áreas comunes desinfectadas', observaciones: 'Sin novedades' },

  // Local 4 · Limpieza de cisternas (servicio 19)
  { id: 14, servicioId: 19, fecha: '02/02/2026', tecnico: 'Diego Flores', hallazgos: 'Cisterna con sedimento moderado', observaciones: 'Se realizó limpieza profunda' },

  // Local 4 · Diagnóstico y monitoreo (servicio 20)
  { id: 15, servicioId: 20, fecha: '15/07/2026', tecnico: 'Diego Flores', hallazgos: 'Sin puntos críticos', observaciones: 'Todo conforme' },
]