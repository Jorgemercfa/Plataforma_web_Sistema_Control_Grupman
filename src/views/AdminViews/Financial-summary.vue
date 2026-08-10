<script setup>
import { computed } from 'vue'
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue'

/* ── Datos mock (reemplazar por agregados reales de facturas/gastos) ── */
const meses = [
  { mes: 'Mar', ingresos: 4200, gastos: 2100 },
  { mes: 'Abr', ingresos: 4800, gastos: 2400 },
  { mes: 'May', ingresos: 5100, gastos: 2600 },
  { mes: 'Jun', ingresos: 4600, gastos: 2900 },
  { mes: 'Jul', ingresos: 5900, gastos: 3100 },
  { mes: 'Ago', ingresos: 3080, gastos: 1450 },
]

const movimientos = [
  { id: 1, tipo: 'ingreso', concepto: 'Factura — Restaurante El Olivo', monto: 480, fecha: '15 Jul' },
  { id: 2, tipo: 'gasto', concepto: 'Compra insumos — Química Andina', monto: 620, fecha: '16 Jul' },
  { id: 3, tipo: 'ingreso', concepto: 'Factura — Almacenes San Martín', monto: 620, fecha: '17 Jul' },
  { id: 4, tipo: 'gasto', concepto: 'Planilla técnicos — julio', monto: 1800, fecha: '31 Jul' },
  { id: 5, tipo: 'ingreso', concepto: 'Factura — Hotel Libertador', monto: 720, fecha: '19 Jul' },
]

const totalIngresos = computed(() => meses.reduce((s, m) => s + m.ingresos, 0))
const totalGastos = computed(() => meses.reduce((s, m) => s + m.gastos, 0))
const margen = computed(() => totalIngresos.value - totalGastos.value)
const maxValor = computed(() => Math.max(...meses.flatMap((m) => [m.ingresos, m.gastos])))

const stats = computed(() => [
  { label: 'Ingresos (6 meses)', valor: `S/ ${totalIngresos.value.toLocaleString('es-PE')}`, sub: 'Facturación total', icono: 'ti-trending-up', color: 'green' },
  { label: 'Gastos (6 meses)', valor: `S/ ${totalGastos.value.toLocaleString('es-PE')}`, sub: 'Compras + planilla', icono: 'ti-trending-down', color: 'red' },
  { label: 'Margen', valor: `S/ ${margen.value.toLocaleString('es-PE')}`, sub: 'Ingresos − gastos', icono: 'ti-report-money', color: 'blue' },
  { label: 'Cuentas por cobrar', valor: 'S/ 930', sub: '2 facturas pendientes', icono: 'ti-clock', color: 'amber' },
])

const statBg = (c) => ({ green: '#e8f5e9', blue: '#e3f2fd', amber: '#fff8e1', red: '#ffebee' }[c])
const statColor = (c) => ({ green: '#2e7d32', blue: '#1565c0', amber: '#e65100', red: '#c62828' }[c])
</script>

<template>
  <layoutNavbarAdmin>
    <div class="dashboard">

      <div class="page-header">
        <div>
          <h1 class="page-title">Resumen financiero</h1>
          <p class="page-sub">Ingresos, gastos y margen de los últimos 6 meses</p>
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
        <!-- Gráfico comparativo -->
        <div class="card card--wide">
          <div class="card-header">
            <div class="card-title"><i class="ti ti-chart-bar" aria-hidden="true"></i> Ingresos vs. gastos</div>
          </div>
          <div class="chart">
            <div v-for="m in meses" :key="m.mes" class="chart-col">
              <div class="chart-bars">
                <div class="bar bar--ingreso" :style="{ height: (m.ingresos / maxValor) * 100 + '%' }" :title="`Ingresos: S/ ${m.ingresos}`"></div>
                <div class="bar bar--gasto" :style="{ height: (m.gastos / maxValor) * 100 + '%' }" :title="`Gastos: S/ ${m.gastos}`"></div>
              </div>
              <span class="chart-label">{{ m.mes }}</span>
            </div>
          </div>
          <div class="chart-leyenda">
            <span><i class="dot dot--ingreso"></i> Ingresos</span>
            <span><i class="dot dot--gasto"></i> Gastos</span>
          </div>
        </div>

        <!-- Movimientos recientes -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="ti ti-list" aria-hidden="true"></i> Movimientos recientes</div>
          </div>
          <div class="mov-list">
            <div v-for="m in movimientos" :key="m.id" class="mov-item">
              <div class="mov-info">
                <div class="mov-concepto">{{ m.concepto }}</div>
                <div class="mov-fecha">{{ m.fecha }}</div>
              </div>
              <span :class="['mov-monto', m.tipo === 'ingreso' ? 'mov-monto--in' : 'mov-monto--out']">
                {{ m.tipo === 'ingreso' ? '+' : '−' }} S/ {{ m.monto }}
              </span>
            </div>
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

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
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

/* Gráfico de barras simple, sin librerías */
.chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  padding: 20px 20px 8px;
  gap: 10px;
}
.chart-col { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; height: 100%; }
.chart-bars { display: flex; align-items: flex-end; gap: 4px; height: 100%; width: 100%; justify-content: center; }
.bar { width: 14px; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.3s ease; }
.bar--ingreso { background: #42ae1a; }
.bar--gasto { background: #f59e0b; }
.chart-label { font-size: 11px; color: #9ca3af; font-weight: 600; }

.chart-leyenda { display: flex; gap: 20px; padding: 0 20px 18px; font-size: 12px; color: #6b7280; }
.chart-leyenda span { display: flex; align-items: center; gap: 6px; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dot--ingreso { background: #42ae1a; }
.dot--gasto { background: #f59e0b; }

.mov-list { padding: 4px 0; }
.mov-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-bottom: 1px solid #f3f4f6; gap: 10px; }
.mov-item:last-child { border-bottom: none; }
.mov-concepto { font-size: 13px; font-weight: 500; color: #111827; }
.mov-fecha { font-size: 11.5px; color: #9ca3af; margin-top: 2px; }
.mov-monto { font-size: 13px; font-weight: 700; white-space: nowrap; }
.mov-monto--in { color: #2e7d32; }
.mov-monto--out { color: #b91c1c; }

@media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 900px) { .main-row { grid-template-columns: 1fr; } }
</style>