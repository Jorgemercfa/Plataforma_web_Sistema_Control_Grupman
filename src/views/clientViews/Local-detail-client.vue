<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue'
import { clientesProvisionales } from '../../data/provisionalCustomerData.js'
import { localesProvisionales } from '../../data/provisionalLocalesData.js'
import { estacionesProvisionales } from '../../data/provisionalStationsData.js'

const route = useRoute()

/* ── Local buscado por ID ──────────────────────────── */
const local = computed(() =>
  localesProvisionales.find((l) => String(l.id) === String(route.params.localId))
)

/* ── Cliente dueño del local ───────────────────────── */
const cliente = computed(() =>
  clientesProvisionales.find((c) => String(c.id) === String(route.params.clientId))
)

/* ── Estaciones del local ──────────────────────────── */
const estaciones = computed(() =>
  estacionesProvisionales.filter((e) => String(e.localId) === String(route.params.localId))
)

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
  <layoutNavbarAdmin>
    <div class="dashboard" v-if="local">

      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/Client-detail">Clientes</router-link>
        <span>/</span>
        <router-link :to="`/admin/clientes/${route.params.clientId}`">
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

    <!-- Fallback: Local no encontrado -->
    <div class="dashboard" v-else>
      <div class="card not-found">
        <i class="ti ti-alert-circle icon-not-found"></i>
        <p>No se encontró ningún local con ese identificador.</p>
        <router-link to="/Client-detail" class="btn-link">← Volver a Clientes</router-link>
      </div>
    </div>
  </layoutNavbarAdmin>
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
.badge--read-only { background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe; }

/* Not Found */
.not-found { padding: 48px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; color: #6b7280; }
.icon-not-found { font-size: 36px; color: #ef4444; }
.btn-link { color: #42ae1a; font-weight: 600; font-size: 13px; text-decoration: none; }
.btn-link:hover { text-decoration: underline; }
</style>