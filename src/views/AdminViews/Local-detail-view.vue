<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue'
import { clientesProvisionales } from '../../data/provisionalCustomerData.js'
import { localesProvisionales } from '../../data/provisionalLocalesData.js'
import { serviciosProvisionales, iconoServicio } from '../../data/provisionalServiciosData.js'
import { estacionesProvisionales } from '../../data/provisionalStationsData.js'

const route = useRoute()

/* ── Local real, buscado por id ────────────────────── */
const local = computed(() =>
  localesProvisionales.find((l) => String(l.id) === String(route.params.localId))
)

/* ── Cliente dueño del local (para el breadcrumb) ──── */
const cliente = computed(() =>
  clientesProvisionales.find((c) => String(c.id) === String(route.params.clientId))
)

/* ── Los 5 servicios de este local ─────────────────── */
const servicios = computed(() =>
  serviciosProvisionales.filter((s) => String(s.localId) === String(route.params.localId))
)

const estadoClass = (e) => ({
  Activo: 'badge--green',
  Pendiente: 'badge--amber',
  Inactivo: 'badge--gray',
}[e] || 'badge--gray')

/* Solo Desratización usa estaciones: cuenta cuántas tiene para mostrarlo en la tarjeta */
const contarEstaciones = (servicioId) =>
  estacionesProvisionales.filter((e) => String(e.servicioId) === String(servicioId)).length
</script>

<template>
  <layoutNavbarAdmin>
    <div class="dashboard" v-if="local">

      <div class="breadcrumb">
        <router-link to="/Client-detail">Clientes</router-link>
        <span>/</span>
        <router-link :to="`/admin/clientes/${route.params.clientId}`">
          {{ cliente ? cliente.razonSocial : 'Cliente' }}
        </router-link>
        <span>/</span>
        <span>{{ local.nombre }}</span>
      </div>

      <div class="page-header">
        <div>
          <h1 class="page-title">{{ local.nombre }}</h1>
          <p class="page-sub">{{ local.direccion }}</p>
        </div>
      </div>

      <!-- Servicios -->
      <div class="servicios-grid">
        <router-link
          v-for="s in servicios"
          :key="s.id"
          :to="`/admin/clientes/${route.params.clientId}/locales/${route.params.localId}/servicios/${s.id}`"
          class="servicio-card"
        >
          <div class="servicio-card-top">
            <span class="servicio-icono"><i :class="['ti', iconoServicio(s.tipo)]" aria-hidden="true"></i></span>
            <span :class="['badge', estadoClass(s.estado)]">{{ s.estado }}</span>
          </div>
          <h3 class="servicio-nombre">{{ s.tipo }}</h3>
          <p class="servicio-meta">Frecuencia: {{ s.frecuencia }}</p>
          <p class="servicio-meta">Próxima visita: {{ s.proximaVisita }}</p>
          <p v-if="s.tipo === 'Desratización'" class="servicio-meta servicio-meta--destacado">
            {{ contarEstaciones(s.id) }} estación(es) registrada(s)
          </p>
          <span class="servicio-link">Ver detalle →</span>
        </router-link>
      </div>
    </div>

    <!-- Local no encontrado -->
    <div class="dashboard" v-else>
      <div class="card not-found">
        <p>No se encontró ningún local con ese id.</p>
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
}

.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 12px; flex-wrap: wrap; }
.breadcrumb a { color: #42ae1a; text-decoration: none; font-weight: 600; }
.breadcrumb a:hover { text-decoration: underline; }

.page-header { margin-bottom: 20px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: #6b7280; margin: 0; }

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}

.servicio-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
  color: inherit;
  transition: border-color .15s, box-shadow .15s;
}
.servicio-card:hover {
  border-color: #42ae1a;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
}

.servicio-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.servicio-icono {
  width: 36px; height: 36px; border-radius: 10px;
  background: #e8f5e9; color: #2e7d32;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}

.servicio-nombre { font-size: 15px; font-weight: 700; color: #111827; margin: 2px 0 2px; }
.servicio-meta { font-size: 12.5px; color: #6b7280; margin: 0; }
.servicio-meta--destacado { color: #2e7d32; font-weight: 600; margin-top: 4px; }

.servicio-link { margin-top: 10px; font-size: 12.5px; font-weight: 600; color: #42ae1a; }

.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }

.badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--amber { background:#fff8e1; color:#92400e; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }

.not-found { padding: 40px; text-align: center; display: flex; flex-direction: column; gap: 12px; color: #6b7280; }
.btn-link { color: #42ae1a; font-weight: 600; font-size: 13px; text-decoration: none; }
.btn-link:hover { text-decoration: underline; }
</style>