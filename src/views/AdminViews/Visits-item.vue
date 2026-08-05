<script setup>
import { ref, reactive, computed } from 'vue'
import layoutNavbarAdmin from '../../components/layoutNavbarAdmin.vue'

/* ---------- Datos mock (reemplazar por tu store / API) ---------- */
const clientes = ['Colegio San Martín', 'Restaurante El Fogón', 'Condominio Las Palmas']
const locales = ['Sede principal', 'Sucursal Norte', 'Cocina', 'Almacén']
const tecnicos = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María Gómez' },
  { id: 3, nombre: 'Luis Torres' },
]
const tiposServicio = ['Fumigación', 'Control de roedores', 'Inspección', 'Desinfección']
const estados = ['Programada', 'Completada', 'Cancelada']

const visitas = reactive([
  { id: 1, cliente: 'Colegio San Martín', local: 'Sede principal', tecnicoId: 1, fecha: '2026-08-03', hora: '09:00', servicio: 'Fumigación', estado: 'Programada' },
  { id: 2, cliente: 'Restaurante El Fogón', local: 'Cocina', tecnicoId: 2, fecha: '2026-08-03', hora: '14:00', servicio: 'Control de roedores', estado: 'Programada' },
  { id: 3, cliente: 'Condominio Las Palmas', local: 'Sucursal Norte', tecnicoId: 3, fecha: '2026-08-05', hora: '10:30', servicio: 'Inspección', estado: 'Completada' },
  { id: 4, cliente: 'Colegio San Martín', local: 'Almacén', tecnicoId: 1, fecha: '2026-08-12', hora: '08:00', servicio: 'Desinfección', estado: 'Programada' },
])

const tecnicoNombre = (id) => tecnicos.find((t) => t.id === id)?.nombre || '—'

/* ---------- Pestañas: lista / calendario ---------- */
const vistaActiva = ref('lista') // 'lista' | 'calendario'

/* ---------- Filtros de la tabla ---------- */
const filtroEstado = ref('todos')
const filtroFecha = ref('')

const visitasFiltradas = computed(() =>
  visitas
    .filter((v) => (filtroEstado.value === 'todos' ? true : v.estado === filtroEstado.value))
    .filter((v) => (filtroFecha.value ? v.fecha === filtroFecha.value : true))
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
)

/* ---------- Calendario ---------- */
const fechaRef = ref(new Date(2026, 7, 1)) // agosto 2026 como ejemplo

const nombreMes = computed(() =>
  fechaRef.value.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' })
)

function cambiarMes(delta) {
  const d = new Date(fechaRef.value)
  d.setMonth(d.getMonth() + delta)
  fechaRef.value = d
}

const diasCalendario = computed(() => {
  const year = fechaRef.value.getFullYear()
  const month = fechaRef.value.getMonth()
  const primerDia = new Date(year, month, 1)
  const inicioOffset = (primerDia.getDay() + 6) % 7 // lunes = 0
  const totalDias = new Date(year, month + 1, 0).getDate()

  const celdas = []
  for (let i = 0; i < inicioOffset; i++) celdas.push(null)
  for (let dia = 1; dia <= totalDias; dia++) {
    const fechaStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
    celdas.push({
      dia,
      fecha: fechaStr,
      visitas: visitas.filter((v) => v.fecha === fechaStr),
    })
  }
  return celdas
})

const diaSeleccionado = ref(null)
const visitasDelDia = computed(() =>
  diaSeleccionado.value ? visitas.filter((v) => v.fecha === diaSeleccionado.value) : []
)

function seleccionarDia(celda) {
  if (!celda) return
  diaSeleccionado.value = celda.fecha
}

/* ---------- Modal: nueva / editar visita ---------- */
const modalAbierto = ref(false)
const modoEdicion = ref(false)

const formVacio = () => ({
  id: null,
  cliente: clientes[0],
  local: locales[0],
  tecnicoId: tecnicos[0].id,
  fecha: '',
  hora: '',
  servicio: tiposServicio[0],
  estado: 'Programada',
})

const form = reactive(formVacio())

function abrirNuevaVisita(fechaPrellenada = '') {
  Object.assign(form, formVacio())
  if (fechaPrellenada) form.fecha = fechaPrellenada
  modoEdicion.value = false
  modalAbierto.value = true
}

function abrirEdicion(visita) {
  Object.assign(form, visita)
  modoEdicion.value = true
  modalAbierto.value = true
}

function cerrarModal() {
  modalAbierto.value = false
}

function guardarVisita() {
  if (!form.fecha || !form.hora) return

  if (modoEdicion.value) {
    const idx = visitas.findIndex((v) => v.id === form.id)
    if (idx !== -1) visitas[idx] = { ...form }
  } else {
    visitas.push({ ...form, id: Date.now() })
  }
  cerrarModal()
}

function eliminarVisita(id) {
  const idx = visitas.findIndex((v) => v.id === id)
  if (idx !== -1) visitas.splice(idx, 1)
}

const estadoClase = (estado) => ({
  programada: estado === 'Programada',
  completada: estado === 'Completada',
  cancelada: estado === 'Cancelada',
})
</script>

<template>
    <layoutNavbarAdmin>
    <div class="visitas-content">
      <header class="visitas-header">
        <div>
          <h1>Visitas</h1>
          <p class="subtitle">Programa y da seguimiento a los servicios agendados</p>
        </div>
        <button class="btn-nueva" @click="abrirNuevaVisita()">+ Nueva visita</button>
      </header>

      <div class="tabs">
        <button
          class="tab"
          :class="{ activo: vistaActiva === 'lista' }"
          @click="vistaActiva = 'lista'"
        >
          Lista
        </button>
        <button
          class="tab"
          :class="{ activo: vistaActiva === 'calendario' }"
          @click="vistaActiva = 'calendario'"
        >
          Calendario
        </button>
      </div>

      <!-- ============ VISTA LISTA ============ -->
      <section v-if="vistaActiva === 'lista'" class="panel">
        <div class="filtros">
          <select v-model="filtroEstado">
            <option value="todos">Todos los estados</option>
            <option v-for="e in estados" :key="e" :value="e">{{ e }}</option>
          </select>
          <input type="date" v-model="filtroFecha" />
          <button v-if="filtroFecha" class="btn-link" @click="filtroFecha = ''">Limpiar fecha</button>
        </div>

        <table class="tabla-visitas">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Local</th>
              <th>Técnico</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v in visitasFiltradas" :key="v.id">
              <td>{{ v.cliente }}</td>
              <td>{{ v.local }}</td>
              <td>{{ tecnicoNombre(v.tecnicoId) }}</td>
              <td>{{ v.fecha }}</td>
              <td>{{ v.hora }}</td>
              <td>{{ v.servicio }}</td>
              <td>
                <span class="badge-estado" :class="estadoClase(v.estado)">{{ v.estado }}</span>
              </td>
              <td class="acciones">
                <button class="btn-editar" @click="abrirEdicion(v)">Editar</button>
                <button class="btn-eliminar" @click="eliminarVisita(v.id)">Eliminar</button>
              </td>
            </tr>
            <tr v-if="!visitasFiltradas.length">
              <td colspan="8" class="vacio">No hay visitas con esos filtros</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- ============ VISTA CALENDARIO ============ -->
      <section v-else class="panel">
        <div class="calendario-header">
          <button class="nav-mes" @click="cambiarMes(-1)">‹</button>
          <h2>{{ nombreMes }}</h2>
          <button class="nav-mes" @click="cambiarMes(1)">›</button>
        </div>

        <div class="calendario-grid">
          <div class="dia-nombre" v-for="d in ['L', 'M', 'X', 'J', 'V', 'S', 'D']" :key="d">{{ d }}</div>

          <div
            v-for="(celda, idx) in diasCalendario"
            :key="idx"
            class="celda-dia"
            :class="{ vacia: !celda, seleccionada: celda && diaSeleccionado === celda.fecha }"
            @click="seleccionarDia(celda)"
          >
            <template v-if="celda">
              <span class="numero-dia">{{ celda.dia }}</span>
              <div class="chips">
                <span
                  v-for="v in celda.visitas.slice(0, 3)"
                  :key="v.id"
                  class="chip-visita"
                  :class="estadoClase(v.estado)"
                >
                  {{ v.hora }} {{ v.cliente }}
                </span>
                <span v-if="celda.visitas.length > 3" class="chip-mas">+{{ celda.visitas.length - 3 }}</span>
              </div>
            </template>
          </div>
        </div>

        <div v-if="diaSeleccionado" class="dia-detalle">
          <div class="dia-detalle-header">
            <h3>Visitas del {{ diaSeleccionado }}</h3>
            <button class="btn-nueva btn-nueva-chica" @click="abrirNuevaVisita(diaSeleccionado)">
              + Agregar
            </button>
          </div>
          <ul v-if="visitasDelDia.length" class="lista-dia">
            <li v-for="v in visitasDelDia" :key="v.id">
              <span class="hora-dia">{{ v.hora }}</span>
              <span>{{ v.cliente }} — {{ v.servicio }} ({{ tecnicoNombre(v.tecnicoId) }})</span>
              <span class="badge-estado" :class="estadoClase(v.estado)">{{ v.estado }}</span>
            </li>
          </ul>
          <p v-else class="vacio">No hay visitas programadas este día</p>
        </div>
      </section>
    </div>

    <!-- ============ MODAL PROGRAMAR / EDITAR ============ -->
    <div v-if="modalAbierto" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal">
        <h2>{{ modoEdicion ? 'Editar visita' : 'Programar visita' }}</h2>

        <form @submit.prevent="guardarVisita">
          <label>
            Cliente
            <select v-model="form.cliente">
              <option v-for="c in clientes" :key="c" :value="c">{{ c }}</option>
            </select>
          </label>

          <label>
            Local
            <select v-model="form.local">
              <option v-for="l in locales" :key="l" :value="l">{{ l }}</option>
            </select>
          </label>

          <label>
            Técnico
            <select v-model="form.tecnicoId">
              <option v-for="t in tecnicos" :key="t.id" :value="t.id">{{ t.nombre }}</option>
            </select>
          </label>

          <div class="fila-doble">
            <label>
              Fecha
              <input type="date" v-model="form.fecha" required />
            </label>
            <label>
              Hora
              <input type="time" v-model="form.hora" required />
            </label>
          </div>

          <label>
            Tipo de servicio
            <select v-model="form.servicio">
              <option v-for="s in tiposServicio" :key="s" :value="s">{{ s }}</option>
            </select>
          </label>

          <label v-if="modoEdicion">
            Estado
            <select v-model="form.estado">
              <option v-for="e in estados" :key="e" :value="e">{{ e }}</option>
            </select>
          </label>

          <div class="modal-botones">
            <button type="button" class="btn-cancelar" @click="cerrarModal">Cancelar</button>
            <button type="submit" class="btn-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    </layoutNavbarAdmin>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
}

.visitas-content {
  flex: 1;
  padding: 2rem;
}

.visitas-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.visitas-header h1 {
  margin: 0 0 4px;
  font-size: 24px;
  color: #1a1a1a;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.btn-nueva {
  background: #42ae1a;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-nueva:hover {
  background: #379115;
}

.btn-nueva-chica {
  padding: 6px 12px;
  font-size: 12px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tab {
  background: #fff;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  padding: 8px 18px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.tab.activo {
  background: #42ae1a;
  border-color: #42ae1a;
  color: #fff;
}

.panel {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
}

/* ---------- Filtros y tabla ---------- */
.filtros {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}

.filtros select,
.filtros input {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
}

.btn-link {
  background: none;
  border: none;
  color: #42ae1a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.tabla-visitas {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.tabla-visitas th {
  text-align: left;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.02em;
  padding: 10px 12px;
  border-bottom: 1px solid #e5e7eb;
}

.tabla-visitas td {
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #1f2937;
}

.acciones {
  display: flex;
  gap: 8px;
}

.btn-editar,
.btn-eliminar {
  border: none;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}

.btn-editar {
  background: #ffffff;
  color: #004c08;
  border: 1px solid #42ae1a;
}

.btn-eliminar {
  background: #004c08;
  color: #fff;
}

.vacio {
  text-align: center;
  color: #9ca3af;
  padding: 24px 0;
}

.badge-estado {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: #f3f4f6;
  color: #6b7280;
}

.badge-estado.programada {
  background: #eafaf0;
  color: #16803a;
}

.badge-estado.completada {
  background: #e6f1fb;
  color: #0c447c;
}

.badge-estado.cancelada {
  background: #fdeceb;
  color: #b3261e;
}

/* ---------- Calendario ---------- */
.calendario-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}

.calendario-header h2 {
  margin: 0;
  font-size: 16px;
  text-transform: capitalize;
  color: #1a1a1a;
}

.nav-mes {
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  color: #374151;
}

.calendario-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.dia-nombre {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  padding-bottom: 4px;
}

.celda-dia {
  min-height: 92px;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.celda-dia:hover {
  border-color: #42ae1a;
}

.celda-dia.vacia {
  border: none;
  cursor: default;
}

.celda-dia.seleccionada {
  border-color: #42ae1a;
  background: #f3fbef;
}

.numero-dia {
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}

.chips {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chip-visita {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #eafaf0;
  color: #16803a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chip-visita.completada {
  background: #e6f1fb;
  color: #0c447c;
}

.chip-visita.cancelada {
  background: #fdeceb;
  color: #b3261e;
}

.chip-mas {
  font-size: 10px;
  color: #9ca3af;
}

.dia-detalle {
  margin-top: 20px;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.dia-detalle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.dia-detalle-header h3 {
  margin: 0;
  font-size: 14px;
}

.lista-dia {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lista-dia li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #374151;
}

.hora-dia {
  font-weight: 700;
  color: #42ae1a;
  min-width: 48px;
}

/* ---------- Modal ---------- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: #fff;
  border-radius: 12px;
  padding: 1.75rem;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal h2 {
  margin: 0 0 16px;
  font-size: 18px;
  color: #1a1a1a;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.modal select,
.modal input {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 14px;
  font-weight: 400;
}

.fila-doble {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.modal-botones {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.btn-cancelar,
.btn-guardar {
  flex: 1;
  border: none;
  border-radius: 999px;
  padding: 10px;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
}

.btn-cancelar {
  background: #f3f4f6;
  color: #374151;
}

.btn-guardar {
  background: #42ae1a;
  color: #fff;
}
</style>