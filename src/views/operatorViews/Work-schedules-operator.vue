<script setup>
// import { ref, computed } from 'vue';
import layoutNavbarOperator from '../../components/operatorComponents/layoutNavbarOperator.vue';
</script>

<template>
    <!-- Componente Menú Lateral -->
    <layoutNavbarOperator>

    <!-- Contenido Principal -->
    <main class="main-content">
      <div class="work-schedules-admin">
        <!-- Cabecera de página -->
        <div class="page-header">
          <h1 class="work-schedules-title">Horarios de Trabajo</h1>
          <p class="work-schedules-subtitle">Grupman</p>
        </div>

        <!-- Tarjeta de Horarios -->
        <div class="work-schedules-content">
          <div class="work-schedules-card">
            <h2 class="work-schedules-card-title">Horario de Trabajo</h2>
            
            <div class="form-group">
              <label>Lunes</label>
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de ingreso" />
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de salida" />
            </div>

            <div class="form-group">
              <label>Martes</label>
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de ingreso" />
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de salida" />
            </div>

            <div class="form-group">
              <label>Miércoles</label>
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de ingreso" />
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de salida" />
            </div>

            <div class="form-group">
              <label>Jueves</label>
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de ingreso" />
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de salida" />
            </div>

            <div class="form-group">
              <label>Viernes</label>
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de ingreso" />
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de salida" />
            </div>

            <div class="form-group">
              <label>Sábado</label>
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de ingreso" />
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de salida" />
            </div>

            <div class="form-group">
              <label>Domingo</label>
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de ingreso" />
              <input type="text" class="work-schedules-input" placeholder="Ingrese el hora de salida" />
            </div>

            <p class="work-schedules-note">
              Marcar los días Sábado y Domingo solo si llegó a trabajar en dichos días.
            </p>

            <button class="work-schedules-button">Guardar</button>
          </div>
        </div>
      </div>
    </main>
  </layoutNavbarOperator>
</template>

<style scoped>
/* Contenedor flexible principal */
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

/* Estilos de la vista */
.work-schedules-admin {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #111827;
}

.page-header {
  margin-bottom: 24px;
}

.work-schedules-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px;
}

.work-schedules-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.work-schedules-content {
  display: flex;
  justify-content: center;
}

.work-schedules-card {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 500px;
}

.work-schedules-card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #374151;
}

.work-schedules-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.work-schedules-note {
  font-size: 12px;
  color: #6b7280;
  margin: 16px 0;
}

.work-schedules-button {
  background-color: #42ae1a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s;
}

.work-schedules-button:hover {
  background-color: #369b17;
}
</style>