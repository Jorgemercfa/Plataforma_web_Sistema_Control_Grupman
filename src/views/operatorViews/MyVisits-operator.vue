<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import layoutNavbarOperator from '../../components/operatorComponents/layoutNavbarOperator.vue'

const router = useRouter()

// Mock de visitas asignadas al técnico conectado
const visitas = ref([
  { id: 'VIS-001', cliente: 'Restaurante El Olivo', local: 'Sede Miraflores', fecha: '2026-08-07', hora: '09:00', tipo: 'Desinsectación', estado: 'programada' },
  { id: 'VIS-002', cliente: 'Almacenes San Martín', local: 'Almacén Central', fecha: '2026-08-07', hora: '13:00', tipo: 'Desratización', estado: 'en_proceso' },
  { id: 'VIS-003', cliente: 'Colegio Los Pinos', local: 'Comedor', fecha: '2026-08-07', hora: '15:30', tipo: 'Desratización', estado: 'programada' },
])

const filtro = ref('todas')

const visitasFiltradas = computed(() => {
  if (filtro.value === 'todas') return visitas.value
  return visitas.value.filter(v => v.estado === filtro.value)
})

const irADetalle = (id) => {
  router.push({ name: 'VisitDetailOperator', params: { id } })
}

const iniciarVisita = (v) => {
  v.estado = 'en_proceso'
  // redirige al detalle para continuar con el flujo
  router.push({ name: 'VisitDetailOperator', params: { id: v.id } })
}
</script>

<template>
  <layoutNavbarOperator>
    <div class="my-visits">
      <div class="page-header">
        <h1>Mis visitas</h1>
        <p class="sub">Lista de visitas asignadas al técnico (mock)</p>
      </div>

      <div class="filters">
        <label>Estado:
          <select v-model="filtro">
            <option value="todas">Todas</option>
            <option value="programada">Programada</option>
            <option value="en_proceso">En proceso</option>
            <option value="completada">Completada</option>
          </select>
        </label>
      </div>

      <div class="visits-list">
        <div v-if="!visitasFiltradas.length" class="empty">No hay visitas asignadas</div>

        <ul>
          <li v-for="v in visitasFiltradas" :key="v.id" class="visit-item">
            <div class="visit-main">
              <div class="visit-meta">
                <div class="visit-id">{{ v.id }}</div>
                <div class="visit-client">{{ v.cliente }} — <span class="muted">{{ v.local }}</span></div>
                <div class="visit-type">{{ v.tipo }}</div>
              </div>

              <div class="visit-time">
                <div class="visit-date">{{ v.fecha }}</div>
                <div class="visit-hour">{{ v.hora }}</div>
                <div class="visit-state"><span :class="['badge', 'badge--' + v.estado]">{{ v.estado }}</span></div>
              </div>
            </div>

            <div class="visit-actions">
              <button class="btn" @click="irADetalle(v.id)">Ver</button>
              <button class="btn btn-primary" @click="iniciarVisita(v)" :disabled="v.estado === 'en_proceso'">Iniciar</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </layoutNavbarOperator>
</template>

<style scoped>
.my-visits { padding: 20px; }
.page-header { margin-bottom: 16px; }
.sub { color: #6b7280; margin-top: 4px }
.filters { margin-bottom: 12px }
.visits-list ul { list-style:none; padding:0; display:flex; flex-direction:column; gap:12px }
.visit-item { display:flex; justify-content:space-between; align-items:center; padding:12px; border-radius:10px; background:#f3f7f3 }
.visit-main { display:flex; gap:16px; align-items:center }
.visit-meta { min-width:420px }
.visit-id { font-weight:700 }
.muted { color:#6b7280 }
.visit-actions .btn { margin-left:8px }
.btn { background:#e5e7eb; border:none; padding:8px 10px; border-radius:6px }
.btn-primary { background:#42ae1a; color:white }
.badge { padding:4px 8px; border-radius:999px; font-size:12px }
.badge--programada { background:#f3f4f6; color:#374151 }
.badge--en_proceso { background:#bfdbfe; color:#1e3a8a }
.badge--completada { background:#bbf7d0; color:#065f46 }
</style>