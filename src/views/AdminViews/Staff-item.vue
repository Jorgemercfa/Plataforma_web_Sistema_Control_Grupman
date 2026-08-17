<script setup>
import { ref, reactive, onMounted } from 'vue';
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue';
import { getStaff, createStaff, updateStaff, deleteStaff } from '../../data/staffService';

const staffList = ref([]);
const loading = ref(false);
const error = ref(null);

// controla si el formulario está abierto y si es edición o registro nuevo
const showForm = ref(false);
const editingId = ref(null);

const form = reactive({
  nombre: '',
  puesto: '',
  area: '',
  telefono: '',
  correo: '',
  password: '',
});

onMounted(async () => {
  await loadStaff();
});

async function loadStaff() {
  loading.value = true;
  error.value = null;
  try {
    staffList.value = await getStaff();
  } catch (e) {
    error.value = 'No se pudo cargar el personal';
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.nombre = '';
  form.puesto = '';
  form.area = '';
  form.telefono = '';
  form.correo = '';
  form.password = '';
  editingId.value = null;
}

function openNewForm() {
  resetForm();
  showForm.value = true;
}

function openEditForm(staff) {
  form.nombre = staff.nombre;
  form.puesto = staff.puesto;
  form.area = staff.area;
  form.telefono = staff.telefono;
  form.correo = staff.correo;
  form.password = staff.password;
  editingId.value = staff.id;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  resetForm();
}

async function handleSubmit() {
  if (!form.nombre.trim() || !form.puesto.trim() || !form.correo.trim()) return;

  try {
    if (editingId.value) {
      await updateStaff(editingId.value, { ...form });
    } else {
      await createStaff({ ...form });
    }
    await loadStaff();
    closeForm();
  } catch (e) {
    error.value = 'No se pudo guardar el registro';
  }
}

async function handleDelete(id) {
  try {
    await deleteStaff(id);
    await loadStaff();
  } catch (e) {
    error.value = 'No se pudo eliminar al trabajador';
  }
}
</script>

<template>
  <layoutNavbarAdmin>
    <div class="staff-page">
      <div class="staff-header">
        <h1>Personal</h1>
        <button class="button_nuevo" @click="openNewForm">+ Registrar Trabajador</button>
      </div>

      <p v-if="loading" class="loading-state">Cargando...</p>
      <p v-if="error" class="error-state">{{ error }}</p>

      <div class="staff-grid" v-if="!loading && staffList.length">
        <div class="staff-container" v-for="staff in staffList" :key="staff.id">
          <p class="staff-nombre">{{ staff.nombre }}</p>
          <p class="staff-puesto">{{ staff.area }} · {{ staff.puesto }}</p>

          <div class="personal_staff_data">
            <div class="dato">
              <p>Teléfono</p>
              <span>{{ staff.telefono }}</span>
            </div>
            <div class="dato">
              <p>Correo</p>
              <span>{{ staff.correo }}</span>
            </div>
          </div>

          <div class="profesional_staff_data">
            <div class="dato">
              <p>Contraseña</p>
              <span>********</span>
            </div>
            <div class="dato">
              <p>Área</p>
              <span>{{ staff.area }}</span>
            </div>
          </div>

          <div class="staff-botones">
            <button class="button_staff_container button_editar" @click="openEditForm(staff)">
              Editar
            </button>
            <button class="button_staff_container button_eliminar" @click="handleDelete(staff.id)">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <p v-else-if="!loading" class="empty-state">Todavía no hay trabajadores registrados.</p>

      <!-- Modal / formulario de registro y edición -->
      <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
        <form class="modal-form" @submit.prevent="handleSubmit">
          <h2>{{ editingId ? 'Editar Trabajador' : 'Registrar Trabajador' }}</h2>

          <div class="form-group">
            <label>Nombre completo</label>
            <input v-model="form.nombre" type="text" required />
          </div>

          <div class="form-group">
            <label>Puesto</label>
            <input v-model="form.puesto" type="text" required />
          </div>

          <div class="form-group">
            <label>Área</label>
            <input v-model="form.area" type="text" required />
          </div>

          <div class="form-group">
            <label>Teléfono</label>
            <input v-model="form.telefono" type="text" />
          </div>

          <div class="form-group">
            <label>Correo</label>
            <input v-model="form.correo" type="email" required />
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <input v-model="form.password" type="password" :required="!editingId" />
          </div>

          <div class="modal-botones">
            <button type="button" class="button_staff_container button_editar" @click="closeForm">
              Cancelar
            </button>
            <button type="submit" class="button_staff_container button_eliminar">
              {{ editingId ? 'Guardar Cambios' : 'Registrar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </layoutNavbarAdmin>
</template>

<style scoped>
.staff-page {
  flex: 1;
  padding: 2rem;
}

.staff-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.staff-header h1 {
  color: #1f2937;
  margin: 0;
}

.button_nuevo {
  background-color: #42ae1a;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button_nuevo:hover {
  background-color: #388f15;
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.loading-state,
.error-state,
.empty-state {
  color: #6b7280;
  text-align: center;
  padding: 20px 0;
}

.error-state {
  color: #dc2626;
}

.staff-container {
  background-color: #42ae1a;
  color: #fff;
  padding: 1.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.staff-nombre {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 2px;
}

.staff-puesto {
  font-size: 13px;
  color: #d9f2cc;
  margin: 0 0 18px;
}

.personal_staff_data,
.profesional_staff_data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 20px;
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.personal_staff_data {
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.dato p {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #d9f2cc;
  margin: 0 0 3px;
}

.dato span {
  font-size: 14px;
  font-weight: bold;
}

.staff-botones {
  display: flex;
  gap: 10px;
}

.button_staff_container {
  flex: 1;
  border: none;
  height: 40px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button_editar {
  background-color: #ffffff;
  color: #004c08;
}

.button_editar:hover {
  background-color: #e8f9df;
}

.button_eliminar {
  background-color: #004c08;
  color: #ffffff;
}

.button_eliminar:hover {
  background-color: #003a06;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-form {
  background: #fff;
  padding: 28px;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-form h2 {
  margin: 0 0 8px;
  color: #1f2937;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  color: #4b5563;
  font-weight: 500;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
}

.form-group input:focus {
  outline: none;
  border-color: #22a745;
  box-shadow: 0 0 0 3px rgba(34, 167, 69, 0.15);
}

.modal-botones {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
</style>