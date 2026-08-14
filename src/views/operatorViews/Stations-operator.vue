<script setup>
import { ref } from 'vue'
import layoutNavbarOperator from '../../components/operatorComponents/layoutNavbarOperator.vue'

// Mock estaciones
const estaciones = ref([
  { id: 'EST-001', codigo: 'EST-001', tipo: 'Cebadero', ubicacion: 'Entrada principal', estado: 'Activa', ultimaRevision: '18 Jun 2026' },
  { id: 'EST-002', codigo: 'EST-002', tipo: 'Trampa pegante', ubicacion: 'Cocina - fondo', estado: 'Activa', ultimaRevision: '18 Jun 2026' },
  { id: 'EST-003', codigo: 'EST-003', tipo: 'Dispensador', ubicacion: 'Comedor - pasillo', estado: 'Revisar', ultimaRevision: '02 Jun 2026' },
])

const marcarRevisada = (e) => {
  e.ultimaRevision = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
  e.estado = 'Activa'
}

const filtrar = ref('todas')

const estacionesFiltradas = () => {
  if (filtrar.value === 'todas') return estaciones.value
  return estaciones.value.filter(s => s.estado.toLowerCase() === filtrar.value)
}
</script>

<template>
  <layoutNavbarOperator>
    <div class="stations-page">
      <div class="page-header">
        <h1>Estaciones</h1>
        <p class="sub">Lista de estaciones por local / servicio</p>
      </div>

      <div class="controls">
        <label>Estado:
          <select v-model="filtrar">
            <option value="todas">Todas</option>
            <option value="activa">Activa</option>
            <option value="revisar">Revisar</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </label>
      </div>

      <div class="stations-list">
        <div v-if="!estacionesFiltradas().length" class="empty">No hay estaciones</div>
        <ul>
          <li v-for="s in estacionesFiltradas()" :key="s.id" class="station-item">
            <div class="station-main">
              <div class="station-code">{{ s.codigo }}</div>
              <div class="station-info">
                <div class="station-type">{{ s.tipo }} · <span class="muted">{{ s.ubicacion }}</span></div>
                <div class="station-meta">Última revisión: {{ s.ultimaRevision }}</div>
              </div>
            </div>
            <div class="station-actions">
              <button class="btn" @click="marcarRevisada(s)">Marcar revisada</button>
              <router-link :to="`/tecnico/estacion/${s.codigo}`" class="btn btn-primary">Abrir</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </layoutNavbarOperator>
</template>

<style scoped>
.stations-page { padding: 20px }
.page-header { margin-bottom: 12px }
.sub { color: #6b7280 }
.controls { margin-bottom: 12px }
.stations-list ul { list-style:none; padding:0; display:flex; flex-direction:column; gap:12px }
.station-item { display:flex; justify-content:space-between; align-items:center; padding:12px; border-radius:10px; background:#f8faf8 }
.station-main { display:flex; gap:12px; align-items:center }
.station-code { font-weight:700; min-width:80px }
.muted { color:#6b7280 }
.btn { background:#e5e7eb; border:none; padding:8px 10px; border-radius:6px }
.btn-primary { background:#42ae1a; color:white; text-decoration:none; padding:8px 10px; border-radius:6px }
</style>
