<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

/* ── Cliente mock (luego vendrá de Firestore por route.params.id) ── */
const cliente = ref({
  id: route.params.id,
  razonSocial: 'Restaurante El Olivo',
  ruc: '20512345678',
  direccionFiscal: 'Av. Benavides 1230, Miraflores, Lima',
  contactoNombre: 'Mario Ríos',
  contactoTelefono: '987 654 321',
  contactoEmail: 'mario@elolivo.pe',
  estado: 'activo',
  fechaRegistro: '12 Mar 2025',
});

const locales = ref([
  { id:1, nombre:'Sede Miraflores', direccion:'Av. Benavides 1230, Miraflores', distrito:'Miraflores', areaM2:320, giro:'Restaurante', estaciones:8, ultimaVisita:'18 Jul 2026', estado:'activo' },
  { id:2, nombre:'Sede San Isidro', direccion:'Calle Las Flores 456, San Isidro', distrito:'San Isidro', areaM2:180, giro:'Restaurante', estaciones:5, ultimaVisita:'02 Jun 2026', estado:'activo' },
]);

const historialVisitas = ref([
  { id:1, fecha:'18 Jul 2026', local:'Sede Miraflores', tipo:'Desinsectación', tecnico:'Luis Torres',   estado:'completada', certificado:true  },
  { id:2, fecha:'18 Jun 2026', local:'Sede Miraflores', tipo:'Desratización',  tecnico:'Ana Quispe',    estado:'completada', certificado:true  },
  { id:3, fecha:'18 May 2026', local:'Sede San Isidro', tipo:'Desinfección',   tecnico:'Pedro Cáceres', estado:'completada', certificado:true  },
  { id:4, fecha:'18 Abr 2026', local:'Sede Miraflores', tipo:'Desinsectación', tecnico:'Luis Torres',   estado:'completada', certificado:true  },
  { id:5, fecha:'25 Mar 2026', local:'Sede San Isidro', tipo:'Desratización',  tecnico:'Ana Quispe',    estado:'completada', certificado:false },
]);

const tabActiva = ref('locales');

const badgeEstado = e => ({ completada:'badge--green', en_proceso:'badge--blue', programada:'badge--gray' }[e] || 'badge--gray');
const labelEstado = e => ({ completada:'Completada', en_proceso:'En proceso', programada:'Programada' }[e] || e);
</script>

<template>
  <div class="detalle-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/admin/clientes" class="breadcrumb-link">
        <i class="ti ti-arrow-left" aria-hidden="true"></i> Clientes
      </router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-actual">{{ cliente.razonSocial }}</span>
    </div>

    <!-- Cabecera -->
    <div class="page-header">
      <div class="header-left">
        <div class="cliente-avatar">
          {{ cliente.razonSocial.charAt(0) }}
        </div>
        <div>
          <h1 class="page-title">{{ cliente.razonSocial }}</h1>
          <div class="header-meta">
            <span class="ruc-tag">RUC {{ cliente.ruc }}</span>
            <span class="badge badge--green">Activo</span>
            <span class="fecha-reg">Desde {{ cliente.fechaRegistro }}</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn-secondary">
          <i class="ti ti-edit" aria-hidden="true"></i> Editar
        </button>
        <button class="btn-primary">
          <i class="ti ti-calendar-plus" aria-hidden="true"></i> Nueva visita
        </button>
      </div>
    </div>

    <!-- Métricas rápidas -->
    <div class="mini-stats">
      <div class="mini-stat">
        <div class="mini-stat-val">{{ locales.length }}</div>
        <div class="mini-stat-label">Locales</div>
      </div>
      <div class="mini-stat">
        <div class="mini-stat-val">{{ historialVisitas.length }}</div>
        <div class="mini-stat-label">Visitas totales</div>
      </div>
      <div class="mini-stat">
        <div class="mini-stat-val">{{ historialVisitas.filter(v => v.certificado).length }}</div>
        <div class="mini-stat-label">Certificados emitidos</div>
      </div>
      <div class="mini-stat">
        <div class="mini-stat-val">S/ 8,400</div>
        <div class="mini-stat-label">Facturado total</div>
      </div>
    </div>

    <!-- Layout dos columnas -->
    <div class="detail-layout">

      <!-- Columna izquierda — datos -->
      <div class="side-info">
        <div class="info-card">
          <div class="info-card-title">
            <i class="ti ti-building" aria-hidden="true"></i> Datos del cliente
          </div>
          <div class="info-row">
            <span class="info-label">Dirección fiscal</span>
            <span class="info-val">{{ cliente.direccionFiscal }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Contacto</span>
            <span class="info-val">{{ cliente.contactoNombre }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Teléfono</span>
            <span class="info-val">{{ cliente.contactoTelefono }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-val">{{ cliente.contactoEmail }}</span>
          </div>
        </div>

        <div class="info-card">
          <div class="info-card-title">
            <i class="ti ti-file-invoice" aria-hidden="true"></i> Cotizaciones
          </div>
          <div class="cot-mini">
            <div class="cot-mini-item">
              <span class="cot-mini-label">Mensual — Desinsectación</span>
              <span class="cot-mini-monto">S/ 1,400</span>
            </div>
            <div class="cot-mini-item">
              <span class="cot-mini-label">Mensual — Desratización</span>
              <span class="cot-mini-monto">S/ 900</span>
            </div>
          </div>
          <button class="btn-link">
            <i class="ti ti-plus" aria-hidden="true"></i> Nueva cotización
          </button>
        </div>
      </div>

      <!-- Columna derecha — tabs -->
      <div class="main-content">
        <div class="tabs">
          <button
            class="tab"
            :class="{ 'tab--active': tabActiva === 'locales' }"
            @click="tabActiva = 'locales'"
          >
            <i class="ti ti-map-pin" aria-hidden="true"></i>
            Locales ({{ locales.length }})
          </button>
          <button
            class="tab"
            :class="{ 'tab--active': tabActiva === 'historial' }"
            @click="tabActiva = 'historial'"
          >
            <i class="ti ti-history" aria-hidden="true"></i>
            Historial de visitas
          </button>
        </div>

        <!-- Tab: locales -->
        <div v-if="tabActiva === 'locales'" class="tab-content">
          <div class="locales-header">
            <span class="locales-count">{{ locales.length }} locales registrados</span>
            <button class="btn-sm-primary">
              <i class="ti ti-plus" aria-hidden="true"></i> Agregar local
            </button>
          </div>
          <div class="locales-grid">
            <div v-for="l in locales" :key="l.id" class="local-card">
              <div class="local-card-header">
                <div class="local-nombre">{{ l.nombre }}</div>
                <span class="badge badge--green">{{ l.estado }}</span>
              </div>
              <div class="local-info-row">
                <i class="ti ti-map-pin" aria-hidden="true"></i>
                {{ l.direccion }}
              </div>
              <div class="local-chips">
                <span class="chip">{{ l.giro }}</span>
                <span class="chip">{{ l.areaM2 }} m²</span>
                <span class="chip">{{ l.estaciones }} estaciones</span>
              </div>
              <div class="local-footer">
                <span class="local-ultima">Última visita: {{ l.ultimaVisita }}</span>
                <router-link
                  :to="`/admin/clientes/${cliente.id}/local/${l.id}`"
                  class="btn-ver-local"
                >
                  Ver local <i class="ti ti-arrow-right" aria-hidden="true"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: historial -->
        <div v-if="tabActiva === 'historial'" class="tab-content">
          <div class="card">
            <table class="tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Local</th>
                  <th>Tipo de servicio</th>
                  <th>Técnico</th>
                  <th>Estado</th>
                  <th>Cert.</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v in historialVisitas" :key="v.id" class="tabla-row">
                  <td class="fecha">{{ v.fecha }}</td>
                  <td>{{ v.local }}</td>
                  <td>{{ v.tipo }}</td>
                  <td>{{ v.tecnico }}</td>
                  <td><span :class="['badge', badgeEstado(v.estado)]">{{ labelEstado(v.estado) }}</span></td>
                  <td class="centrado">
                    <button v-if="v.certificado" class="btn-cert" title="Descargar certificado">
                      <i class="ti ti-download" aria-hidden="true"></i>
                    </button>
                    <span v-else class="no-cert">—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.detalle-page { font-family:'Inter','Segoe UI',sans-serif; color:#111827; }

/* Breadcrumb */
.breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:20px; font-size:13px; }
.breadcrumb-link { display:flex; align-items:center; gap:5px; color:#42ae1a; text-decoration:none; font-weight:500; }
.breadcrumb-link:hover { text-decoration:underline; }
.breadcrumb-sep  { color:#d1d5db; }
.breadcrumb-actual { color:#6b7280; }

/* Cabecera */
.page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; gap:16px; flex-wrap:wrap; }
.header-left { display:flex; align-items:center; gap:16px; }
.cliente-avatar { width:52px; height:52px; border-radius:12px; background:#42ae1a; color:#fff; font-size:22px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.page-title  { font-size:20px; font-weight:700; margin:0 0 6px; color:#111827; }
.header-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.ruc-tag     { font-size:12px; color:#6b7280; font-family:monospace; background:#f3f4f6; padding:3px 8px; border-radius:5px; }
.fecha-reg   { font-size:12px; color:#9ca3af; }

.header-actions { display:flex; gap:10px; flex-shrink:0; }
.btn-primary  { display:flex; align-items:center; gap:7px; background:#42ae1a; color:#fff; border:none; border-radius:8px; padding:9px 16px; font-size:13px; font-weight:600; cursor:pointer; transition:background .15s; }
.btn-primary:hover { background:#379614; }
.btn-secondary { display:flex; align-items:center; gap:7px; background:#fff; color:#374151; border:1px solid #e5e7eb; border-radius:8px; padding:9px 16px; font-size:13px; font-weight:500; cursor:pointer; transition:all .15s; }
.btn-secondary:hover { border-color:#42ae1a; color:#42ae1a; }

/* Mini stats */
.mini-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:24px; }
.mini-stat { background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:16px; text-align:center; }
.mini-stat-val   { font-size:22px; font-weight:700; color:#111827; }
.mini-stat-label { font-size:12px; color:#6b7280; margin-top:4px; }

/* Layout */
.detail-layout { display:grid; grid-template-columns:280px 1fr; gap:20px; align-items:start; }

/* Info cards */
.side-info { display:flex; flex-direction:column; gap:16px; }
.info-card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:18px; }
.info-card-title { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:#111827; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #f3f4f6; }
.info-card-title .ti { color:#42ae1a; }
.info-row { display:flex; flex-direction:column; gap:2px; margin-bottom:12px; }
.info-row:last-child { margin-bottom:0; }
.info-label { font-size:11px; color:#9ca3af; text-transform:uppercase; letter-spacing:.04em; font-weight:600; }
.info-val   { font-size:13.5px; color:#374151; }

.cot-mini { display:flex; flex-direction:column; gap:8px; margin-bottom:12px; }
.cot-mini-item { display:flex; justify-content:space-between; align-items:center; }
.cot-mini-label { font-size:13px; color:#374151; }
.cot-mini-monto { font-size:13px; font-weight:700; color:#42ae1a; }
.btn-link { display:flex; align-items:center; gap:5px; background:none; border:none; color:#42ae1a; font-size:13px; font-weight:500; cursor:pointer; padding:0; }
.btn-link:hover { text-decoration:underline; }

/* Tabs */
.main-content { min-width:0; }
.tabs { display:flex; gap:4px; border-bottom:1px solid #e5e7eb; margin-bottom:16px; }
.tab { display:flex; align-items:center; gap:7px; background:none; border:none; border-bottom:2px solid transparent; padding:10px 16px; font-size:13.5px; color:#6b7280; cursor:pointer; margin-bottom:-1px; transition:all .15s; }
.tab:hover { color:#374151; }
.tab--active { color:#42ae1a; border-bottom-color:#42ae1a; font-weight:600; }
.tab .ti { font-size:15px; }
.tab-content { }

/* Locales */
.locales-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
.locales-count  { font-size:13px; color:#6b7280; }
.btn-sm-primary { display:flex; align-items:center; gap:6px; background:#42ae1a; color:#fff; border:none; border-radius:7px; padding:7px 14px; font-size:12.5px; font-weight:600; cursor:pointer; }

.locales-grid { display:grid; gap:14px; }
.local-card { background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:16px; }
.local-card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
.local-nombre { font-size:14px; font-weight:600; color:#111827; }
.local-info-row { display:flex; align-items:center; gap:7px; font-size:13px; color:#6b7280; margin-bottom:10px; }
.local-info-row .ti { color:#9ca3af; font-size:14px; }
.local-chips { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
.chip { background:#f3f4f6; color:#4b5563; font-size:12px; padding:3px 9px; border-radius:100px; font-weight:500; }
.local-footer { display:flex; align-items:center; justify-content:space-between; }
.local-ultima { font-size:12px; color:#9ca3af; }
.btn-ver-local { display:flex; align-items:center; gap:5px; font-size:12.5px; color:#42ae1a; font-weight:500; text-decoration:none; }
.btn-ver-local:hover { text-decoration:underline; }

/* Historial tabla */
.card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; }
.tabla { width:100%; border-collapse:collapse; font-size:13.5px; }
.tabla thead th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#6b7280; text-transform:uppercase; letter-spacing:.04em; background:#f9fafb; border-bottom:1px solid #e5e7eb; white-space:nowrap; }
.tabla-row { border-bottom:1px solid #f3f4f6; transition:background .1s; }
.tabla-row:last-child { border-bottom:none; }
.tabla-row:hover { background:#f9fafb; }
.tabla td { padding:11px 14px; vertical-align:middle; color:#374151; }
.fecha   { white-space:nowrap; color:#6b7280; font-size:13px; }
.centrado { text-align:center; }

.badge { display:inline-block; padding:3px 10px; border-radius:100px; font-size:12px; font-weight:600; white-space:nowrap; }
.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--blue  { background:#e3f2fd; color:#1565c0; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }

.btn-cert { background:none; border:none; color:#42ae1a; font-size:16px; cursor:pointer; padding:4px; border-radius:5px; transition:background .15s; }
.btn-cert:hover { background:#e8f5e9; }
.no-cert { color:#d1d5db; }

@media (max-width:1024px) {
  .detail-layout { grid-template-columns:1fr; }
  .mini-stats { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:600px) {
  .header-left { flex-direction:column; align-items:flex-start; }
  .mini-stats  { grid-template-columns:repeat(2,1fr); }
  .page-header { flex-direction:column; }
}
</style>