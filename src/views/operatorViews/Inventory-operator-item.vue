<script setup>
import { ref } from 'vue'
import layoutNavbarAdmin from '../../components/adminComponets/layoutNavbarAdmin.vue/index.js'

// Lista de productos con sus stock iniciales
const productos = ref([
  { id: 1, tipo: 'Gel Cucarachicida', servicio: 'Desinsectación', cantidad: 50, unidadesConsumidas: 1 },
  { id: 2, tipo: 'Desinfectante Amonio', servicio: 'Desinfección', cantidad: 30, unidadesConsumidas: 1 },
  { id: 3, tipo: 'Raticida Bloque', servicio: 'Desratización', cantidad: 100, unidadesConsumidas: 1 }
])

// Función para restar la cantidad indicada
const consumirProducto = (producto) => {
  const gasto = Number(producto.unidadesConsumidas)
  
  if (isNaN(gasto) || gasto <= 0) {
    alert('Ingresa una cantidad válida mayor a 0.')
    return
  }
  
  if (gasto > producto.cantidad) {
    alert('No puedes descontar más del stock disponible.')
    return
  }

  producto.cantidad -= gasto
  // Resetea el input a 1 tras descontar
  producto.unidadesConsumidas = 1
}
</script>

<template>
  <layoutNavbarAdmin>
    <div class="Inventory-content">
      <h1>Inventario y Consumo de Productos</h1>

      <div class="Inventory-container">
        <!-- Lista de productos -->
        <div 
          v-for="producto in productos" 
          :key="producto.id" 
          class="product-card"
        >
          <div class="product-info">
            <span class="badge">{{ producto.servicio }}</span>
            <h3>{{ producto.tipo }}</h3>
            <p class="stock">
              Stock actual: <strong>{{ producto.cantidad }}</strong>
            </p>
          </div>

          <!-- Control de consumo para el técnico -->
          <div class="product-actions">
            <div class="form-group">
              <label>Consumido:</label>
              <input 
                type="number" 
                v-model.number="producto.unidadesConsumidas" 
                min="1" 
                :max="producto.cantidad"
              />
            </div>
            <button 
              @click="consumirProducto(producto)" 
              class="submit-btn"
              :disabled="producto.cantidad === 0"
            >
              {{ producto.cantidad === 0 ? 'Sin Stock' : 'Registrar Consumo' }}
            </button>
          </div>
        </div>
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
  padding: 0 15px;
}

.Inventory-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 700px;
}

.product-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #42ae1a;
  color: #ffffff;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  gap: 20px;
}

.product-info h3 {
  margin: 5px 0;
  font-size: 1.2rem;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.stock {
  margin-top: 5px;
  font-size: 1.1rem;
}

.product-actions {
  display: flex;
  align-items: flex-end;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.form-group input {
  width: 70px;
  padding: 8px;
  border: none;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
}

.submit-btn {
  background-color: #ffffff;
  color: #004c08;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #004c08;
  color: #ffffff;
}

.submit-btn:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
</style>