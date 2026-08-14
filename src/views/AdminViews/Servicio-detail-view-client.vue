<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue'
import { clientesProvisionales } from '../../data/provisionalCustomerData.js'
import { localesProvisionales } from '../../data/provisionalLocalesData.js'
import { serviciosProvisionales, iconoServicio } from '../../data/provisionalServiciosData.js'
import { estacionesProvisionales } from '../../data/provisionalStationsData.js'
import { visitasProvisionales } from '../../data/provisionalVisitasData.js'

const route = useRoute()

/* ── Servicio, local y cliente reales ──────────────── */
const servicio = computed(() =>
  serviciosProvisionales.find((s) => String(s.id) === String(route.params.servicioId))
)
const local = computed(() =>
  localesProvisionales.find((l) => String(l.id) === String(servicio.value?.localId))
)
const cliente = computed(() =>
  clientesProvisionales.find((c) => String(c.id) === String(route.params.clientId))
)

const esDesratizacion = computed(() => servicio.value?.tipo === 'Desratización')

const estadoClass = (e) => ({
  Activo: 'badge--green', Activa: 'badge--green',
  Pendiente: 'badge--amber', Revisar: 'badge--amber',
  Inactivo: 'badge--gray', Inactiva: 'badge--gray',
}[e] || 'badge--gray')

/* ═══════════════════ DESRATIZACIÓN → Estaciones ═══════════════════ */
const tiposEstacion = ['Cebadero roedores', 'Trampa de luz', 'Trampa pegante', 'Estación de control']
const estadosEstacion = ['Activa', 'Revisar', 'Inactiva']

const estaciones = ref(
  estacionesProvisionales.filter((e) => String(e.servicioId) === String(route.params.servicioId))
)

const modalEstacionAbierto = ref(false)
const formEstacion = ref({ codigo: '', tipo: tiposEstacion[0], ubicacion: '', estado: 'Activa' })

function guardarEstacion() {
  if (!formEstacion.value.codigo || !formEstacion.value.ubicacion) return
  estaciones.value.push({
    id: Date.now(),
    servicioId: route.params.servicioId,
    codigo: formEstacion.value.codigo,
    tipo: formEstacion.value.tipo,
    ubicacion: formEstacion.value.ubicacion,
    ultimoHallazgo: 'Sin registros aún',
    estado: formEstacion.value.estado,
  })
  formEstacion.value = { codigo: '', tipo: tiposEstacion[0], ubicacion: '', estado: 'Activa' }
  modalEstacionAbierto.value = false
}

/* ═══════════════════ OTROS SERVICIOS → Bitácora de visitas ═══════════════════ */
const visitas = ref(
  visitasProvisionales
    .filter((v) => String(v.servicioId) === String(route.params.servicioId))
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
)

const modalVisitaAbierto = ref(false)
const formVisita = ref({ fecha: '', tecnico: '', hallazgos: '', observaciones: '' })

function guardarVisita() {
  if (!formVisita.value.fecha || !formVisita.value.tecnico || !formVisita.value.hallazgos) return
  visitas.value.unshift({
    id: Date.now(),
    servicioId: route.params.servicioId,
    fecha: formVisita.value.fecha,
    tecnico: formVisita.value.tecnico,
    hallazgos: formVisita.value.hallazgos,
    observaciones: formVisita.value.observaciones || 'Sin observaciones',
  })
  formVisita.value = { fecha: '', tecnico: '', hallazgos: '', observaciones: '' }
  modalVisitaAbierto.value = false
}
</script>

<template>
  <layoutNavbarAdmin>
    <div class="dashboard" v-if="servicio && local">

      <div class="breadcrumb">
        <router-link to="/Client-detail">Clientes</router-link>
        <span>/</span>
        <router-link :to="`/admin/clientes/${route.params.clientId}`">
          {{ cliente ? cliente.razonSocial : 'Cliente' }}
        </router-link>
        <span>/</span>
        <router-link :to="`/admin/clientes/${route.params.clientId}/locales/${local.id}`">
          {{ local.nombre }}
        </router-link>
        <span>/</span>
        <span>{{ servicio.tipo }}</span>
      </div>

      <div class="page-header">
        <div class="page-header-titulo">
          <span class="servicio-icono"><i :class="['ti', iconoServicio(servicio.tipo)]" aria-hidden="true"></i></span>
          <div>
            <h1 class="page-title">{{ servicio.tipo }}</h1>
            <p class="page-sub">{{ local.nombre }} · {{ local.direccion }}</p>
          </div>
        </div>
        <span :class="['badge', estadoClass(servicio.estado)]">{{ servicio.estado }}</span>
      </div>

      <!-- Info del servicio -->
      <div class="card info-card">
        <div class="info-item">
          <span class="info-label">Frecuencia</span>
          <span class="info-valor">{{ servicio.frecuencia }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Responsable</span>
          <span class="info-valor">{{ servicio.responsable }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Última visita</span>
          <span class="info-valor">{{ servicio.ultimaVisita }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Próxima visita</span>
          <span class="info-valor">{{ servicio.proximaVisita }}</span>
        </div>
      </div>

      <!-- ═══ DESRATIZACIÓN: tabla de estaciones ═══ -->
      <div class="card" v-if="esDesratizacion">
        <div class="card-header">
          <div class="card-title">
            <i class="ti ti-map-pin" aria-hidden="true"></i>
            Estaciones ({{ estaciones.length }})
          </div>
          <button class="btn-primary btn-sm" @click="modalEstacionAbierto = true">+ Nueva estación</button>
        </div>

        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Ubicación</th>
                <th>Último hallazgo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in estaciones" :key="e.id">
                <td class="cell-main">{{ e.codigo }}</td>
                <td>{{ e.tipo }}</td>
                <td class="cell-sub">{{ e.ubicacion }}</td>
                <td class="cell-sub">{{ e.ultimoHallazgo }}</td>
                <td><span :class="['badge', estadoClass(e.estado)]">{{ e.estado }}</span></td>
              </tr>
              <tr v-if="!estaciones.length">
                <td colspan="5" class="cell-vacio">Este servicio aún no tiene estaciones registradas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ═══ OTROS SERVICIOS: bitácora de visitas ═══ -->
      <div class="card" v-else>
        <div class="card-header">
          <div class="card-title">
            <i class="ti ti-notebook" aria-hidden="true"></i>
            Bitácora de visitas ({{ visitas.length }})
          </div>
          <button class="btn-primary btn-sm" @click="modalVisitaAbierto = true">+ Nuevo registro</button>
        </div>

        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Técnico</th>
                <th>Hallazgos</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="v in visitas" :key="v.id">
                <td class="cell-main">{{ v.fecha }}</td>
                <td>{{ v.tecnico }}</td>
                <td class="cell-sub">{{ v.hallazgos }}</td>
                <td class="cell-sub">{{ v.observaciones }}</td>
              </tr>
              <tr v-if="!visitas.length">
                <td colspan="4" class="cell-vacio">Este servicio aún no tiene visitas registradas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Servicio no encontrado -->
    <div class="dashboard" v-else>
      <div class="card not-found">
        <p>No se encontró ningún servicio con ese id.</p>
        <router-link to="/Client-detail" class="btn-link">← Volver a Clientes</router-link>
      </div>
    </div>

    <!-- Modal nueva estación -->
    <div v-if="modalEstacionAbierto" class="modal-overlay" @click.self="modalEstacionAbierto = false">
      <div class="modal">
        <h2>Nueva estación</h2>
        <form @submit.prevent="guardarEstacion">
          <div class="form-group">
            <label>Código</label>
            <input type="text" v-model="formEstacion.codigo" placeholder="Ej. EST-05" required />
          </div>
          <div class="form-group">
            <label>Tipo</label>
            <select v-model="formEstacion.tipo">
              <option v-for="t in tiposEstacion" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Ubicación</label>
            <input type="text" v-model="formEstacion.ubicacion" placeholder="Ej. Patio trasero" required />
          </div>
          <div class="form-group">
            <label>Estado</label>
            <select v-model="formEstacion.estado">
              <option v-for="e in estadosEstacion" :key="e" :value="e">{{ e }}</option>
            </select>
          </div>
          <div class="modal-botones">
            <button type="button" class="btn-cancelar" @click="modalEstacionAbierto = false">Cancelar</button>
            <button type="submit" class="btn-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal nuevo registro de visita -->
    <div v-if="modalVisitaAbierto" class="modal-overlay" @click.self="modalVisitaAbierto = false">
      <div class="modal">
        <h2>Nuevo registro de visita</h2>
        <form @submit.prevent="guardarVisita">
          <div class="form-group">
            <label>Fecha</label>
            <input type="text" v-model="formVisita.fecha" placeholder="Ej. 13/08/2026" required />
          </div>
          <div class="form-group">
            <label>Técnico</label>
            <input type="text" v-model="formVisita.tecnico" placeholder="Ej. Jorge Salas" required />
          </div>
          <div class="form-group">
            <label>Hallazgos</label>
            <input type="text" v-model="formVisita.hallazgos" placeholder="Ej. Sin actividad detectada" required />
          </div>
          <div class="form-group">
            <label>Observaciones</label>
            <input type="text" v-model="formVisita.observaciones" placeholder="Ej. Se recomienda..." />
          </div>
          <div class="modal-botones">
            <button type="button" class="btn-cancelar" @click="modalVisitaAbierto = false">Cancelar</button>
            <button type="submit" class="btn-guardar">Guardar</button>
          </div>
        </form>
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

.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; gap: 16px; }
.page-header-titulo { display: flex; align-items: center; gap: 12px; }
.servicio-icono {
  width: 40px; height: 40px; border-radius: 10px;
  background: #e8f5e9; color: #2e7d32;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: #6b7280; margin: 0; }

.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }

.info-card { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: 20px; }
.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-label { font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: #9ca3af; font-weight: 600; }
.info-valor { font-size: 13.5px; color: #111827; font-weight: 500; }

.card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6;
}
.card-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #111827; }
.card-title .ti { color: #42ae1a; font-size: 16px; }

.btn-primary { background: var(--green); color: #fff; border: none; border-radius: 8px; padding: 9px 16px; font-size: 13px; font-weight: 600; cursor: pointer; }
.btn-primary:hover { background: #379614; }
.btn-sm { padding: 7px 14px; font-size: 12.5px; }

.table-wrap { overflow-x: auto; }
.tabla { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.tabla thead th {
  padding: 10px 16px; text-align: left; font-size: 11.5px; font-weight: 600; color: #6b7280;
  text-transform: uppercase; letter-spacing: .04em; background: #f9fafb; border-bottom: 1px solid #e5e7eb;
}
.tabla tbody tr { border-bottom: 1px solid #f3f4f6; }
.tabla tbody tr:last-child { border-bottom: none; }
.tabla tbody tr:hover { background: #f9fafb; }
.tabla td { padding: 12px 16px; color: #374151; vertical-align: middle; }

.cell-main { font-weight: 500; color: #111827; }
.cell-sub { font-size: 12px; color: #9ca3af; }
.cell-vacio { text-align: center; color: #9ca3af; padding: 24px 0; }

.badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; white-space: nowrap; height: fit-content; }
.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--amber { background:#fff8e1; color:#92400e; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }

.not-found { padding: 40px; text-align: center; display: flex; flex-direction: column; gap: 12px; color: #6b7280; }
.btn-link { color: #42ae1a; font-weight: 600; font-size: 13px; text-decoration: none; }
.btn-link:hover { text-decoration: underline; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 50; }
.modal { background: #fff; border-radius: 12px; padding: 1.75rem; width: 100%; max-width: 380px; }
.modal h2 { margin: 0 0 16px; font-size: 18px; }
.modal form { display: flex; flex-direction: column; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group label { font-size: 12.5px; font-weight: 600; color: #374151; }
.form-group input, .form-group select { border: 1px solid #e5e7eb; border-radius: 8px; padding: 9px 10px; font-size: 13.5px; }
.form-group input:focus, .form-group select:focus { outline: none; border-color: #42ae1a; }

.modal-botones { display: flex; gap: 10px; margin-top: 8px; }
.btn-cancelar, .btn-guardar { flex: 1; border: none; border-radius: 999px; padding: 10px; font-weight: bold; font-size: 13px; cursor: pointer; }
.btn-cancelar { background: #f3f4f6; color: #374151; }
.btn-guardar { background: #42ae1a; color: #fff; }

@media (max-width: 900px) { .info-card { grid-template-columns: repeat(2, 1fr); } }
</style>