<script setup>
import { ref } from 'vue';
// Reemplazamos el layout del admin por el navbar/sidebar del cliente
import layoutNavbarClient from '@/components/clientComponents/layoutNavbarClient.vue';

/* ── Nombre del Cliente / Usuario ─────────────────── */
const clienteNombre = ref('Restaurante El Olivo');
const usuarioNombre = ref('Carlos Mendoza');

/* ── Métricas clave para el cliente ───────────────── */
const stats = [
  { label: 'Próxima visita',   valor: 'Mañana',   sub: '09:30 AM · Sede Miraflores', icono: 'ti-calendar-event', color: 'blue'  },
  { label: 'Certificados',     valor: '12',       sub: 'Listos para descargar',      icono: 'ti-certificate',    color: 'green' },
  { label: 'Facturas pend.',   valor: 'S/ 450',   sub: '1 comprobante por pagar',    icono: 'ti-receipt-2',      color: 'amber' },
  { label: 'Locales activos',  valor: '3',        sub: 'Sedes en monitoreo',         icono: 'ti-building-store', color: 'purple'},
];

/* ── Próximas visitas y servicios en proceso ──────── */
const proximasVisitas = ref([
  { id: 101, local: 'Sede Miraflores', fecha: '22 Jul, 2026', hora: '09:30 AM', tipo: 'Desinsectación', tecnico: 'Luis Torres', estado: 'programada' },
  { id: 102, local: 'Almacén Central', fecha: '28 Jul, 2026', hora: '11:00 AM', tipo: 'Desratización',  tecnico: 'Ana Quispe',   estado: 'programada' },
  { id: 103, local: 'Sede San Isidro', fecha: '05 Ago, 2026', hora: '03:00 PM', tipo: 'Desinfección',   tecnico: 'Por asignar',  estado: 'programada' },
]);

/* ── Últimos certificados listos para descarga ────── */
const ultimosCertificados = ref([
  { id: 1, local: 'Sede Miraflores', servicio: 'Desinsectación', fecha: '15 Jul, 2026', vtoCertificado: '15 Ene, 2027', pdfUrl: '#' },
  { id: 2, local: 'Almacén Central', servicio: 'Desratización',  fecha: '10 Jun, 2026', vtoCertificado: '10 Dic, 2026', pdfUrl: '#' },
  { id: 3, local: 'Sede San Isidro', servicio: 'Desinfección',   fecha: '02 May, 2026', vtoCertificado: '02 Nov, 2026', pdfUrl: '#' },
]);

/* ── Facturas / Comprobantes del cliente ──────────── */
const facturasRecientes = ref([
  { id: 1, numero: 'F001-000452', fecha: '15 Jul', monto: 'S/ 450.00', estado: 'pendiente' },
  { id: 2, numero: 'F001-000380', fecha: '10 Jun', monto: 'S/ 380.00', estado: 'pagada' },
  { id: 3, numero: 'F001-000290', fecha: '02 May', monto: 'S/ 520.00', estado: 'pagada' },
]);

/* ── Helpers de estilo y etiquetas ────────────────── */
const estadoVisitaClass = (e) => ({
  en_proceso: 'badge--blue',
  programada: 'badge--gray',
  completada: 'badge--green',
}[e] || 'badge--gray');

const estadoVisitaLabel = (e) => ({
  en_proceso: 'Técnico en camino',
  programada: 'Programada',
  completada: 'Completada',
}[e] || e);

const estadoFacturaClass = (e) => ({
  pendiente: 'badge--amber',
  pagada:    'badge--green',
  vencida:   'badge--red',
}[e] || 'badge--gray');

const estadoFacturaLabel = (e) => ({
  pendiente: 'Pendiente',
  pagada:    'Pagada',
  vencida:   'Vencida',
}[e] || e);

const statBg = (c) => ({
  green: '#e8f5e9', blue: '#e3f2fd', amber: '#fff8e1', purple: '#f3e5f5'
}[c]);

const statColor = (c) => ({
  green: '#2e7d32', blue: '#1565c0', amber: '#e65100', purple: '#7b1fa2'
}[c]);
</script>

<template>
  <layoutNavbarClient>
    <main class="main-content">
      <div class="dashboard">

        <!-- Cabecera de bienvenida al cliente -->
        <div class="page-header">
          <div>
            <h1 class="page-title">¡Hola, {{ usuarioNombre }}! 👋</h1>
            <p class="page-sub">Bienvenido al portal de {{ clienteNombre }}</p>
          </div>
          <button class="btn-primary">
            <i class="ti ti-calendar-plus" aria-hidden="true"></i>
            Solicitar Servicio Extra
          </button>
        </div>

        <!-- Banner de aviso relevante (opcional/dinámico) -->
        <div class="alert-banner">
          <div class="alert-icon"><i class="ti ti-info-circle"></i></div>
          <div class="alert-body">
            <strong>Recordatorio de preparación para mañana:</strong> Para la desinsectación en <em>Sede Miraflores</em>, recuerde mantener los alimentos guardados y despejar las zonas perimetrales.
          </div>
        </div>

        <!-- ── Métricas rápidas ──────────────────────────────── -->
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

          <!-- Columna izquierda: Próximas visitas y certificados -->
          <div class="left-col">

            <!-- Próximos Servicios Programados -->
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <i class="ti ti-calendar" aria-hidden="true"></i>
                  Próximos servicios en sus sedes
                </div>
                <router-link to="/cliente/servicios" class="card-link">Ver historial</router-link>
              </div>

              <div class="table-wrap">
                <table class="tabla">
                  <thead>
                    <tr>
                      <th>Local / Sede</th>
                      <th>Fecha y Hora</th>
                      <th>Servicio</th>
                      <th>Técnico</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="v in proximasVisitas" :key="v.id">
                      <td>
                        <div class="cell-main">{{ v.local }}</div>
                      </td>
                      <td>
                        <div class="cell-hora">{{ v.fecha }}</div>
                        <div class="cell-sub">{{ v.hora }}</div>
                      </td>
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

            <!-- Certificados Oficiales Recientes -->
            <div class="card">
              <div class="card-header">
                <div class="card-title card-title--cert">
                  <i class="ti ti-certificate" aria-hidden="true"></i>
                  Certificados de fumigación / Sanidad
                </div>
                <router-link to="/cliente/certificados" class="card-link">Ver todos</router-link>
              </div>

              <div class="cert-list">
                <div v-for="c in ultimosCertificados" :key="c.id" class="cert-item">
                  <div class="cert-info">
                    <div class="cert-title-text">{{ c.servicio }} — {{ c.local }}</div>
                    <div class="cert-meta">
                      <span>Realizado: {{ c.fecha }}</span> · 
                      <span class="cert-vto">Vence: {{ c.vtoCertificado }}</span>
                    </div>
                  </div>
                  <a :href="c.pdfUrl" class="btn-download" title="Descargar Certificado PDF">
                    <i class="ti ti-file-download"></i>
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- Columna derecha: Facturación e información útil -->
          <div class="side-col">

            <!-- Estado de comprobantes / Facturas -->
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <i class="ti ti-receipt-2" aria-hidden="true"></i>
                  Comprobantes de pago
                </div>
                <router-link to="/cliente/facturas" class="card-link">Ver todos</router-link>
              </div>

              <div class="fact-list">
                <div v-for="f in facturasRecientes" :key="f.id" class="fact-item">
                  <div class="fact-info">
                    <div class="fact-num">{{ f.numero }}</div>
                    <div class="fact-meta">{{ f.fecha }} · {{ f.monto }}</div>
                  </div>
                  <span :class="['badge', estadoFacturaClass(f.estado)]">
                    {{ estadoFacturaLabel(f.estado) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Card de soporte o canal directo -->
            <div class="card support-card">
              <div class="support-content">
                <div class="support-icon">
                  <i class="ti ti-headset"></i>
                </div>
                <div>
                  <h4 class="support-title">¿Atención de emergencia o duda?</h4>
                  <p class="support-sub">Comuníquese directamente con su supervisor asignado.</p>
                  <a href="https://wa.me/" target="_blank" class="btn-whatsapp">
                    <i class="ti ti-brand-whatsapp"></i> Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  </layoutNavbarClient>
</template>

<style scoped>
/* ── Layout Contenedor Flexible ───────────────── */
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
  margin-bottom: 20px;
  gap: 16px;
}

.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
}

.page-sub {
  font-size: 13.5px;
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

/* ── Banner de Avisos ─────────────────────────── */
.alert-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 24px;
  color: #1e40af;
  font-size: 13px;
}

.alert-icon { font-size: 20px; color: #2563eb; display: flex; }

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
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 2px;
}

.stat-sub {
  font-size: 11.5px;
  color: #9ca3af;
}

/* ── Layout principal ─────────────────────────── */
.main-row {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: start;
}

.left-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.card-title .ti { color: #2563eb; font-size: 18px; }
.card-title--cert .ti { color: #059669; }

.card-link {
  font-size: 12.5px;
  color: var(--green);
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

.cell-main { font-weight: 600; color: #111827; }
.cell-sub  { font-size: 12px; color: #6b7280; margin-top: 2px; }
.cell-hora { font-weight: 600; color: #111827; white-space: nowrap; }

/* ── Certificados ─────────────────────────────── */
.cert-list { padding: 4px 0; }

.cert-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #f3f4f6;
  gap: 12px;
}

.cert-item:last-child { border-bottom: none; }

.cert-title-text {
  font-size: 13.5px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 3px;
}

.cert-meta {
  font-size: 12px;
  color: #6b7280;
}

.cert-vto {
  color: #059669;
  font-weight: 500;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s;
}

.btn-download:hover {
  background: #d1fae5;
}

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

/* ── Facturas ─────────────────────────────────── */
.fact-list { padding: 4px 0; }

.fact-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #f3f4f6;
  gap: 12px;
}

.fact-item:last-child { border-bottom: none; }

.fact-num {
  font-size: 13.5px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.fact-meta {
  font-size: 12px;
  color: #6b7280;
}

/* ── Card Soporte ─────────────────────────────── */
.support-card {
  padding: 20px;
  background: #f9fafb;
}

.support-content {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.support-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #e0e7ff;
  color: #4338ca;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.support-title {
  font-size: 13.5px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #111827;
}

.support-sub {
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 12px;
}

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #25d366;
  color: #fff;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  transition: background 0.15s;
}

.btn-whatsapp:hover { background: #1eb956; }

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