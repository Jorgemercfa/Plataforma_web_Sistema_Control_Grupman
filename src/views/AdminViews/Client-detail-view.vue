<script setup>
import { ref, computed } from 'vue';
import layoutNavbarAdmin from '../../components/layoutNavbarAdmin.vue';

const clientes = ref([
  { id:1,  razonSocial:'Restaurante El Olivo',       ruc:'20512345678', contacto:'Mario Ríos',     telefono:'987 654 321', email:'mario@elolivo.pe',       locales:2, estado:'activo',    ultimaVisita:'18 Jul 2026' },
  { id:2,  razonSocial:'Almacenes San Martín S.A.',  ruc:'20487654321', contacto:'Carmen Salinas', telefono:'976 543 210', email:'carmen@sanmartin.pe',    locales:1, estado:'activo',    ultimaVisita:'15 Jul 2026' },
  { id:3,  razonSocial:'Clínica Santa Rosa',         ruc:'20456789012', contacto:'Dr. Juan Paz',   telefono:'965 432 109', email:'jpaz@clinicasrosa.pe',   locales:3, estado:'activo',    ultimaVisita:'12 Jul 2026' },
  { id:4,  razonSocial:'Hotel Libertador Lima',      ruc:'20398765432', contacto:'Andrea Vega',    telefono:'954 321 098', email:'avega@libertador.pe',    locales:1, estado:'activo',    ultimaVisita:'10 Jul 2026' },
  { id:5,  razonSocial:'Colegio Los Pinos',          ruc:'20367890123', contacto:'Luis Mendoza',   telefono:'943 210 987', email:'lmendoza@pinos.edu.pe',  locales:1, estado:'activo',    ultimaVisita:'08 Jul 2026' },
  { id:6,  razonSocial:'Banco Continental',          ruc:'20345678901', contacto:'Rosa Huanca',    telefono:'932 109 876', email:'rhuanca@banco.pe',       locales:4, estado:'activo',    ultimaVisita:'05 Jul 2026' },
  { id:7,  razonSocial:'Planta Industrial Perú',     ruc:'20312345678', contacto:'Héctor Flores',  telefono:'921 098 765', email:'hflores@pip.pe',         locales:2, estado:'activo',    ultimaVisita:'02 Jul 2026' },
  { id:8,  razonSocial:'Supermercado Viva',          ruc:'20298765432', contacto:'Patricia Ruiz',  telefono:'910 987 654', email:'pruiz@viva.pe',          locales:5, estado:'activo',    ultimaVisita:'28 Jun 2026' },
  { id:9,  razonSocial:'Municipalidad de Lima',      ruc:'20156789012', contacto:'Ing. Abel Cruz', telefono:'909 876 543', email:'acruz@munlima.gob.pe',   locales:2, estado:'pendiente', ultimaVisita:'—'           },
  { id:10, razonSocial:'Hotel Costa Verde',          ruc:'20167890123', contacto:'Sofía Paredes',  telefono:'898 765 432', email:'sparedes@costaverde.pe', locales:1, estado:'inactivo',  ultimaVisita:'10 Ene 2026' },
]);

const busqueda     = ref('');
const filtroEstado = ref('todos');

const clientesFiltrados = computed(() =>
  clientes.value.filter(c => {
    const q = busqueda.value.toLowerCase();
    const matchQ = c.razonSocial.toLowerCase().includes(q)
      || c.ruc.includes(q)
      || c.contacto.toLowerCase().includes(q);
    const matchE = filtroEstado.value === 'todos' || c.estado === filtroEstado.value;
    return matchQ && matchE;
  })
);

const badgeClass = e => ({ activo:'badge--green', inactivo:'badge--gray', pendiente:'badge--amber' }[e] || 'badge--gray');
const badgeLabel = e => ({ activo:'Activo', inactivo:'Inactivo', pendiente:'Pendiente' }[e] || e);

const totalActivos    = computed(() => clientes.value.filter(c => c.estado === 'activo').length);
const totalInactivos  = computed(() => clientes.value.filter(c => c.estado === 'inactivo').length);
const totalPendientes = computed(() => clientes.value.filter(c => c.estado === 'pendiente').length);
</script>

<template>
  <layoutNavbarAdmin>
    <div class="clientes-page">

      <div class="page-header">
        <div>
          <h1 class="page-title">Clientes</h1>
          <p class="page-sub">{{ clientes.length }} clientes registrados</p>
        </div>
        <button class="btn-primary">
          <i class="ti ti-plus" aria-hidden="true"></i>
          Nuevo cliente
        </button>
      </div>

      <div class="resumen-row">
        <div class="resumen-pill resumen-pill--green"><span class="resumen-num">{{ totalActivos }}</span> activos</div>
        <div class="resumen-pill resumen-pill--amber"><span class="resumen-num">{{ totalPendientes }}</span> pendientes</div>
        <div class="resumen-pill resumen-pill--gray"><span class="resumen-num">{{ totalInactivos }}</span> inactivos</div>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <i class="ti ti-search search-icon" aria-hidden="true"></i>
          <input v-model="busqueda" class="search-input" type="text" placeholder="Buscar por nombre, RUC o contacto…" />
        </div>
        <div class="filtros">
          <button
            v-for="f in ['todos','activo','pendiente','inactivo']"
            :key="f"
            class="filtro-btn"
            :class="{ 'filtro-btn--active': filtroEstado === f }"
            @click="filtroEstado = f"
          >{{ f.charAt(0).toUpperCase() + f.slice(1) }}</button>
        </div>
      </div>

      <div class="card">
        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Razón social</th>
                <th>RUC</th>
                <th>Contacto</th>
                <th>Locales</th>
                <th>Última visita</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="clientesFiltrados.length === 0">
                <td colspan="7" class="empty-row">
                  <i class="ti ti-building-off" aria-hidden="true"></i>
                  <span>Sin resultados para "{{ busqueda }}"</span>
                </td>
              </tr>
              <tr v-for="c in clientesFiltrados" :key="c.id" class="tabla-row">
                <td>
                  <div class="cliente-nombre">{{ c.razonSocial }}</div>
                  <div class="cliente-email">{{ c.email }}</div>
                </td>
                <td class="ruc">{{ c.ruc }}</td>
                <td>
                  <div class="contacto-nombre">{{ c.contacto }}</div>
                  <div class="contacto-tel">{{ c.telefono }}</div>
                </td>
                <td class="centrado"><span class="locales-badge">{{ c.locales }}</span></td>
                <td class="fecha">{{ c.ultimaVisita }}</td>
                <td><span :class="['badge', badgeClass(c.estado)]">{{ badgeLabel(c.estado) }}</span></td>
                <td class="acciones">
                  <router-link :to="`/admin/clientes/${c.id}`" class="btn-ver">
                    <i class="ti ti-eye" aria-hidden="true"></i> Ver
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </layoutNavbarAdmin>
</template>

<style scoped>
.clientes-page { font-family:'Inter','Segoe UI',sans-serif; color:#111827; }

.page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; gap:16px; }
.page-title  { font-size:22px; font-weight:700; margin:0 0 4px; color:#111827; }
.page-sub    { font-size:13px; color:#6b7280; margin:0; }

.btn-primary { display:flex; align-items:center; gap:8px; background:#42ae1a; color:#fff; border:none; border-radius:8px; padding:10px 18px; font-size:13.5px; font-weight:600; cursor:pointer; white-space:nowrap; transition:background .15s; }
.btn-primary:hover { background:#379614; }

.resumen-row { display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap; }
.resumen-pill { display:flex; align-items:center; gap:6px; padding:6px 14px; border-radius:100px; font-size:13px; font-weight:500; }
.resumen-num  { font-weight:700; font-size:15px; }
.resumen-pill--green { background:#e8f5e9; color:#2e7d32; }
.resumen-pill--amber { background:#fff8e1; color:#92400e; }
.resumen-pill--gray  { background:#f3f4f6; color:#4b5563; }

.toolbar { display:flex; gap:12px; margin-bottom:16px; flex-wrap:wrap; align-items:center; }
.search-wrap { position:relative; flex:1; min-width:220px; }
.search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#9ca3af; font-size:16px; pointer-events:none; }
.search-input { width:100%; padding:9px 12px 9px 36px; border:1px solid #e5e7eb; border-radius:8px; font-size:13.5px; color:#111827; background:#fff; outline:none; box-sizing:border-box; transition:border-color .15s; }
.search-input:focus { border-color:#42ae1a; }
.search-input::placeholder { color:#9ca3af; }

.filtros { display:flex; gap:6px; flex-wrap:wrap; }
.filtro-btn { padding:7px 14px; border:1px solid #e5e7eb; border-radius:8px; font-size:13px; background:#fff; color:#374151; cursor:pointer; transition:all .15s; }
.filtro-btn:hover { border-color:#42ae1a; color:#42ae1a; }
.filtro-btn--active { background:#42ae1a; border-color:#42ae1a; color:#fff; font-weight:600; }

.card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; }
.table-wrap { overflow-x:auto; }
.tabla { width:100%; border-collapse:collapse; font-size:13.5px; }
.tabla thead th { padding:10px 16px; text-align:left; font-size:11.5px; font-weight:600; color:#6b7280; text-transform:uppercase; letter-spacing:.04em; background:#f9fafb; border-bottom:1px solid #e5e7eb; white-space:nowrap; }
.tabla-row { border-bottom:1px solid #f3f4f6; transition:background .1s; }
.tabla-row:last-child { border-bottom:none; }
.tabla-row:hover { background:#f9fafb; }
.tabla td { padding:12px 16px; vertical-align:middle; }

.cliente-nombre  { font-weight:600; color:#111827; }
.cliente-email   { font-size:12px; color:#9ca3af; margin-top:2px; }
.ruc             { font-size:13px; color:#374151; white-space:nowrap; font-family:monospace; }
.contacto-nombre { font-weight:500; color:#374151; }
.contacto-tel    { font-size:12px; color:#9ca3af; margin-top:2px; }
.centrado        { text-align:center; }
.fecha           { font-size:13px; color:#6b7280; white-space:nowrap; }

.locales-badge { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#e8f5e9; color:#2e7d32; font-size:12px; font-weight:700; }

.badge { display:inline-block; padding:3px 10px; border-radius:100px; font-size:12px; font-weight:600; white-space:nowrap; }
.badge--green { background:#e8f5e9; color:#2e7d32; }
.badge--gray  { background:#f3f4f6; color:#4b5563; }
.badge--amber { background:#fff8e1; color:#92400e; }

.acciones { text-align:right; }
.btn-ver { display:inline-flex; align-items:center; gap:5px; padding:6px 12px; border:1px solid #e5e7eb; border-radius:7px; font-size:12.5px; font-weight:500; color:#374151; text-decoration:none; transition:all .15s; }
.btn-ver:hover { border-color:#42ae1a; color:#42ae1a; background:#f0fdf0; }

.empty-row { text-align:center; padding:48px 16px !important; color:#9ca3af; }
.empty-row i { font-size:32px; display:block; margin-bottom:8px; }

@media (max-width:768px) {
  .toolbar { flex-direction:column; align-items:stretch; }
  .page-header { flex-direction:column; }
  .tabla thead th:nth-child(2),.tabla td:nth-child(2),
  .tabla thead th:nth-child(5),.tabla td:nth-child(5) { display:none; }
}
</style>