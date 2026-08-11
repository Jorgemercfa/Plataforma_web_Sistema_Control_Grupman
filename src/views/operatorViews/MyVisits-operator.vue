<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import layoutNavbarOperator from '../../components/operatorComponents/layoutNavbarOperator.vue';

const router = useRouter();

const hoy = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });

const visitas = ref([
  { id: 'VIS-005', cliente: 'Clínica Santa Rosa', local: 'Piso 2', hora: '09:00', tipo: 'Desinfección', estado: 'programada' },
  { id: 'VIS-006', cliente: 'Banco Continental', local: 'Sede Centro', hora: '11:00', tipo: 'Desinsectación', estado: 'en_proceso' },
  { id: 'VIS-007', cliente: 'Planta Industrial Perú', local: 'Almacén A', hora: '13:30', tipo: 'Desratización', estado: 'programada' },
]);

const irADetalle = (id) => router.push(`/tecnico/visita/${id}`);
const estadoLabel = (e) => {
  if (e === 'programada') return 'Programada';
  if (e === 'en_proceso') return 'En proceso';
  if (e === 'completada') return 'Completada';
  return e;
};

</script>

<template>
  <layoutNavbarOperator>
    <div class="my-visits">
      <div class="page-header">
        <h1>Mis visitas — {{ hoy }}</h1>
      </div>
      <div class="visits-list">
        <div v-for="v in visitas" :key="v.id" class="visit-card" @click="irADetalle(v.id)" role="button" tabindex="0">
          <div class="visit-left">
            <div class="visit-time">{{ v.hora }}</div>
            <div class="visit-client">{{ v.cliente }}</div>
            <div class="visit-local">{{ v.local }}</div>
          </div>
          <div class="visit-right">
            <div class="visit-type">{{ v.tipo }}</div>
            <div class="visit-status">{{ estadoLabel(v.estado) }}</div>
          </div>
        </div>
      </div>
    </div>
  </layoutNavbarOperator>
</template>

<style scoped>
/* simple styles */
.my-visits { padding: 20px; }
.visit-card { display:flex; justify-content:space-between; padding:12px; border-radius:8px; background:#fff; margin-bottom:10px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.06); }
.visit-left .visit-time { font-weight:700; }
.visit-status { font-size:0.9rem; color:#666; }
</style>
