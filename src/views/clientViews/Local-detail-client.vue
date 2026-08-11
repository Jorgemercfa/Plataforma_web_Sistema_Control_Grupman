<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import layoutNavbarClient from '../../components/clientComponents/layoutNavbarClient.vue'
import { clientesProvisionales } from '../../data/provisionalCustomerData.js'
import { localesProvisionales } from '../../data/provisionalLocalesData.js'
import { estacionesProvisionales } from '../../data/provisionalStationsData.js'

const route = useRoute()

/* ── Fallback mock por si no hay parámetros en la URL ── */
const localMock = {
  id: 1,
  nombre: 'Sede Miraflores - Av. Larco',
  direccion: 'Av. José Larco 456, Miraflores, Lima',
  contacto: 'Carlos Mendoza',
  telefono: '+51 987 654 321',
  tipo: 'Sede Comercial',
  ultimaInspeccion: '10 Ago, 2026'
}

const clienteMock = {
  id: 1,
  razonSocial: 'Corporación Gastronómica S.A.C.'
}

const estacionesMock = [
  { id: 10, localId: 1, codigo: 'EST-MIRA-01', tipo: 'Cebadero Roedores', ubicacion: 'Almacén Principal - Área A', ultimoHallazgo: 'Sin Actividad', estado: 'Activa' },
  { id: 11, localId: 1, codigo: 'EST-MIRA-02', tipo: 'Cebadero Roedores', ubicacion: 'Zona de Carga y Descarga', ultimoHallazgo: 'Consumo Parcial (10%)', estado: 'Revisar' },
  { id: 12, localId: 1, codigo: 'EST-MIRA-03', tipo: 'Lámpara UV Insectos', ubicacion: 'Cocina Principal', ultimoHallazgo: 'Captura Normal (Lepidópteros)', estado: 'Activa' },
  { id: 13, localId: 1, codigo: 'EST-MIRA-04', tipo: 'Trampa de Pegamento', ubicacion: 'Pasadizo Técnico Directivo', ultimoHallazgo: 'Limpio', estado: 'Activa' }
]

/* ── Local (Búsqueda o Fallback) ───────────────────── */
const local = computed(() => {
  const found = localesProvisionales.find((l) => String(l.id) === String(route.params.localId))
  return found || localMock // Devuelve el mock si no encuentra en provisionales
})

/* ── Cliente (Búsqueda o Fallback) ─────────────────── */
const cliente = computed(() => {
  const found = clientesProvisionales.find((c) => String(c.id) === String(route.params.clientId))
  return found || clienteMock
})

/* ── Estaciones (Búsqueda o Fallback) ──────────────── */
const estaciones = computed(() => {
  const filtered = estacionesProvisionales.filter((e) => String(e.localId) === String(route.params.localId))
  return filtered.length ? filtered : estacionesMock
})

/* ── Próximas Visitas Programadas ───────────────────── */
const proximasVisitas = ref([
  { id: 101, localId: 1, local: 'Sede Miraflores - Av. Larco', fecha: '18 Ago, 2026', hora: '09:30 AM', tipo: 'Desinsectación Integral', tecnico: 'Luis Torres', estado: 'programada' },
  { id: 102, localId: 1, local: 'Sede Miraflores - Av. Larco', fecha: '02 Sep, 2026', hora: '11:00 AM', tipo: 'Control de Roedores', tecnico: 'Ana Quispe', estado: 'programada' },
  { id: 103, localId: 2, local: 'Almacén Central', fecha: '28 Ago, 2026', hora: '03:00 PM', tipo: 'Desinfección Ambiental', tecnico: 'Por asignar', estado: 'programada' },
])

const visitasDelLocal = computed(() => {
  if (!local.value) return []
  return proximasVisitas.value.filter(v => String(v.localId) === String(local.value.id) || v.local === local.value.nombre)
})

/* ── Métricas calculadas para lectura rápida ──────── */
const totalEstaciones = computed(() => estaciones.value.length)
const estacionesActivas = computed(() => estaciones.value.filter(e => e.estado === 'Activa').length)
const estacionesRevisar = computed(() => estaciones.value.filter(e => e.estado === 'Revisar').length)

const estadoClass = (estado) => ({
  Activa: 'badge--green',
  Revisar: 'badge--amber',
  Inactiva: 'badge--gray',
}[estado] || 'badge--gray')
</script>

<template>
  <layoutNavbarClient>
    <div class="dashboard" v-if="local">

      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/Client-detail">Clientes</router-link>
        <span>/</span>
        <router-link :to="`/Client/clientes/${route.params.clientId || cliente.id}`">
          {{ cliente ? cliente.razonSocial : 'Cliente' }}
        </router-link>
        <span>/</span>
        <span>{{ local.nombre }}</span>
      </div>

      <!-- Header del Local -->
      <div class="page-header">
        <div>
          <div class="header-tag">
            <span class="badge badge--read-only">
              <i class="ti ti-eye"></i> Modo Lectura
            </span>
          </div>
          <h1 class="page-title">{{ local.nombre }}</h1>
          <p class="page-sub"><i class="ti ti-map-pin"></i> {{ local.direccion }}</p>
        </div>
      </div>

      <!-- Tarjetas de Resumen (Métricas) -->
      <div class="metrics-grid">
        <div class="metric-card">
          <span class="metric-label">Total Estaciones</span>
          <span class="metric-value">{{ totalEstaciones }}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Estaciones Activas</span>
          <span class="metric-value text-green">{{ estacionesActivas }}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Por Revisar</span>
          <span class="metric-value text-amber">{{ estacionesRevisar }}</span>
        </div>
        <div class="metric-card">
          <span class="metric-label">Visitas Programadas</span>
          <span class="metric-value text-blue">{{ visitasDelLocal.length }}</span>
        </div>
      </div>

      <!-- Información General del Local -->
      <div class="card card-info">
        <div class="card-header">
          <div class="card-title">
            <i class="ti ti-building" aria-hidden="true"></i>
            Información General de la Sede
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Contacto Responsable:</span>
            <span class="info-value">{{ local.contacto || 'No asignado' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Teléfono / Celular:</span>
            <span class="info-value">{{ local.telefono || 'Sin registro' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Tipo de Local:</span>
            <span class="info-value">{{ local.tipo || 'Sede Comercial' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Última Inspección:</span>
            <span class="info-value">{{ local.ultimaInspeccion || 'Reciente' }}</span>
          </div>
        </div>
      </div>

      <!-- Próximas Visitas / Agenda -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <i class="ti ti-calendar-event" aria-hidden="true"></i>
            Próximas Visitas Programadas ({{ visitasDelLocal.length }})
          </div>
        </div>

        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Servicio / Tratamiento</th>
                <th>Técnico Asignado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="v in visitasDelLocal" :key="v.id">
                <td class="cell-main">
                  <div>{{ v.fecha }}</div>
                  <small class="text-sub">{{ v.hora }}</small>
                </td>
                <td><span class="badge badge--blue">{{ v.tipo }}</span></td>
                <td class="cell-sub">{{ v.tecnico }}</td>
                <td>
                  <span class="badge badge--green">Programada</span>
                </td>
              </tr>
              <tr v-if="!visitasDelLocal.length">
                <td colspan="4" class="cell-vacio">No hay visitas o tratamientos programados próximamente para esta sede.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tabla de Estaciones de Control -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <i class="ti ti-pin" aria-hidden="true"></i>
            Estaciones Instaladas ({{ totalEstaciones }})
          </div>
        </div>

        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo de Estación</th>
                <th>Ubicación</th>
                <th>Último Hallazgo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in estaciones" :key="e.id">
                <td class="cell-main">{{ e.codigo }}</td>
                <td>{{ e.tipo }}</td>
                <td class="cell-sub">{{ e.ubicacion }}</td>
                <td class="cell-sub">{{ e.ultimoHallazgo }}</td>
                <td>
                  <span :class="['badge', estadoClass(e.estado)]">{{ e.estado }}</span>
                </td>
              </tr>
              <tr v-if="!estaciones.length">
                <td colspan="5" class="cell-vacio">Este local no cuenta con estaciones de control registradas.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </layoutNavbarClient>
</template>

<style scoped>
.dashboard {
  --green: #42ae1a;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #111827;
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Breadcrumb */
.breadcrumb { 
  display: flex; 
  align-items: center; 
  gap: 6px; 
  font-size: 13px; 
  color: #9ca3af; 
  margin-bottom: 16px; 
  flex-wrap: wrap; 
}
.breadcrumb a { color: #42ae1a; text-decoration: none; font-weight: 600; }
.breadcrumb a:hover { text-decoration: underline; }

/* Header */
.page-header { margin-bottom: 24px; }
.header-tag { margin-bottom: 6px; }
.page-title { font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 6px; }
.page-sub { font-size: 14px; color: #6b7280; margin: 0; display: flex; align-items: center; gap: 4px; }

/* Métricas del local */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.metric-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-label { font-size: 12.5px; font-weight: 600; color: #6b7280; text-transform: uppercase; }
.metric-value { font-size: 24px; font-weight: 700; color: #111827; }
.text-green { color: #2e7d32; }
.text-amber { color: #d97706; }
.text-blue { color: #2563eb; }
.text-sub { font-size: 12px; color: #6b7280; }

/* Tarjetas */
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }

.card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6;
  background: #fafafa;
}
.card-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #111827; }
.card-title i { color: #42ae1a; font-size: 16px; }

/* Información general */
.card-info { padding-bottom: 16px; }
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 20px;
}
.info-item { display: flex; flex-direction: column; gap: 2px; }
.info-label { font-size: 12px; font-weight: 600; color: #6b7280; }
.info-value { font-size: 14px; font-weight: 500; color: #111827; }

/* Tabla */
.table-wrap { overflow-x: auto; }
.tabla { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.tabla thead th {
  padding: 12px 16px; text-align: left; font-size: 11.5px; font-weight: 600; color: #6b7280;
  text-transform: uppercase; letter-spacing: .04em; background: #f9fafb; border-bottom: 1px solid #e5e7eb;
}
.tabla tbody tr { border-bottom: 1px solid #f3f4f6; }
.tabla tbody tr:last-child { border-bottom: none; }
.tabla tbody tr:hover { background: #f9fafb; }
.tabla td { padding: 14px 16px; color: #374151; vertical-align: middle; }

.cell-main { font-weight: 600; color: #111827; }
.cell-sub { font-size: 13px; color: #4b5563; }
.cell-vacio { text-align: center; color: #9ca3af; padding: 32px 0; }

/* Badges */
.badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--amber { background:#fff8e1; color:#92400e; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }
.badge--blue  { background:#eff6ff; color:#1d4ed8; }
.badge--read-only { background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe; }
</style>