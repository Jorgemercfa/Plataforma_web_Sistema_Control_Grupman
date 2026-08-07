// src/data/provisionalLocalesData.js
// "clienteId" debe coincidir con el id de cada cliente en provisionalCustomerData.js

export const localesProvisionales = [
  { id: 1, clienteId: 1, nombre: 'Sede Principal',    direccion: 'Av. Industrial 123, Lima',        estaciones: 4, proximaVisita: '25 Ago 2026' },
  { id: 2, clienteId: 1, nombre: 'Almacén Norte',     direccion: 'Jr. Los Pinos 456, Callao',        estaciones: 2, proximaVisita: '30 Ago 2026' },
  { id: 3, clienteId: 2, nombre: 'Local Central',     direccion: 'Calle Comercio 789, Miraflores',   estaciones: 3, proximaVisita: '22 Ago 2026' },
  { id: 4, clienteId: 2, nombre: 'Sucursal Sur',      direccion: 'Av. República 321, San Borja',     estaciones: 2, proximaVisita: 'Sin programar' },
  { id: 5, clienteId: 3, nombre: 'Planta Principal',  direccion: 'Av. Argentina 654, Cercado',       estaciones: 5, proximaVisita: '28 Ago 2026' },
  { id: 6, clienteId: 4, nombre: 'Restaurante Centro',direccion: 'Jr. Ucayali 100, Centro Histórico', estaciones: 3, proximaVisita: '20 Ago 2026' },
]
