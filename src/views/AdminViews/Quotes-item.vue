<script setup>
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue';
</script>

<template>
  <layoutNavbarAdmin>
  <div class="quotes-content">
    <h1>Cotizaciones</h1>
    <div class="quotes-container">
        <div class="form-group">
            <label>Tipo de Servicio</label>
            <select name="Servicio">
                <option value="">Seleccionar servicio</option>
                <option>Desinsectación</option>
                <option>Desinfección</option>
                <option>Desratización</option>
                <option>Limpieza de cisternas</option>
                <option>Diagnóstico y monitoreo</option>
          </select>
        </div>
        <div class="form-group">
            <label>Nombre del Producto</label>
            <input type="text" name="Nombre del Producto" required />
        </div>
        <div class="form-group">
            <label>Metros cuadrados</label>
            <input type="text" name="Metros" />
        </div>
        <button type="submit" class="submit-btn">Generar Cotización</button>
       </div>
    </div> 
  </layoutNavbarAdmin>
</template>

<style scoped>
.quotes-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.quotes-container {
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

.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #ffffff;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42ae1a;
  box-shadow: 0 0 0 3px rgba(66, 174, 26, 0.15);
}

.submit-btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background-color: #004c08;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background-color: #2e8f12;
  transform: translateY(-2px);
}


</style>