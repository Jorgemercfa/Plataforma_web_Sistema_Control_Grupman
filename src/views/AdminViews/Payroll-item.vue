<script setup>
  import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue';
</script>

<template>
  <layoutNavbarAdmin>
    <div class="payroll-content">
      <h1>Nomina de Empleados</h1>
      <div class="payroll-container">
          <div class="form-group">
              <label>Nombre del Empleado</label>
              <input type="text" name="Nombre del Empleado" required />
          </div>
          <div class="form-group">
              <label>Horas Trabajadas</label>
              <input type="text" name="Horas Trabajadas" required />
          </div>
          <div class="form-group">
              <label>Salario por Hora</label>
              <input type="text" name="Salario por Hora" required />
          </div>
          <button type="submit" class="submit-btn">Generar Nomina</button>
         </div>
      </div> 
  </layoutNavbarAdmin>
</template>

<style scoped>
.payroll-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.payroll-container {
  display: flex;
  gap: 60px;
  background: #42ae1a;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}

.form-area {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.submit-btn {
  background-color: #fff;
  color: #42ae1a;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #42ae1a;
  color: #fff;
}

</style>