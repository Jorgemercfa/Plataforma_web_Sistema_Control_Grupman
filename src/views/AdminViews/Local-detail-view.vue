<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue'
import { clientesProvisionales } from '../../data/provisionalCustomerData.js'
import { localesProvisionales } from '../../data/provisionalLocalesData.js'
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

const tiposEstacion = ['Cebadero roedores', 'Trampa de luz', 'Trampa pegante', 'Estación de control']
const estadosEstacion = ['Activa', 'Revisar', 'Inactiva']

/* ── Estaciones reales de este local ───────────────── */
const estaciones = ref(
  estacionesProvisionales.filter((e) => String(e.localId) === String(route.params.localId))
)

const estadoClass = (e) => ({
  Activa: 'badge--green',
  Revisar: 'badge--amber',
  Inactiva: 'badge--gray',
}[e] || 'badge--gray')

/* ── Modal: nueva estación ────────────────────────── */
const modalAbierto = ref(false)
const form = ref({ codigo: '', tipo: tiposEstacion[0], ubicacion: '', estado: 'Activa' })

function guardarEstacion() {
  if (!form.value.codigo || !form.value.ubicacion) return
  estaciones.value.push({
    id: Date.now(),
    localId: route.params.localId,
    codigo: form.value.codigo,
    tipo: form.value.tipo,
    ubicacion: form.value.ubicacion,
    ultimoHallazgo: 'Sin registros aún',
    estado: form.value.estado,
  })
  form.value = { codigo: '', tipo: tiposEstacion[0], ubicacion: '', estado: 'Activa' }
  modalAbierto.value = false
}
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

      <!-- Estaciones -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <i class="ti ti-map-pin" aria-hidden="true"></i>
            Estaciones ({{ estaciones.length }})
          </div>
          <button class="btn-primary btn-sm" @click="modalAbierto = true">+ Nueva estación</button>
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
                <td colspan="5" class="cell-vacio">Este local aún no tiene estaciones registradas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Local no encontrado -->
    <div class="dashboard" v-else>
      <div class="card not-found">
        <p>No se encontró ningún local con ese id.</p>
        <router-link to="/Client-detail" class="btn-link">← Volver a Clientes</router-link>
      </div>
    </div>

    <!-- Modal nueva estación -->
    <div v-if="modalAbierto" class="modal-overlay" @click.self="modalAbierto = false">
      <div class="modal">
        <h2>Nueva estación</h2>
        <form @submit.prevent="guardarEstacion">
          <div class="form-group">
            <label>Código</label>
            <input type="text" v-model="form.codigo" placeholder="Ej. EST-05" required />
          </div>
          <div class="form-group">
            <label>Tipo</label>
            <select v-model="form.tipo">
              <option v-for="t in tiposEstacion" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Ubicación</label>
            <input type="text" v-model="form.ubicacion" placeholder="Ej. Patio trasero" required />
          </div>
          <div class="form-group">
            <label>Estado</label>
            <select v-model="form.estado">
              <option v-for="e in estadosEstacion" :key="e" :value="e">{{ e }}</option>
            </select>
          </div>
          <div class="modal-botones">
            <button type="button" class="btn-cancelar" @click="modalAbierto = false">Cancelar</button>
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

.page-header { margin-bottom: 20px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: #6b7280; margin: 0; }

.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }

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

.badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; white-space: nowrap; }
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
</style>