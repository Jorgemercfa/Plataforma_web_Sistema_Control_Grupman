<script setup>
import { ref, computed } from 'vue'
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue'

/* ── Catálogos mock ────────────────────────────────── */
const proveedores = ['Química Andina', 'Insumos del Norte', 'Distribuidora Rentokil']
// const estados = ['Pendiente', 'Pagada']

/* ── Compras mock ──────────────────────────────────── */
const compras = ref([
  { id: 1, proveedor: 'Química Andina', producto: 'Cipermetrina 25% EC (10L)', monto: 620, fecha: '16 Jul', estado: 'Pagada' },
  { id: 2, proveedor: 'Insumos del Norte', producto: 'Rodenticida brodifacoum (15kg)', monto: 410, fecha: '18 Jul', estado: 'Pendiente' },
  { id: 3, proveedor: 'Distribuidora Rentokil', producto: 'Trampas de luz (x6)', monto: 780, fecha: '22 Jul', estado: 'Pagada' },
])

const stats = computed(() => {
  const totalMes = compras.value.reduce((s, c) => s + c.monto, 0)
  const pendientes = compras.value.filter((c) => c.estado === 'Pendiente')
  return [
    { label: 'Comprado este mes', valor: `S/ ${totalMes.toLocaleString('es-PE')}`, sub: `${compras.value.length} compras`, icono: 'ti-shopping-cart', color: 'green' },
    { label: 'Pendientes de pago', valor: pendientes.length, sub: `S/ ${pendientes.reduce((s, c) => s + c.monto, 0).toLocaleString('es-PE')}`, icono: 'ti-clock', color: 'amber' },
    { label: 'Proveedores activos', valor: new Set(compras.value.map((c) => c.proveedor)).size, sub: 'Con compras este mes', icono: 'ti-truck', color: 'blue' },
  ]
})

const statBg = (c) => ({ green: '#e8f5e9', blue: '#e3f2fd', amber: '#fff8e1', red: '#ffebee' }[c])
const statColor = (c) => ({ green: '#2e7d32', blue: '#1565c0', amber: '#e65100', red: '#c62828' }[c])
const estadoClass = (e) => ({ Pagada: 'badge--green', Pendiente: 'badge--amber' }[e] || 'badge--gray')

/* ── Formulario: nueva compra ──────────────────────── */
const form = ref({ proveedor: proveedores[0], producto: '', monto: '' })

function registrarCompra() {
  if (!form.value.producto || !form.value.monto) return
  compras.value.unshift({
    id: Date.now(),
    proveedor: form.value.proveedor,
    producto: form.value.producto,
    monto: Number(form.value.monto),
    fecha: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
    estado: 'Pendiente',
  })
  form.value = { proveedor: proveedores[0], producto: '', monto: '' }
}
</script>

<template>
  <layoutNavbarAdmin>
    <div class="dashboard">

      <div class="page-header">
        <div>
          <h1 class="page-title">Compras</h1>
          <p class="page-sub">Registra las compras de insumos y productos a tus proveedores</p>
        </div>
      </div>

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

      <div class="main-row">
        <div class="card card--wide">
          <div class="card-header">
            <div class="card-title"><i class="ti ti-shopping-cart" aria-hidden="true"></i> Compras registradas</div>
          </div>
          <div class="table-wrap">
            <table class="tabla">
              <thead>
                <tr><th>Proveedor</th><th>Producto</th><th>Fecha</th><th>Monto</th><th>Estado</th></tr>
              </thead>
              <tbody>
                <tr v-for="c in compras" :key="c.id">
                  <td class="cell-main">{{ c.proveedor }}</td>
                  <td>{{ c.producto }}</td>
                  <td class="cell-sub">{{ c.fecha }}</td>
                  <td class="cell-hora">S/ {{ c.monto.toLocaleString('es-PE') }}</td>
                  <td><span :class="['badge', estadoClass(c.estado)]">{{ c.estado }}</span></td>
                </tr>
                <tr v-if="!compras.length">
                  <td colspan="5" class="cell-vacio">Aún no hay compras registradas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="side-col">
          <div class="card">
            <div class="card-header">
              <div class="card-title"><i class="ti ti-plus" aria-hidden="true"></i> Registrar compra</div>
            </div>
            <form class="form-compra" @submit.prevent="registrarCompra">
              <div class="form-group">
                <label>Proveedor</label>
                <select v-model="form.proveedor">
                  <option v-for="p in proveedores" :key="p" :value="p">{{ p }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Producto</label>
                <input type="text" v-model="form.producto" placeholder="Ej. Cipermetrina 25% EC" required />
              </div>
              <div class="form-group">
                <label>Monto (S/)</label>
                <input type="number" min="0" step="0.01" v-model="form.monto" placeholder="0.00" required />
              </div>
              <button type="submit" class="btn-primary btn-full">
                <i class="ti ti-shopping-cart" aria-hidden="true"></i> Registrar compra
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </layoutNavbarAdmin>
</template>

<style scoped>
.dashboard { --green: #42ae1a; font-family: 'Inter', 'Segoe UI', sans-serif; color: #111827; padding: 32px; }

.page-header { margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 700; margin: 0 0 4px; }
.page-sub { font-size: 13px; color: #6b7280; margin: 0; }

.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 16px; }
.stat-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.stat-valor { font-size: 24px; font-weight: 800; line-height: 1; margin-bottom: 2px; }
.stat-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 2px; }
.stat-sub { font-size: 12px; color: #9ca3af; }

.main-row { display: grid; grid-template-columns: 1fr 320px; gap: 20px; align-items: start; }

.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
.card-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #f3f4f6; }
.card-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #111827; }
.card-title .ti { color: #42ae1a; font-size: 16px; }

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
.cell-hora { font-weight: 600; color: #111827; white-space: nowrap; }
.cell-vacio { text-align: center; color: #9ca3af; padding: 24px 0; }

.badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--amber { background:#fff8e1; color:#92400e; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }

.side-col { display: flex; flex-direction: column; gap: 20px; }
.form-compra { display: flex; flex-direction: column; gap: 16px; padding: 20px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 12.5px; font-weight: 600; color: #374151; }
.form-group input, .form-group select { border: 1px solid #e5e7eb; border-radius: 8px; padding: 9px 12px; font-size: 13.5px; background: #fff; }
.form-group input:focus, .form-group select:focus { outline: none; border-color: #42ae1a; }

.btn-primary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--green); color: #fff; border: none; border-radius: 8px;
  padding: 11px 18px; font-size: 13.5px; font-weight: 600; cursor: pointer;
}
.btn-primary:hover { background: #379614; }
.btn-full { width: 100%; margin-top: 4px; }

@media (max-width: 900px) { .main-row { grid-template-columns: 1fr; } }
</style>