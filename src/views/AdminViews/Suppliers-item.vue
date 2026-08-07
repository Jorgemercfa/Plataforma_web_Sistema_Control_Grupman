<script setup>
import layoutNavbarAdmin from '../../components/adminComponets/layoutNavbarAdmin.vue/index.js'
</script>

<template>
    <layoutNavbarAdmin>
       <div class="suppliers-content">
         <h1>Proveedores</h1>
         <div class="suppliers-contenier-editor">
              <div class="form-group">
                 <label>Nombre del Proveedor</label>
                 <input type="text" name="Nombre del Proveedor" required />
              </div>
              <div class="form-group">
                 <label>Descripción del Proveedor</label>
                 <textarea name="Descripción del Proveedor" required></textarea>
              </div>
              <div class="form-group">
                 <label>Teléfono del Proveedor</label>
                 <input type="text" name="Teléfono del Proveedor" required />
              </div>
                  
              <button type="submit" class="submit-btn">Generar Proveedor</button>   
         </div>
       </div>
    </layoutNavbarAdmin>
</template>

<style scoped>

.suppliers-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.suppliers-contenier-editor {
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