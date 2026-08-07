<script setup>
import layoutNavbarAdmin from '../../components/adminComponets/layoutNavbarAdmin.vue/index.js'
</script>

<template>
    <layoutNavbarAdmin>
       <div class="bills-content">
         <h1>Gastos de la Empresa</h1>
         <div class="bills-contenier-editor">
              <div class="form-group">
                 <label>Tipo de Gasto</label>
                 <input type="text" name="Tipo de Gasto" required />
              </div>
              <div class="form-group">
                 <label>Monto</label>
                 <input type="text" name="Monto" required />
              </div>
              <button type="submit" class="submit-btn">Generar Gasto</button>   
         </div>
       </div>
    </layoutNavbarAdmin>
</template>

<style scoped>

.bills-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.bills-contenier-editor {
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

</style>