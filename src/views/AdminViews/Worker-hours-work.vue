<script setup>
import { ref } from 'vue';
import layoutNavbarAdmin from '../../components/adminComponets/layoutNavbarAdmin.vue';

/* ── Datos organizados por área ────────────────────────── */
const areas = ref([
  {
    id: 1,
    titulo: 'Personal Administrativo',
    trabajadores: [
      { id: 101, nombre: 'Trabajador 1', horas: 40 },
      { id: 102, nombre: 'Trabajador 2', horas: 35 },
      { id: 103, nombre: 'Trabajador 3', horas: 42 },
    ]
  },
  {
    id: 2,
    titulo: 'Personal Técnico',
    trabajadores: [
      { id: 201, nombre: 'Trabajador 1', horas: 40 },
      { id: 202, nombre: 'Trabajador 2', horas: 35 },
      { id: 203, nombre: 'Trabajador 3', horas: 42 },
    ]
  }
]);
</script>

<template>
    <!-- Componente Menú Lateral -->
    <layoutNavbarAdmin>

    <!-- Contenido Principal -->
    <main class="main-content">
      <div class="worker-hours-work">
        
        <!-- Cabecera de Página -->
        <div class="page-header">
          <h1 class="worker-hours-title">Horas de Trabajo</h1>
          <p class="page-sub">Resumen de jornada laboral por área</p>
        </div>

        <!-- Grilla de Tarjetas por Área -->
        <div class="worker-hours-content">
          <div 
            v-for="area in areas" 
            :key="area.id" 
            class="worker-hours-card"
          >
            <h2 class="worker-hours-card-title">
              Horas trabajadas - {{ area.titulo }}
            </h2>

            <!-- Lista de trabajadores del área -->
            <ul class="worker-list">
              <li 
                v-for="t in area.trabajadores" 
                :key="t.id" 
                class="worker-item"
              >
                <span class="worker-name">{{ t.nombre }}</span>
                <span class="worker-hours-badge">{{ t.horas }} hrs</span>
              </li>
            </ul>

          </div> 
        </div>

      </div>
    </main>
  </layoutNavbarAdmin>
</template>

<style scoped>
/* ── Layout Global ────────────────────────── */
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

.worker-hours-work {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #111827;
}

/* ── Cabecera ────────────────────────────── */
.page-header {
  margin-bottom: 24px;
}

.worker-hours-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px;
}

.page-sub {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

/* ── Layout del Contenido (Grid) ─────────── */
.worker-hours-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  align-items: start;
}

/* ── Estilos de Tarjeta ───────────────────── */
.worker-hours-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.worker-hours-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
}

/* ── Lista de Trabajadores ───────────────── */
.worker-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.worker-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
}

.worker-item:last-child {
  border-bottom: none;
}

.worker-name {
  font-size: 13.5px;
  font-weight: 500;
  color: #374151;
}

.worker-hours-badge {
  font-size: 12.5px;
  font-weight: 600;
  color: #2e7d32;
  background-color: #e8f5e9;
  padding: 3px 10px;
  border-radius: 100px;
}

/* ── Responsive ───────────────────────────── */
@media (max-width: 600px) {
  .main-content {
    padding: 16px;
  }
}
</style>