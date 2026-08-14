<script setup>
import { ref, computed } from 'vue'
import layoutNavbarClient from '../../components/clientComponents/layoutNavbarClient.vue'

// Estado para el filtro de historial
const filtroTipo = ref('Todos')
const busqueda = ref('')

// Servicio en progreso / programado (Seguimiento activo)
const servicioActivo = ref({
  id: 'SRV-2026-089',
  servicio: 'Desinsectación y Control de Roedores',
  sede: 'Sede Principal - Av. Central 123',
  fecha: '12 de Agosto, 2026',
  hora: '10:00 AM',
  tecnico: 'Carlos Mendoza',
  estadoPaso: 2, // 1: Programado, 2: Técnico en camino, 3: En ejecución, 4: Finalizado
  pasos: [
    { titulo: 'Programado', fecha: '10 Ago' },
    { titulo: 'En camino', fecha: 'Hoy, 09:30 AM' },
    { titulo: 'En ejecución', fecha: 'Pendiente' },
    { titulo: 'Finalizado', fecha: 'Pendiente' }
  ]
})

// Historial de servicios
const historialServicios = ref([
  {
    id: 'SRV-2026-042',
    fecha: '15/06/2026',
    tipo: 'Desinsectación',
    sede: 'Sede Principal',
    tecnico: 'Juan Pérez',
    certificado: 'CERT-9921.pdf',
    estado: 'Completado'
  },
  {
    id: 'SRV-2026-018',
    fecha: '10/04/2026',
    tipo: 'Desinfección de Ambientes',
    sede: 'Almacén Central',
    tecnico: 'Carlos Mendoza',
    certificado: 'CERT-8834.pdf',
    estado: 'Completado'
  },
  {
    id: 'SRV-2025-112',
    fecha: '20/12/2025',
    tipo: 'Desratización',
    sede: 'Sede Principal',
    tecnico: 'Luis Gomez',
    certificado: 'CERT-7102.pdf',
    estado: 'Completado'
  }
])

const serviciosFiltrados = computed(() => {
  return historialServicios.value.filter((s) => {
    const coincideTipo = filtroTipo.value === 'Todos' || s.tipo === filtroTipo.value
    const coincideBusqueda = s.id.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                             s.sede.toLowerCase().includes(busqueda.value.toLowerCase())
    return coincideTipo && coincideBusqueda
  })
})
</script>

<template>
  <layoutNavbarClient>
    <div class="client-container">

      <!-- Encabezado de la Vista -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Mis Servicios</h1>
          <p class="page-sub">Consulta el estado de tu servicio actual y revisa el historial de inspecciones.</p>
        </div>
      </div>

      <!-- SECCIÓN 1: SEGUIMIENTO EN TIEMPO REAL -->
      <div class="card tracking-card" v-if="servicioActivo">
        <div class="card-header border-b">
          <div class="card-title">
            <i class="ti ti-radar pulse-icon"></i>
            Servicio en Curso / Próximo
          </div>
          <span class="badge badge--green">En Progreso</span>
        </div>

        <div class="tracking-body">
          <div class="service-meta">
            <div>
              <h3>{{ servicioActivo.servicio }}</h3>
              <p><i class="ti ti-map-pin"></i> {{ servicioActivo.sede }}</p>
            </div>
            <div class="tech-info">
              <span class="tech-label">Técnico Asignado:</span>
              <span class="tech-name"><i class="ti ti-user-check"></i> {{ servicioActivo.tecnico }}</span>
            </div>
          </div>

          <!-- Linea de Tiempo del Servicio -->
          <div class="timeline">
            <div 
              v-for="(paso, index) in servicioActivo.pasos" 
              :key="index"
              class="timeline-step"
              :class="{ 
                'completed': index + 1 < servicioActivo.estadoPaso, 
                'active': index + 1 === servicioActivo.estadoPaso 
              }"
            >
              <div class="step-circle">
                <i v-if="index + 1 < servicioActivo.estadoPaso" class="ti ti-check"></i>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div class="step-label">{{ paso.titulo }}</div>
              <div class="step-time">{{ paso.fecha }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: HISTORIAL Y DESCARGA DE CERTIFICADOS -->
      <div class="card">
        <div class="card-header flex-wrap gap-3">
          <div class="card-title">
            <i class="ti ti-history"></i>
            Historial de Servicios Realizados
          </div>

          <!-- Filtros de búsqueda -->
          <div class="filters">
            <input 
              type="text" 
              v-model="busqueda" 
              placeholder="Buscar por código o sede..." 
              class="search-input"
            />
            <select v-model="filtroTipo" class="select-filter">
              <option value="Todos">Todos los tipos</option>
              <option value="Desinsectación">Desinsectación</option>
              <option value="Desinfección de Ambientes">Desinfección</option>
              <option value="Desratización">Desratización</option>
            </select>
          </div>
        </div>

        <!-- Tabla de Historial -->
        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Fecha</th>
                <th>Servicio</th>
                <th>Sede</th>
                <th>Técnico</th>
                <th>Certificado / Reporte</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in serviciosFiltrados" :key="item.id">
                <td class="cell-main">{{ item.id }}</td>
                <td class="cell-sub">{{ item.fecha }}</td>
                <td><span class="service-tag">{{ item.tipo }}</span></td>
                <td>{{ item.sede }}</td>
                <td class="cell-sub">{{ item.tecnico }}</td>
                <td>
                  <button class="btn-download" @click="alert('Descargando ' + item.certificado)">
                    <i class="ti ti-file-download"></i> PDF
                  </button>
                </td>
              </tr>
              <tr v-if="!serviciosFiltrados.length">
                <td colspan="6" class="cell-vacio">No se encontraron registros de servicios.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </layoutNavbarClient>
</template>

<style scoped>
.client-container {
  --green: #42ae1a;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #111827;
  padding: 32px;
  max-width: 1100px;
  margin: 0 auto;
}

/* Header */
.page-header { margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 14px; color: #6b7280; margin: 0; }

/* Cards generales */
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  background: #fafafa;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.card-title i { color: var(--green); font-size: 18px; }

/* Seguimiento Activo */
.tracking-card { border: 1.5px solid #dcfce7; }
.pulse-icon { color: var(--green); animation: pulse 2s infinite; }

.tracking-body { padding: 24px; }
.service-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.service-meta h3 { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
.service-meta p { margin: 0; font-size: 13.5px; color: #6b7280; display: flex; align-items: center; gap: 4px; }

.tech-info {
  background: #f9fafb;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
}
.tech-label { font-size: 11px; color: #6b7280; text-transform: uppercase; font-weight: 600; }
.tech-name { font-size: 13.5px; font-weight: 600; color: #111827; display: flex; align-items: center; gap: 4px; }

/* Timeline Stepper */
.timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 40px;
  right: 40px;
  height: 3px;
  background: #e5e7eb;
  z-index: 1;
}

.timeline-step {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;
}

.step-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  transition: all 0.3s ease;
}

.timeline-step.completed .step-circle {
  background: var(--green);
  border-color: var(--green);
  color: #fff;
}

.timeline-step.active .step-circle {
  border-color: var(--green);
  color: var(--green);
  box-shadow: 0 0 0 4px rgba(66, 174, 26, 0.15);
}

.step-label { font-size: 13px; font-weight: 600; margin-top: 8px; color: #374151; }
.step-time { font-size: 11.5px; color: #9ca3af; margin-top: 2px; }

/* Filtros */
.filters { display: flex; gap: 10px; }
.search-input, .select-filter {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  outline: none;
}
.search-input:focus, .select-filter:focus { border-color: var(--green); }

/* Tabla */
.table-wrap { overflow-x: auto; }
.tabla { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.tabla thead th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11.5px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
.tabla tbody tr { border-bottom: 1px solid #f3f4f6; }
.tabla tbody tr:hover { background: #f9fafb; }
.tabla td { padding: 14px 16px; color: #374151; vertical-align: middle; }

.cell-main { font-weight: 600; color: #111827; }
.cell-sub { font-size: 12.5px; color: #6b7280; }
.cell-vacio { text-align: center; color: #9ca3af; padding: 32px 0; }

.service-tag {
  background: #f0fdf4;
  color: #166534;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #bbf7d0;
}

/* Botón Descarga */
.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-download:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

/* Badges */
.badge { padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }
.badge--green { background: #e8f5e9; color: #2e7d32; }

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
