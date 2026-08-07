<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import layoutNavbarOperator from '../../components/operatorComponets/layoutNavbarOperator.vue';

const route  = useRoute();
const router = useRouter();

/* ── Visita mock ──────────────────────────────────── */
const visita = ref({
  id: route.params.id,
  estado: 'programada',
  cliente: 'Almacenes San Martín',
  local: 'Almacén Central',
  direccion: 'Jr. Huánuco 456, La Victoria, Lima',
  coordenadas: { lat: -12.0653, lng: -77.0282 },
  hora: '10:00',
  fecha: '21 Jul 2026',
  tipo: 'Desratización',
  contactoNombre: 'Carmen Salinas',
  contactoTelefono: '976 543 210',
  instrucciones: 'Revisar especialmente el área de carga y descarga. El cliente reportó avistamiento de roedores en la esquina NE del almacén la semana pasada.',
  estaciones: [
    { id: 1, codigo: 'EST-001', tipo: 'Cebadero',      ubicacion: 'Entrada principal',    revisada: false },
    { id: 2, codigo: 'EST-002', tipo: 'Cebadero',      ubicacion: 'Zona de carga',         revisada: false },
    { id: 3, codigo: 'EST-003', tipo: 'Trampa pegante', ubicacion: 'Esquina NE',            revisada: false },
    { id: 4, codigo: 'EST-004', tipo: 'Cebadero',      ubicacion: 'Pasillo central',       revisada: false },
    { id: 5, codigo: 'EST-005', tipo: 'Trampa pegante', ubicacion: 'Área de oficinas',      revisada: false },
  ],
});

const iniciando = ref(false);

const iniciarVisita = () => {
  iniciando.value = true;
  visita.value.estado = 'en_proceso';
  setTimeout(() => {
    iniciando.value = false;
  }, 800);
};

const irAFormulario = () => {
  router.push(`/tecnico/visita/${visita.value.id}/formulario`);
};

const abrirMapa = () => {
  const { lat, lng } = visita.value.coordenadas;
  window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
};

const tipoIcon = {
  'Desinsectación': '🦟',
  'Desratización':  '🐀',
  'Desinfección':   '💧',
};

const estadoConfig = {
  programada: { class: 'badge--gray',  label: 'Programada'  },
  en_proceso: { class: 'badge--blue',  label: 'En proceso'  },
  completada: { class: 'badge--green', label: 'Completada'  },
};
</script>

<template>
  <layoutNavbarOperator>
    <div class="visita-detail">

      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/tecnico/mis-visitas" class="back-btn">
          <i class="ti ti-arrow-left" aria-hidden="true"></i> Mis visitas
        </router-link>
      </div>

      <!-- Hero de visita -->
      <div class="visita-hero">
        <div class="hero-top">
          <div class="tipo-pill">
            <span>{{ tipoIcon[visita.tipo] || '🔧' }}</span>
            {{ visita.tipo }}
          </div>
          <span :class="['badge', estadoConfig[visita.estado]?.class]">
            {{ estadoConfig[visita.estado]?.label }}
          </span>
        </div>
        <h1 class="hero-cliente">{{ visita.cliente }}</h1>
        <div class="hero-local">{{ visita.local }}</div>
        <div class="hero-datetime">
          <span><i class="ti ti-clock" aria-hidden="true"></i> {{ visita.hora }}</span>
          <span><i class="ti ti-calendar" aria-hidden="true"></i> {{ visita.fecha }}</span>
        </div>
      </div>

      <!-- Dirección -->
      <div class="info-card">
        <div class="info-card-title">
          <i class="ti ti-map-pin" aria-hidden="true"></i> Dirección
        </div>
        <div class="direccion-row">
          <span class="direccion-text">{{ visita.direccion }}</span>
          <button class="btn-mapa" @click="abrirMapa">
            <i class="ti ti-map" aria-hidden="true"></i> Ver mapa
          </button>
        </div>
      </div>

      <!-- Contacto -->
      <div class="info-card">
        <div class="info-card-title">
          <i class="ti ti-user" aria-hidden="true"></i> Contacto en sitio
        </div>
        <div class="contacto-row">
          <div>
            <div class="contacto-nombre">{{ visita.contactoNombre }}</div>
            <div class="contacto-tel">{{ visita.contactoTelefono }}</div>
          </div>
          <a :href="`tel:${visita.contactoTelefono.replace(/\s/g,'')}`" class="btn-llamar">
            <i class="ti ti-phone" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <!-- Instrucciones -->
      <div class="info-card" v-if="visita.instrucciones">
        <div class="info-card-title">
          <i class="ti ti-clipboard-text" aria-hidden="true"></i> Instrucciones
        </div>
        <p class="instrucciones">{{ visita.instrucciones }}</p>
      </div>

      <!-- Estaciones -->
      <div class="info-card">
        <div class="info-card-title">
          <i class="ti ti-qrcode" aria-hidden="true"></i>
          Estaciones de control
          <span class="estaciones-count">{{ visita.estaciones.length }}</span>
        </div>
        <div class="estaciones-list">
          <div
            v-for="e in visita.estaciones"
            :key="e.id"
            class="estacion-item"
            :class="{ 'estacion-item--revisada': e.revisada }"
          >
            <div class="estacion-check">
              <i :class="['ti', e.revisada ? 'ti-check' : 'ti-point']" aria-hidden="true"></i>
            </div>
            <div class="estacion-info">
              <div class="estacion-codigo">{{ e.codigo }}</div>
              <div class="estacion-det">{{ e.tipo }} — {{ e.ubicacion }}</div>
            </div>
            <router-link
              to="/tecnico/escanear-qr"
              class="btn-escanear"
              title="Escanear QR"
            >
              <i class="ti ti-qrcode" aria-hidden="true"></i>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="acciones">
        <button
          v-if="visita.estado === 'programada'"
          class="btn-iniciar"
          :class="{ 'btn-iniciar--loading': iniciando }"
          @click="iniciarVisita"
        >
          <i class="ti ti-player-play" aria-hidden="true"></i>
          {{ iniciando ? 'Iniciando...' : 'Iniciar visita' }}
        </button>

        <button
          v-if="visita.estado === 'en_proceso'"
          class="btn-formulario"
          @click="irAFormulario"
        >
          <i class="ti ti-clipboard-check" aria-hidden="true"></i>
          Completar formulario de cierre
        </button>
      </div>

    </div>
  </layoutNavbarOperator>
</template>

<style scoped>
.visita-detail {
  font-family: 'Inter','Segoe UI',sans-serif;
  color: #111827;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Breadcrumb */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #42ae1a;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
}

/* Hero */
.visita-hero {
  background: linear-gradient(135deg, #1b2e1c, #2e5230);
  border-radius: 16px;
  padding: 20px;
  color: #fff;
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.tipo-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.12);
  padding: 5px 12px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
}

.hero-cliente {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
}

.hero-local {
  font-size: 13px;
  color: #a8d5a9;
  margin-bottom: 14px;
}

.hero-datetime {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #c8e6c9;
}

.hero-datetime span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
}
.badge--gray  { background: rgba(255,255,255,0.15); color: #fff; }
.badge--blue  { background: #e3f2fd; color: #1565c0; }
.badge--green { background: #e8f5e9; color: #2e7d32; }

/* Info cards */
.info-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
}

.info-card-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: .05em;
  margin-bottom: 12px;
}

.info-card-title .ti { color: #42ae1a; font-size: 14px; }

/* Dirección */
.direccion-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.direccion-text { font-size: 14px; color: #374151; flex: 1; }

.btn-mapa {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #e8f5e9;
  color: #2e7d32;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
}

/* Contacto */
.contacto-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contacto-nombre { font-size: 14px; font-weight: 600; color: #111827; }
.contacto-tel    { font-size: 13px; color: #9ca3af; margin-top: 2px; }

.btn-llamar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #42ae1a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-decoration: none;
  flex-shrink: 0;
}

/* Instrucciones */
.instrucciones {
  font-size: 13.5px;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
}

/* Estaciones */
.estaciones-count {
  margin-left: auto;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 100px;
}

.estaciones-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.estacion-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #f3f4f6;
  transition: border-color 0.15s;
}

.estacion-item--revisada {
  background: #f0fdf0;
  border-color: #bbf7d0;
}

.estacion-check {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #9ca3af;
  flex-shrink: 0;
}

.estacion-item--revisada .estacion-check {
  background: #42ae1a;
  color: #fff;
}

.estacion-info { flex: 1; min-width: 0; }
.estacion-codigo { font-size: 13px; font-weight: 600; color: #111827; }
.estacion-det    { font-size: 12px; color: #9ca3af; }

.btn-escanear {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #e8f5e9;
  color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  flex-shrink: 0;
}

/* Acciones */
.acciones { padding-bottom: 8px; }

.btn-iniciar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #42ae1a;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-iniciar:hover { background: #379614; }
.btn-iniciar--loading { opacity: 0.7; pointer-events: none; }

.btn-formulario {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-formulario:hover { background: #0d47a1; }
</style>