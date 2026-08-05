<script setup>
import { ref, computed } from 'vue'
import layoutNavbarAdmin from '../../components/layoutNavbarAdmin.vue'

/* ── Catálogo de servicios (mismo usado en Dashboard/Visitas) ── */
const tiposServicio = ['Desinsectación', 'Desratización', 'Desinfección', 'Fumigación', 'Inspección']

/* ── Facturas mock ─────────────────────────────────── */
const facturas = ref([
  { id: 1, cliente: 'Restaurante El Olivo', servicio: 'Desinsectación', monto: 480, fecha: '15 Jul', estado: 'pagada' },
  { id: 2, cliente: 'Almacenes San Martín', servicio: 'Desratización', monto: 620, fecha: '17 Jul', estado: 'pendiente' },
  { id: 3, cliente: 'Clínica Santa Rosa', servicio: 'Desinfección', monto: 950, fecha: '10 Jul', estado: 'vencida' },
  { id: 4, cliente: 'Hotel Libertador', servicio: 'Desinsectación', monto: 720, fecha: '19 Jul', estado: 'pagada' },
  { id: 5, cliente: 'Colegio Los Pinos', servicio: 'Desratización', monto: 310, fecha: '20 Jul', estado: 'pendiente' },
])

/* ── Métricas derivadas ────────────────────────────── */
const stats = computed(() => {
  const totalMes = facturas.value.reduce((sum, f) => sum + f.monto, 0)
  const pendientes = facturas.value.filter((f) => f.estado === 'pendiente')
  const vencidas = facturas.value.filter((f) => f.estado === 'vencida')
  const clientesUnicos = new Set(facturas.value.map((f) => f.cliente)).size

  return [
    { label: 'Facturado este mes', valor: `S/ ${totalMes.toLocaleString('es-PE')}`, sub: `${facturas.value.length} facturas`, icono: 'ti-file-invoice', color: 'green' },
    { label: 'Pendientes de cobro', valor: pendientes.length, sub: `S/ ${pendientes.reduce((s, f) => s + f.monto, 0).toLocaleString('es-PE')}`, icono: 'ti-clock', color: 'amber' },
    { label: 'Facturas vencidas', valor: vencidas.length, sub: 'Requieren seguimiento', icono: 'ti-alert-triangle', color: 'red' },
    { label: 'Clientes facturados', valor: clientesUnicos, sub: 'Este mes', icono: 'ti-building', color: 'blue' },
  ]
})

/* ── Helpers de estilo (mismos que Dashboard) ─────── */
const estadoClass = (e) => ({ pagada: 'badge--green', pendiente: 'badge--amber', vencida: 'badge--red' }[e] || 'badge--gray')
const estadoLabel = (e) => ({ pagada: 'Pagada', pendiente: 'Pendiente', vencida: 'Vencida' }[e] || e)
const statBg = (c) => ({ green: '#e8f5e9', blue: '#e3f2fd', amber: '#fff8e1', red: '#ffebee' }[c])
const statColor = (c) => ({ green: '#2e7d32', blue: '#1565c0', amber: '#e65100', red: '#c62828' }[c])

/* ── Formulario: nueva factura ────────────────────── */
const form = ref({ cliente: '', servicio: tiposServicio[0], monto: '' })

function generarFactura() {
  if (!form.value.cliente || !form.value.monto) return

  facturas.value.unshift({
    id: Date.now(),
    cliente: form.value.cliente,
    servicio: form.value.servicio,
    monto: Number(form.value.monto),
    fecha: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
    estado: 'pendiente',
  })

  form.value = { cliente: '', servicio: tiposServicio[0], monto: '' }
}
</script>

<template>
  <div class="admin-layout">
    <layoutNavbarAdmin />

    <main class="main-content">
      <div class="dashboard">

        <div class="page-header">
          <div>
            <h1 class="page-title">Facturas</h1>
            <p class="page-sub">Gestiona la facturación y el estado de cobro de tus clientes</p>
          </div>
        </div>

        <!-- ── Métricas ──────────────────────────────── -->
        <div class="stats-grid">
          <div v-for="s in stats" :key="s.label" class="stat-card">
            <div class="stat-icon" :style="{ background: statBg(s.color), color: statColor(s.color) }">
              <i :class="['ti', s.icono]" aria-hidden="true"></i>
            </div>
            <div class="stat-body">
              <div class="stat-valor">{{ s.valor }}</div>
              <div class="stat-label">{{ s.label }}</div>
              <div class="stat-sub">{{ s.sub }}</div>
            </div>
          </div>
        </div>

        <!-- ── Fila principal ────────────────────────── -->
        <div class="main-row">

          <!-- Listado de facturas -->
          <div class="card card--wide">
            <div class="card-header">
              <div class="card-title">
                <i class="ti ti-file-invoice" aria-hidden="true"></i>
                Facturas emitidas
              </div>
            </div>

            <div class="table-wrap">
              <table class="tabla">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="f in facturas" :key="f.id">
                    <td class="cell-main">{{ f.cliente }}</td>
                    <td>{{ f.servicio }}</td>
                    <td class="cell-sub">{{ f.fecha }}</td>
                    <td class="cell-hora">S/ {{ f.monto.toLocaleString('es-PE') }}</td>
                    <td>
                      <span :class="['badge', estadoClass(f.estado)]">{{ estadoLabel(f.estado) }}</span>
                    </td>
                  </tr>
                  <tr v-if="!facturas.length">
                    <td colspan="5" class="cell-vacio">Aún no hay facturas registradas</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Generar nueva factura -->
          <div class="side-col">
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <i class="ti ti-plus" aria-hidden="true"></i>
                  Generar factura
                </div>
              </div>

              <form class="form-factura" @submit.prevent="generarFactura">
                <div class="form-group">
                  <label>Nombre del cliente</label>
                  <input type="text" v-model="form.cliente" placeholder="Ej. Restaurante El Olivo" required />
                </div>

                <div class="form-group">
                  <label>Tipo de servicio</label>
                  <select v-model="form.servicio">
                    <option v-for="s in tiposServicio" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Monto total (S/)</label>
                  <input type="number" min="0" step="0.01" v-model="form.monto" placeholder="0.00" required />
                </div>

                <button type="submit" class="btn-primary btn-full">
                  <i class="ti ti-file-invoice" aria-hidden="true"></i>
                  Generar factura
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* ── Layout (idéntico al Dashboard) ───────────────── */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
}

.main-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.dashboard {
  --green: #42ae1a;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #111827;
}

/* ── Cabecera ─────────────────────────────────── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 16px;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
}

.page-sub {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

/* ── Stats (idéntico al Dashboard) ────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.stat-valor { font-size: 28px; font-weight: 800; color: #111827; line-height: 1; margin-bottom: 2px; }
.stat-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 2px; }
.stat-sub   { font-size: 12px; color: #9ca3af; }

/* ── Layout principal ─────────────────────────── */
.main-row {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: start;
}

/* ── Cards ────────────────────────────────────── */
.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.card-title .ti { color: #42ae1a; font-size: 16px; }

/* ── Tabla facturas ────────────────────────────── */
.table-wrap { overflow-x: auto; }

.tabla {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.tabla thead th {
  padding: 10px 16px;
  text-align: left;
  font-size: 11.5px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: .04em;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

.tabla tbody tr { border-bottom: 1px solid #f3f4f6; transition: background 0.1s; }
.tabla tbody tr:last-child { border-bottom: none; }
.tabla tbody tr:hover { background: #f9fafb; }

.tabla td { padding: 12px 16px; color: #374151; vertical-align: middle; }

.cell-main { font-weight: 500; color: #111827; }
.cell-sub  { font-size: 12px; color: #9ca3af; }
.cell-hora { font-weight: 600; color: #111827; white-space: nowrap; }
.cell-vacio { text-align: center; color: #9ca3af; padding: 24px 0; }

/* ── Badges (idéntico al Dashboard) ───────────── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--amber { background:#fff8e1; color:#92400e; }
.badge--red   { background:#ffebee; color:#b91c1c; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }

/* ── Formulario generar factura ───────────────── */
.side-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-factura {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12.5px;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13.5px;
  color: #111827;
  background: #fff;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #42ae1a;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 18px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-primary:hover { background: #379614; }
.btn-full { width: 100%; margin-top: 4px; }

/* ── Responsive ───────────────────────────────── */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .main-row { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .page-header { flex-direction: column; }
  .main-content { padding: 16px; }
}
</style>