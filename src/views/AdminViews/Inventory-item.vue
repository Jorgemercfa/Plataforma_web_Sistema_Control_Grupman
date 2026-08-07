<script setup>
import { ref } from 'vue'
import layoutNavbarAdmin from '../../components/adminComponets/layoutNavbarAdmin.vue/index.js'

// Lista de productos registrada en el sistema
const productos = ref([
  { id: 1, tipo: 'Gel Cucarachicida', descripcion: 'Gel de alta efectividad para interiores', servicio: 'Desinsectación', cantidad: 50 },
  { id: 2, tipo: 'Desinfectante Amonio', descripcion: 'Amonio cuaternario al 10%', servicio: 'Desinfección', cantidad: 30 },
  { id: 3, tipo: 'Raticida Bloque', descripcion: 'Bloque parafínico resistente a la humedad', servicio: 'Desratización', cantidad: 100 }
])

// Formulario reactivo para crear nuevo producto
const nuevoProducto = ref({
  tipo: '',
  descripcion: '',
  servicio: '',
  cantidad: 1
})

// Lista de servicios disponibles
const servicios = [
  'Desinsectación',
  'Desinfección',
  'Desratización',
  'Limpieza de cisternas',
  'Diagnóstico y monitoreo'
]

// Registrar un nuevo producto
const agregarProducto = () => {
  if (!nuevoProducto.value.tipo || !nuevoProducto.value.servicio) {
    alert('Por favor completa los campos obligatorios.')
    return
  }

  productos.value.push({
    id: Date.now(),
    tipo: nuevoProducto.value.tipo,
    descripcion: nuevoProducto.value.descripcion,
    servicio: nuevoProducto.value.servicio,
    cantidad: Number(nuevoProducto.value.cantidad) || 0
  })

  // Limpiar formulario tras guardar
  nuevoProducto.value = { tipo: '', descripcion: '', servicio: '', cantidad: 1 }
}

// Reabastecer stock (Sumar stock desde la vista admin)
const reabastecerStock = (producto) => {
  const suma = prompt(`¿Cuántas unidades deseas agregar al stock de "${producto.tipo}"?`, '10')
  const unidades = parseInt(suma, 10)

  if (!isNaN(unidades) && unidades > 0) {
    producto.cantidad += unidades
  }
}

// Eliminar producto del inventario
const eliminarProducto = (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    productos.value = productos.value.filter(p => p.id !== id)
  }
}
</script>

<template>
  <layoutNavbarAdmin>
    <div class="inventory-content">
      <h1>Panel Administrativo de Inventario</h1>

      <div class="admin-grid">
        <!-- Formulario de Creación -->
        <section class="card form-card">
          <h2>Registrar Nuevo Producto</h2>
          <form @submit.prevent="agregarProducto" class="product-form">
            <div class="form-group">
              <label>Tipo / Nombre del Producto *</label>
              <input 
                v-model="nuevoProducto.tipo" 
                type="text" 
                placeholder="Ej. Detergente Enzimático" 
                required 
              />
            </div>

            <div class="form-group">
              <label>Tipo de Servicio *</label>
              <select v-model="nuevoProducto.servicio" required>
                <option value="" disabled>Seleccionar servicio</option>
                <option v-for="servicio in servicios" :key="servicio" :value="servicio">
                  {{ servicio }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Stock Inicial *</label>
              <input 
                v-model.number="nuevoProducto.cantidad" 
                type="number" 
                min="1" 
                required 
              />
            </div>

            <div class="form-group">
              <label>Descripción del Producto</label>
              <textarea 
                v-model="nuevoProducto.descripcion" 
                rows="3" 
                placeholder="Detalles sobre dosis o uso..."
              ></textarea>
            </div>

            <button type="submit" class="submit-btn">Guardar en Inventario</button>
          </form>
        </section>

        <!-- Tabla de Gestión de Inventario -->
        <section class="card table-card">
          <h2>Inventario Actual</h2>
          
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Servicio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prod in productos" :key="prod.id">
                  <td>
                    <strong>{{ prod.tipo }}</strong>
                    <small v-if="prod.descripcion">{{ prod.descripcion }}</small>
                  </td>
                  <td>
                    <span class="badge">{{ prod.servicio }}</span>
                  </td>
                  <td>
                    <span :class="['stock-tag', { 'low-stock': prod.cantidad < 10 }]">
                      {{ prod.cantidad }} unid.
                    </span>
                  </td>
                  <td class="actions">
                    <button @click="reabastecerStock(prod)" class="btn-stock" title="Reabastecer Stock">
                      + Stock
                    </button>
                    <button @click="eliminarProducto(prod.id)" class="btn-delete" title="Eliminar Producto">
                      ✕
                    </button>
                  </td>
                </tr>
                <tr v-if="productos.length === 0">
                  <td colspan="4" class="empty-message">No hay productos registrados.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </layoutNavbarAdmin>
</template>

<style scoped>
.inventory-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #004c08;
  margin-bottom: 30px;
}

.admin-grid {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 30px;
}

@media (max-width: 900px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
}

.card h2 {
  font-size: 1.25rem;
  color: #004c08;
  margin-bottom: 20px;
  border-bottom: 2px solid #42ae1a;
  padding-bottom: 8px;
}

/* Estilos del Formulario */
.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #42ae1a;
}

.submit-btn {
  background-color: #42ae1a;
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #004c08;
}

/* Estilos de la Tabla */
.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

th {
  background-color: #f8fafc;
  color: #475569;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td small {
  display: block;
  color: #64748b;
  font-size: 0.8rem;
}

.badge {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.stock-tag {
  font-weight: bold;
  color: #0f172a;
}

.stock-tag.low-stock {
  color: #d97706;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-stock {
  background: #e2e8f0;
  color: #0f172a;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
}

.btn-stock:hover {
  background: #42ae1a;
  color: #fff;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-delete:hover {
  background: #dc2626;
  color: #fff;
}

.empty-message {
  text-align: center;
  color: #94a3b8;
  padding: 20px;
}
</style>