<script setup>
import layoutNavbarAdmin from '../../components/layoutNavbarAdmin.vue'
</script>

<template>
    <layoutNavbarAdmin>
       <div class="Inventory-content">
         <h1>Inventario de Productos</h1>
         <div class="Inventory-contenier-editor">
              <div class="form-group">
                 <label>Tipo de Producto</label>
                 <input type="text" name="Tipo de Producto" required />
              </div>
              <div class="form-group">
                 <label>Descripción del Producto</label>
                 <textarea name="Descripción del Producto" required></textarea>
              </div>
              <label>Tipo de Servicio</label>
              <select name="Servicio">
                  <option value="">Seleccionar servicio</option>
                  <option>Desinsectación</option>
                  <option>Desinfección</option>
                  <option>Desratización</option>
                  <option>Limpieza de cisternas</option>
                  <option>Diagnóstico y monitoreo</option>
              </select>
              <button type="submit" class="submit-btn">Generar Producto</button>   
         </div>
       </div>
    </layoutNavbarAdmin>
</template>

<style scoped>
.Inventory-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.Inventory-contenier-editor {
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
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #ffffff;
  color: #004c08;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.submit-btn:hover {
  background-color: #42ae1a;
  color: #ffffff;
}

</style>