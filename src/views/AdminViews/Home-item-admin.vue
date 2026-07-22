<script setup>
import { ref } from 'vue';
// Importamos la barra lateral desde components
import layoutNavbarAdmin from '../../components/layoutNavbarAdmin.vue';

/* ── Métricas mock ────────────────────────────────── */
const stats = [
  { label: 'Visitas hoy',        valor: 6,  sub: '2 en proceso',     icono: 'ti-calendar',      color: 'green'  },
  { label: 'Clientes activos',   valor: 48, sub: '3 nuevos este mes', icono: 'ti-building',      color: 'blue'   },
  { label: 'Cotizaciones pend.', valor: 5,  sub: 'Sin respuesta',      icono: 'ti-file-invoice',  color: 'amber'  },
  { label: 'Productos bajo mín.',valor: 3,  sub: 'Revisar inventario', icono: 'ti-package',       color: 'red'    },
];

/* ── Visitas del día mock ─────────────────────────── */
const visitasHoy = ref([
  { id:1, cliente:'Restaurante El Olivo',    local:'Sede Miraflores', hora:'08:30', tipo:'Desinsectación',  tecnico:'Luis Torres',   estado:'completada'  },
  { id:2, cliente:'Almacenes San Martín',    local:'Almacén Central', hora:'10:00', tipo:'Desratización',   tecnico:'Ana Quispe',    estado:'en_proceso'  },
  { id:3, cliente:'Clínica Santa Rosa',      local:'Piso 3',          hora:'11:30', tipo:'Desinfección',    tecnico:'Pedro Cáceres', estado:'en_proceso'  },
  { id:4, cliente:'Hotel Libertador',        local:'Cocina',          hora:'13:00', tipo:'Desinsectación',  tecnico:'Luis Torres',   estado:'programada'  },
  { id:5, cliente:'Colegio Los Pinos',       local:'Comedor',         hora:'15:00', tipo:'Desratización',   tecnico:'Ana Quispe',    estado:'programada'  },
  { id:6, cliente:'Banco Continental',       local:'Sede San Isidro', hora:'16:30', tipo:'Desinfección',    tecnico:'Pedro Cáceres', estado:'programada'  },
]);

/* ── Cotizaciones recientes mock ──────────────────── */
const cotizaciones = ref([
  { id:1, cliente:'Planta Industrial Perú',  monto:'S/ 2,400', fecha:'18 Jul', estado:'pendiente'  },
  { id:2, cliente:'Supermercado Viva',       monto:'S/ 1,800', fecha:'17 Jul', estado:'aceptada'   },
  { id:3, cliente:'Hotel Costa Verde',       monto:'S/ 3,100', fecha:'16 Jul', estado:'rechazada'  },
  { id:4, cliente:'Municipalidad de Lima',   monto:'S/ 5,600', fecha:'15 Jul', estado:'pendiente'  },
]);

/* ── Alertas de stock mock ────────────────────────── */
const stockBajo = ref([
  { producto:'Cipermetrina 25% EC',  stock:2,  minimo:5,  unidad:'l'  },
  { producto:'Rodenticida brodif.',  stock:3,  minimo:10, unidad:'kg' },
  { producto:'Hipoclorito sodio',    stock:1,  minimo:4,  unidad:'l'  },
]);

/* ── Helpers de estilo ────────────────────────────── */
const estadoVisitaClass = (e) => ({
  completada:  'badge--green',
  en_proceso:  'badge--blue',
  programada:  'badge--gray',
}[e] || 'badge--gray');

const estadoVisitaLabel = (e) => ({
  completada:  'Completada',
  en_proceso:  'En proceso',
  programada:  'Programada',
}[e] || e);

const estadoCotClass = (e) => ({
  pendiente:  'badge--amber',
  aceptada:   'badge--green',
  rechazada:  'badge--red',
}[e] || 'badge--gray');

const estadoCotLabel = (e) => ({
  pendiente:  'Pendiente',
  aceptada:   'Aceptada',
  rechazada:  'Rechazada',
}[e] || e);

const statBg = (c) => ({
  green: '#e8f5e9', blue: '#e3f2fd', amber: '#fff8e1', red: '#ffebee'
}[c]);

const statColor = (c) => ({
  green: '#2e7d32', blue: '#1565c0', amber: '#e65100', red: '#c62828'
}[c]);
</script>

<template>
  <div class="admin-layout">
    <!-- Componente Menú Lateral -->
    <layoutNavbarAdmin />

    <!-- Contenido Principal -->
    <main class="main-content">
      <div class="dashboard">

        <!-- Cabecera de página -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Dashboard</h1>
            <p class="page-sub">Lunes, 21 de julio de 2026</p>
          </div>
          <button class="btn-primary">
            <i class="ti ti-plus" aria-hidden="true"></i>
            Nueva visita
          </button>
        </div>

        <!-- ── Métricas ──────────────────────────────── -->
        <div class="stats-grid">
          <div
            v-for="s in stats"
            :key="s.label"
            class="stat-card"
          >
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

          <!-- Visitas del día -->
          <div class="card card--wide">
            <div class="card-header">
              <div class="card-title">
                <i class="ti ti-calendar-event" aria-hidden="true"></i>
                Visitas de hoy
              </div>
              <router-link to="/admin/visitas" class="card-link">Ver todas</router-link>
            </div>

            <div class="table-wrap">
              <table class="tabla">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Hora</th>
                    <th>Tipo</th>
                    <th>Técnico</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="v in visitasHoy" :key="v.id">
                    <td>
                      <div class="cell-main">{{ v.cliente }}</div>
                      <div class="cell-sub">{{ v.local }}</div>
                    </td>
                    <td class="cell-hora">{{ v.hora }}</td>
                    <td>{{ v.tipo }}</td>
                    <td>{{ v.tecnico }}</td>
                    <td>
                      <span :class="['badge', estadoVisitaClass(v.estado)]">
                        {{ estadoVisitaLabel(v.estado) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Columna derecha -->
          <div class="side-col">

            <!-- Cotizaciones recientes -->
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <i class="ti ti-file-invoice" aria-hidden="true"></i>
                  Cotizaciones recientes
                </div>
                <router-link to="/admin/cotizaciones" class="card-link">Ver todas</router-link>
              </div>
              <div class="cot-list">
                <div v-for="c in cotizaciones" :key="c.id" class="cot-item">
                  <div class="cot-info">
                    <div class="cot-cliente">{{ c.cliente }}</div>
                    <div class="cot-meta">{{ c.fecha }} · {{ c.monto }}</div>
                  </div>
                  <span :class="['badge', estadoCotClass(c.estado)]">
                    {{ estadoCotLabel(c.estado) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Alertas de stock -->
            <div class="card">
              <div class="card-header">
                <div class="card-title card-title--alert">
                  <i class="ti ti-alert-triangle" aria-hidden="true"></i>
                  Stock bajo mínimo
                </div>
                <router-link to="/admin/inventario" class="card-link">Inventario</router-link>
              </div>
              <div class="stock-list">
                <div v-for="s in stockBajo" :key="s.producto" class="stock-item">
                  <div class="stock-nombre">{{ s.producto }}</div>
                  <div class="stock-detalle">
                    <div class="stock-bar-wrap">
                      <div
                        class="stock-bar"
                        :style="{ width: Math.min((s.stock / s.minimo) * 100, 100) + '%' }"
                      ></div>
                    </div>
                    <span class="stock-num">{{ s.stock }}/{{ s.minimo }} {{ s.unidad }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
/* ── Layout Contenedor Flexible ───────────────── */
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

/* ── Tokens locales ───────────────────────────── */
.dashboard {
  --green:   #42ae1a;
  --green-s: #e8f5e9;
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

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}

.btn-primary:hover { background: #379614; }

/* ── Stats ────────────────────────────────────── */
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

.stat-valor {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  line-height: 1;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 2px;
}

.stat-sub {
  font-size: 12px;
  color: #9ca3af;
}

/* ── Layout principal ─────────────────────────── */
.main-row {
  display: grid;
  grid-template-columns: 1fr 360px;
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

.card-title--alert .ti { color: #d97706; }

.card-link {
  font-size: 12.5px;
  color: #42ae1a;
  font-weight: 500;
  text-decoration: none;
}
.card-link:hover { text-decoration: underline; }

/* ── Tabla visitas ────────────────────────────── */
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

.tabla tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.1s;
}

.tabla tbody tr:last-child { border-bottom: none; }
.tabla tbody tr:hover { background: #f9fafb; }

.tabla td {
  padding: 12px 16px;
  color: #374151;
  vertical-align: middle;
}

.cell-main { font-weight: 500; color: #111827; }
.cell-sub  { font-size: 12px; color: #9ca3af; margin-top: 2px; }
.cell-hora { font-weight: 600; color: #111827; white-space: nowrap; }

/* ── Badges ───────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--blue  { background:#e3f2fd; color:#1565c0; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }
.badge--amber { background:#fff8e1; color:#92400e; }
.badge--red   { background:#ffebee; color:#b91c1c; }

/* ── Cotizaciones ─────────────────────────────── */
.cot-list { padding: 4px 0; }

.cot-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #f3f4f6;
  gap: 12px;
}

.cot-item:last-child { border-bottom: none; }

.cot-cliente {
  font-size: 13.5px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 2px;
}

.cot-meta {
  font-size: 12px;
  color: #9ca3af;
}

/* ── Stock ────────────────────────────────────── */
.stock-list { padding: 4px 0; }

.stock-item {
  padding: 12px 20px;
  border-bottom: 1px solid #f3f4f6;
}

.stock-item:last-child { border-bottom: none; }

.stock-nombre {
  font-size: 13px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stock-detalle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stock-bar-wrap {
  flex: 1;
  height: 6px;
  background: #fee2e2;
  border-radius: 100px;
  overflow: hidden;
}

.stock-bar {
  height: 100%;
  background: #ef4444;
  border-radius: 100px;
  transition: width 0.3s;
}

.stock-num {
  font-size: 12px;
  color: #b91c1c;
  font-weight: 600;
  white-space: nowrap;
}

/* ── Columna lateral ──────────────────────────── */
.side-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Responsive ───────────────────────────────── */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .main-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .page-header { flex-direction: column; }
  .main-content { padding: 16px; }
}
</style>