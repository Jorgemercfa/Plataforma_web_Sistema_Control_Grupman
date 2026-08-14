<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue'
import { clientesProvisionales } from '../../data/provisionalCustomerData.js'
import { localesProvisionales } from '../../data/provisionalLocalesData.js'
import { serviciosProvisionales, TIPOS_SERVICIO } from '../../data/provisionalServiciosData.js'

const route = useRoute()

/* ── Cliente real, buscado por id en la data provisional ── */
const cliente = computed(() =>
  clientesProvisionales.find((c) => String(c.id) === String(route.params.id))
)

const badgeClass = (e) => ({ activo: 'badge--green', inactivo: 'badge--gray', pendiente: 'badge--amber' }[e] || 'badge--gray')
const badgeLabel = (e) => ({ activo: 'Activo', inactivo: 'Inactivo', pendiente: 'Pendiente' }[e] || e)

/* ── Locales reales de este cliente ────────────────── */
const locales = ref(
  localesProvisionales.filter((l) => String(l.clienteId) === String(route.params.id))
)

/* ── Modal: nuevo local ────────────────────────────── */
const modalAbierto = ref(false)
const form = ref({ nombre: '', direccion: '' })

function guardarLocal() {
  if (!form.value.nombre || !form.value.direccion) return
  const nuevoLocalId = Date.now()

  locales.value.push({
    id: nuevoLocalId,
    clienteId: route.params.id,
    nombre: form.value.nombre,
    direccion: form.value.direccion,
    proximaVisita: 'Sin programar',
  })

  // Se crean automáticamente los 5 servicios para el nuevo local
  TIPOS_SERVICIO.forEach((tipo, i) => {
    serviciosProvisionales.push({
      id: nuevoLocalId + i + 1,
      localId: nuevoLocalId,
      tipo,
      estado: 'Pendiente',
      frecuencia: 'Por definir',
      responsable: 'Por asignar',
      ultimaVisita: 'Sin registros',
      proximaVisita: 'Sin programar',
    })
  })

  form.value = { nombre: '', direccion: '' }
  modalAbierto.value = false
}

/* Cada local puede tener hasta 5 servicios (Desinsectación, Desinfección,
   Desratización, Limpieza de cisternas, Diagnóstico y monitoreo). */
const serviciosDeLocal = (localId) =>
  serviciosProvisionales.filter((s) => String(s.localId) === String(localId))

const serviciosActivosDeLocal = (localId) =>
  serviciosDeLocal(localId).filter((s) => s.estado === 'Activo').length

const totalServiciosActivos = computed(() =>
  locales.value.reduce((total, l) => total + serviciosActivosDeLocal(l.id), 0)
)
</script>

<template>
  <layoutNavbarAdmin>
    <div class="dashboard" v-if="cliente">

      <div class="breadcrumb">
        <router-link to="/Client-detail">Clientes</router-link>
        <span>/</span>
        <span>{{ cliente.razonSocial }}</span>
      </div>

      <div class="page-header">
        <div>
          <h1 class="page-title">{{ cliente.razonSocial }}</h1>
          <p class="page-sub">RUC {{ cliente.ruc }}</p>
        </div>
        <span :class="['badge', badgeClass(cliente.estado)]">{{ badgeLabel(cliente.estado) }}</span>
      </div>

      <!-- Info del cliente -->
      <div class="card info-card">
        <div class="info-item">
          <span class="info-label">Contacto</span>
          <span class="info-valor">{{ cliente.contacto }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Teléfono</span>
          <span class="info-valor">{{ cliente.telefono }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Correo</span>
          <span class="info-valor">{{ cliente.email }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Última visita</span>
          <span class="info-valor">{{ cliente.ultimaVisita }}</span>
        </div>
      </div>

      <!-- Locales -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <i class="ti ti-building-warehouse" aria-hidden="true"></i>
            Locales ({{ locales.length }} · {{ totalServiciosActivos }} servicios activos)
          </div>
          <button class="btn-primary btn-sm" @click="modalAbierto = true">+ Nuevo local</button>
        </div>

        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Local</th>
                <th>Dirección</th>
                <th>Servicios activos</th>
                <th>Próxima visita</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="l in locales" :key="l.id">
                <td class="cell-main">{{ l.nombre }}</td>
                <td class="cell-sub">{{ l.direccion }}</td>
                <td>{{ serviciosActivosDeLocal(l.id) }} / {{ serviciosDeLocal(l.id).length }}</td>
                <td>{{ l.proximaVisita }}</td>
                <td class="cell-accion">
                  <router-link
                    :to="`/admin/clientes/${cliente.id}/locales/${l.id}`"
                    class="btn-link"
                  >
                    Ver servicios →
                  </router-link>
                </td>
              </tr>
              <tr v-if="!locales.length">
                <td colspan="5" class="cell-vacio">Este cliente aún no tiene locales registrados</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Cliente no encontrado (id inválido en la URL) -->
    <div class="dashboard" v-else>
      <div class="card not-found">
        <p>No se encontró ningún cliente con ese id.</p>
        <router-link to="/Client-detail" class="btn-link">← Volver a Clientes</router-link>
      </div>
    </div>

    <!-- Modal nuevo local -->
    <div v-if="modalAbierto" class="modal-overlay" @click.self="modalAbierto = false">
      <div class="modal">
        <h2>Nuevo local</h2>
        <form @submit.prevent="guardarLocal">
          <div class="form-group">
            <label>Nombre del local</label>
            <input type="text" v-model="form.nombre" placeholder="Ej. Sede principal" required />
          </div>
          <div class="form-group">
            <label>Dirección</label>
            <input type="text" v-model="form.direccion" placeholder="Ej. Av. Los Álamos 450" required />
          </div>
          <div class="modal-botones">
            <button type="button" class="btn-cancelar" @click="modalAbierto = false">Cancelar</button>
            <button type="submit" class="btn-guardar">Guardar</button>
          </div>
        </form>
        <p class="modal-nota">
          Los 5 servicios (Desinsectación, Desinfección, Desratización, Limpieza de cisternas
          y Diagnóstico y monitoreo) se crean automáticamente para el nuevo local.
        </p>
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

.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 12px; }
.breadcrumb a { color: #42ae1a; text-decoration: none; font-weight: 600; }
.breadcrumb a:hover { text-decoration: underline; }

.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; gap: 16px; }
.page-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: #6b7280; margin: 0; }

.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }

.info-card { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: 20px; }
.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-label { font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: #9ca3af; font-weight: 600; }
.info-valor { font-size: 13.5px; color: #111827; font-weight: 500; }

.card-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #f3f4f6; }
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
.cell-accion { text-align: right; }

.btn-link { color: #42ae1a; font-weight: 600; font-size: 13px; text-decoration: none; }
.btn-link:hover { text-decoration: underline; }

.badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; white-space: nowrap; height: fit-content; }
.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--amber { background:#fff8e1; color:#92400e; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }

.not-found { padding: 40px; text-align: center; display: flex; flex-direction: column; gap: 12px; color: #6b7280; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 50; }
.modal { background: #fff; border-radius: 12px; padding: 1.75rem; width: 100%; max-width: 380px; }
.modal h2 { margin: 0 0 16px; font-size: 18px; }
.modal form { display: flex; flex-direction: column; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group label { font-size: 12.5px; font-weight: 600; color: #374151; }
.form-group input { border: 1px solid #e5e7eb; border-radius: 8px; padding: 9px 10px; font-size: 13.5px; }
.form-group input:focus { outline: none; border-color: #42ae1a; }

.modal-botones { display: flex; gap: 10px; margin-top: 8px; }
.btn-cancelar, .btn-guardar { flex: 1; border: none; border-radius: 999px; padding: 10px; font-weight: bold; font-size: 13px; cursor: pointer; }
.btn-cancelar { background: #f3f4f6; color: #374151; }
.btn-guardar { background: #42ae1a; color: #fff; }

.modal-nota { margin-top: 10px; font-size: 11.5px; color: #9ca3af; line-height: 1.4; }

@media (max-width: 900px) { .info-card { grid-template-columns: repeat(2, 1fr); } }
</style>