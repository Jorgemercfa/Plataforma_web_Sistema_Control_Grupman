// src/data/provisionalStationsData.js
// "servicioId" debe coincidir con el id del servicio de tipo 'Desratización'
// del local correspondiente, en provisionalServiciosData.js.
// Las estaciones (cebaderos, trampas pegantes, jaulas, etc.) SOLO existen
// para servicios de Desratización.

export const estacionesProvisionales = [
  // Local 1 → servicio Desratización id 3
  { id: 1, servicioId: 3, codigo: 'EST-01', tipo: 'Cebadero roedores', ubicacion: 'Patio trasero', ultimoHallazgo: 'Sin actividad', estado: 'Activa' },
  { id: 2, servicioId: 3, codigo: 'EST-02', tipo: 'Trampa de luz', ubicacion: 'Cocina', ultimoHallazgo: '3 insectos capturados', estado: 'Revisar' },
  { id: 3, servicioId: 3, codigo: 'EST-03', tipo: 'Cebadero roedores', ubicacion: 'Almacén', ultimoHallazgo: 'Cebo consumido', estado: 'Revisar' },
  { id: 4, servicioId: 3, codigo: 'EST-04', tipo: 'Trampa pegante', ubicacion: 'Comedor', ultimoHallazgo: 'Sin actividad', estado: 'Activa' },

  // Local 2 → servicio Desratización id 8
  { id: 5, servicioId: 8, codigo: 'EST-05', tipo: 'Trampa pegante', ubicacion: 'Entrada comedor', ultimoHallazgo: 'Sin actividad', estado: 'Activa' },
  { id: 6, servicioId: 8, codigo: 'EST-06', tipo: 'Trampa de luz', ubicacion: 'Cocina', ultimoHallazgo: 'Sin actividad', estado: 'Activa' },

  // Local 3 → servicio Desratización id 13
  { id: 7, servicioId: 13, codigo: 'EST-07', tipo: 'Cebadero roedores', ubicacion: 'Pasillo A', ultimoHallazgo: 'Cebo consumido', estado: 'Revisar' },
  { id: 8, servicioId: 13, codigo: 'EST-08', tipo: 'Cebadero roedores', ubicacion: 'Pasillo B', ultimoHallazgo: 'Sin actividad', estado: 'Activa' },
  { id: 9, servicioId: 13, codigo: 'EST-09', tipo: 'Trampa de luz', ubicacion: 'Recepción', ultimoHallazgo: 'Sin actividad', estado: 'Activa' },

  // Local 4 → servicio Desratización id 18
  { id: 10, servicioId: 18, codigo: 'EST-10', tipo: 'Trampa pegante', ubicacion: 'Cocina', ultimoHallazgo: 'Sin actividad', estado: 'Activa' },
  { id: 11, servicioId: 18, codigo: 'EST-11', tipo: 'Cebadero roedores', ubicacion: 'Almacén de insumos', ultimoHallazgo: 'Sin actividad', estado: 'Inactiva' },
]