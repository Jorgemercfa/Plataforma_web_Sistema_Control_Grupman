// src/data/staffService.js

// Mock de datos — reemplaza esto por llamadas reales a tu API cuando esté lista
let staffList = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    puesto: 'Gerente',
    area: 'Recursos Humanos',
    telefono: '+1 234 567 890',
    correo: 'juan.perez@grupman.com',
    password: '********',
  },
];

export function getStaff() {
  return Promise.resolve([...staffList]);
}

export function createStaff(staff) {
  const newStaff = {
    id: Date.now(),
    ...staff,
  };
  staffList.unshift(newStaff);
  return Promise.resolve(newStaff);
}

export function updateStaff(id, updatedData) {
  staffList = staffList.map((s) =>
    s.id === id ? { ...s, ...updatedData } : s
  );
  return Promise.resolve(staffList.find((s) => s.id === id));
}

export function deleteStaff(id) {
  staffList = staffList.filter((s) => s.id !== id);
  return Promise.resolve();
}