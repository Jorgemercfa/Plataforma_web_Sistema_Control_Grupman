<script setup>
import { ref } from 'vue'

// Control del modal / emisión de eventos
defineProps({
  mostrar: { type: Boolean, default: false }
})
const emit = defineEmits(['cerrar', 'solicitud-enviada'])

// Sedes registradas del cliente
const sedes = ref([
  { id: 1, nombre: 'Sede Miraflores - Av. Larco 456' },
  { id: 2, nombre: 'Almacén Central - Av. Industrial 102' },
  { id: 3, nombre: 'Sede San Isidro - Av. Rivera Navarrete 789' }
])

// Tipos de servicio disponibles
const tiposServicio = ref([
  { id: 'desinsectacion', nombre: 'Desinsectación', icono: 'ti-bug' },
  { id: 'desratizacion', nombre: 'Desratización / Control de Roedores', icono: 'ti-mouse' },
  { id: 'desinfeccion', nombre: 'Desinfección / Sanutización', icono: 'ti-virus-off' },
  { id: 'limpieza_tanques', nombre: 'Limpieza de Cisternas / Tanques', icono: 'ti-droplet' }
])

// Formulario reactivo
const form = ref({
  sedeId: '',
  serviciosSeleccionados: [],
  fechaSugerida: '',
  horarioSugerido: 'mañana',
  urgencia: 'normal', // normal | alta | emergencia
  comentarios: '',
  archivos: []
})

const cargando = ref(false)
const exito = ref(false)

const toggleServicio = (id) => {
  const index = form.value.serviciosSeleccionados.indexOf(id)
  if (index === -1) {
    form.value.serviciosSeleccionados.push(id)
  } else {
    form.value.serviciosSeleccionados.splice(index, 1)
  }
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  form.value.archivos = files.map(f => f.name)
}

const enviarSolicitud = () => {
  if (!form.value.sedeId || form.value.serviciosSeleccionados.length === 0) {
    alert('Por favor selecciona una sede y al menos un tipo de servicio.')
    return
  }

  cargando.value = true
  
  // Simulación de respuesta de backend
  setTimeout(() => {
    cargando.value = false
    exito.value = true
    setTimeout(() => {
      emit('solicitud-enviada', { ...form.value })
      cerrarModal()
    }, 1800)
  }, 1200)
}

const cerrarModal = () => {
  exito.value = false
  cargando.value = false
  form.value = {
    sedeId: '',
    serviciosSeleccionados: [],
    fechaSugerida: '',
    horarioSugerido: 'mañana',
    urgencia: 'normal',
    comentarios: '',
    archivos: []
  }
  emit('cerrar')
}
</script>

<template>
  <div v-if="mostrar" class="modal-overlay" @click.self="cerrarModal">
    <div class="modal-card">

      <!-- Cabecera -->
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Solicitar Servicio Extra / Agenda</h2>
          <p class="modal-sub">Programa un servicio adicional o atiende una incidencia puntual en tus sedes.</p>
        </div>
        <button class="btn-close" @click="cerrarModal"><i class="ti ti-x"></i></button>
      </div>

      <!-- Estado Exitoso -->
      <div v-if="exito" class="success-state">
        <div class="success-icon"><i class="ti ti-circle-check"></i></div>
        <h3>¡Solicitud Enviada con Éxito!</h3>
        <p>Un supervisor revisará tu requerimiento y te confirmará la asignación a la brevedad.</p>
      </div>

      <!-- Formulario -->
      <div v-else class="modal-body">

        <!-- 1. Selección de Sede -->
        <div class="form-group">
          <label class="form-label">Sede / Local donde se requiere el servicio <span class="req">*</span></label>
          <select v-model="form.sedeId" class="form-select">
            <option value="" disabled>Selecciona una sede...</option>
            <option v-for="s in sedes" :key="s.id" :value="s.id">{{ s.nombre }}</option>
          </select>
        </div>

        <!-- 2. Tipo de Servicio (Checkbox en Cards) -->
        <div class="form-group">
          <label class="form-label">Tratamiento(s) Requerido(s) <span class="req">*</span></label>
          <div class="services-grid">
            <div 
              v-for="s in tiposServicio" 
              :key="s.id" 
              :class="['service-option', { active: form.serviciosSeleccionados.includes(s.id) }]"
              @click="toggleServicio(s.id)"
            >
              <i :class="['ti', s.icono]"></i>
              <span>{{ s.nombre }}</span>
            </div>
          </div>
        </div>

        <!-- 3. Urgencia y Agenda -->
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Nivel de Urgencia</label>
            <div class="urgency-selector">
              <button 
                type="button"
                :class="['urgency-btn', { active: form.urgencia === 'normal' }]"
                @click="form.urgencia = 'normal'"
              >Normal</button>
              <button 
                type="button"
                :class="['urgency-btn urgency--amber', { active: form.urgencia === 'alta' }]"
                @click="form.urgencia = 'alta'"
              >Prioritaria</button>
              <button 
                type="button"
                :class="['urgency-btn urgency--red', { active: form.urgencia === 'emergencia' }]"
                @click="form.urgencia = 'emergencia'"
              >Emergencia</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Fecha Tentativa</label>
            <input type="date" v-model="form.fechaSugerida" class="form-input" />
          </div>
        </div>

        <!-- Horario Turno -->
        <div class="form-group">
          <label class="form-label">Turno Preferido</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" value="mañana" v-model="form.horarioSugerido" /> Mañana (08:00 AM - 12:00 PM)
            </label>
            <label class="radio-label">
              <input type="radio" value="tarde" v-model="form.horarioSugerido" /> Tarde (02:00 PM - 06:00 PM)
            </label>
            <label class="radio-label">
              <input type="radio" value="noche" v-model="form.horarioSugerido" /> Nocturno (Fuera de horario comercial)
            </label>
          </div>
        </div>

        <!-- 4. Detalles de la Incidencia -->
        <div class="form-group">
          <label class="form-label">Detalles / Observaciones del problema</label>
          <textarea 
            v-model="form.comentarios" 
            class="form-textarea" 
            rows="3" 
            placeholder="Ej. Se detectó presencia de insectos en el área de cocina/almacén..."
          ></textarea>
        </div>

        <!-- 5. Adjuntar Fotografías/Evidencias -->
        <div class="form-group">
          <label class="form-label">Adjuntar Fotografías del Área / Problema (Opcional)</label>
          <div class="file-dropzone">
            <input type="file" multiple @change="handleFileUpload" id="file-upload" class="file-input" accept="image/*" />
            <label for="file-upload" class="file-label">
              <i class="ti ti-upload"></i>
              <span>Haz clic para subir fotos o arrastra los archivos aquí</span>
            </label>
          </div>
          <div v-if="form.archivos.length" class="file-list">
            <small v-for="(f, i) in form.archivos" :key="i" class="file-chip">
              <i class="ti ti-photo"></i> {{ f }}
            </small>
          </div>
        </div>

      </div>

      <!-- Acciones / Footer -->
      <div v-if="!exito" class="modal-footer">
        <button class="btn-cancel" @click="cerrarModal" :disabled="cargando">Cancelar</button>
        <button class="btn-submit" @click="enviarSolicitud" :disabled="cargando">
          <i class="ti" :class="cargando ? 'ti-loader spin' : 'ti-send'"></i>
          {{ cargando ? 'Enviando...' : 'Enviar Solicitud' }}
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(17, 24, 39, 0.5); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 999; padding: 16px;
}

.modal-card {
  background: #fff; border-radius: 16px; width: 100%; max-width: 640px;
  max-height: 90vh; display: flex; flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); overflow: hidden;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* Header */
.modal-header {
  padding: 20px 24px; border-bottom: 1px solid #f3f4f6;
  display: flex; justify-content: space-between; align-items: flex-start;
}
.modal-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 4px; }
.modal-sub { font-size: 12.5px; color: #6b7280; margin: 0; }
.btn-close { background: none; border: none; font-size: 20px; color: #9ca3af; cursor: pointer; }
.btn-close:hover { color: #111827; }

/* Body */
.modal-body { padding: 20px 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }

/* Form Controls */
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.form-label { font-size: 13px; font-weight: 600; color: #374151; }
.req { color: #dc2626; }

.form-select, .form-input, .form-textarea {
  width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px;
  font-size: 13.5px; color: #111827; outline: none; transition: border-color 0.15s;
}
.form-select:focus, .form-input:focus, .form-textarea:focus { border-color: #42ae1a; }

/* Grid de Selección de Servicios */
.services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.service-option {
  border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px;
  display: flex; align-items: center; gap: 10px; cursor: pointer;
  font-size: 13px; font-weight: 500; color: #4b5563; transition: all 0.15s;
}
.service-option i { font-size: 18px; color: #6b7280; }
.service-option:hover { background: #f9fafb; }
.service-option.active { border-color: #42ae1a; background: #f0fdf4; color: #166534; font-weight: 600; }
.service-option.active i { color: #42ae1a; }

/* Selector de Urgencia */
.urgency-selector { display: flex; gap: 6px; }
.urgency-btn {
  flex: 1; padding: 8px; border: 1px solid #e5e7eb; background: #fff;
  border-radius: 6px; font-size: 12px; font-weight: 600; color: #6b7280; cursor: pointer;
}
.urgency-btn.active { border-color: #42ae1a; background: #e8f5e9; color: #2e7d32; }
.urgency--amber.active { border-color: #f59e0b; background: #fffbe3; color: #b45309; }
.urgency--red.active { border-color: #ef4444; background: #fef2f2; color: #b91c1c; }

/* Radio list */
.radio-group { display: flex; flex-direction: column; gap: 6px; }
.radio-label { font-size: 12.5px; color: #4b5563; display: flex; align-items: center; gap: 8px; cursor: pointer; }

/* Dropzone de fotos */
.file-dropzone {
  border: 1px dashed #d1d5db; border-radius: 8px; padding: 14px; text-align: center; background: #fafafa;
}
.file-input { display: none; }
.file-label { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #6b7280; font-size: 12px; cursor: pointer; }
.file-label i { font-size: 20px; color: #42ae1a; }
.file-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
.file-chip { background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500; }

/* Footer */
.modal-footer {
  padding: 16px 24px; border-top: 1px solid #f3f4f6; background: #fafafa;
  display: flex; justify-content: flex-end; gap: 10px;
}
.btn-cancel { background: #fff; border: 1px solid #d1d5db; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
.btn-submit { background: #42ae1a; color: #fff; border: none; padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.btn-submit:hover:not(:disabled) { background: #379614; }

/* Estado Exitoso */
.success-state { padding: 40px 24px; text-align: center; }
.success-icon { font-size: 48px; color: #42ae1a; margin-bottom: 12px; }
.success-state h3 { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 8px; }
.success-state p { font-size: 13.5px; color: #6b7280; margin: 0; }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>