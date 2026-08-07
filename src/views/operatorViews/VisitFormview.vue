<script setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import layoutNavbarOperator from '../../components/operatorComponets/layoutNavbarOperator.vue';

const route  = useRoute();

/* ── Datos mock ───────────────────────────────────── */
const visita = ref({
  id: route.params.id,
  cliente: 'Almacenes San Martín',
  local: 'Almacén Central',
  tipo: 'Desratización',
});

const productosDisponibles = [
  { id:1, nombre:'Rodenticida brodifacoum', unidad:'kg' },
  { id:2, nombre:'Cipermetrina 25% EC',     unidad:'ml' },
  { id:3, nombre:'Bromadiolona 0.005%',     unidad:'kg' },
  { id:4, nombre:'Hipoclorito de sodio',    unidad:'ml' },
];

const plagasOpciones = ['Ratas', 'Ratones', 'Cucarachas', 'Moscas', 'Mosquitos', 'Hormigas', 'Otros'];

/* ── Formulario ───────────────────────────────────── */
const form = reactive({
  serviciosRealizados: {
    desinsectacion: false,
    desratizacion:  true,
    desinfeccion:   false,
  },
  plagasEncontradas: [
    { nombre: '', nivel: 'bajo' },
  ],
  productosUsados: [
    { productoId: '', cantidad: '', unidad: '' },
  ],
  observaciones: '',
  fotos: [],
  firmado: false,
});

/* ── Plagas ───────────────────────────────────────── */
const agregarPlaga = () => {
  form.plagasEncontradas.push({ nombre: '', nivel: 'bajo' });
};

const quitarPlaga = (i) => {
  form.plagasEncontradas.splice(i, 1);
};

/* ── Productos ────────────────────────────────────── */
const agregarProducto = () => {
  form.productosUsados.push({ productoId: '', cantidad: '', unidad: '' });
};

const quitarProducto = (i) => {
  form.productosUsados.splice(i, 1);
};

const onProductoChange = (i) => {
  const prod = productosDisponibles.find(p => p.id == form.productosUsados[i].productoId);
  if (prod) form.productosUsados[i].unidad = prod.unidad;
};

/* ── Firma ────────────────────────────────────────── */
const firmaCanvas = ref(null);
const dibujando   = ref(false);
let lastX = 0, lastY = 0;

const iniciarFirma = (e) => {
  dibujando.value = true;
  const rect = firmaCanvas.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  lastX = clientX - rect.left;
  lastY = clientY - rect.top;
};

const dibujarFirma = (e) => {
  if (!dibujando.value) return;
  e.preventDefault();
  const rect = firmaCanvas.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const ctx = firmaCanvas.value.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.stroke();
  lastX = x; lastY = y;
};

const terminarFirma = () => {
  dibujando.value = false;
  form.firmado = true;
};

const limpiarFirma = () => {
  const ctx = firmaCanvas.value.getContext('2d');
  ctx.clearRect(0, 0, firmaCanvas.value.width, firmaCanvas.value.height);
  form.firmado = false;
};

/* ── Envío ────────────────────────────────────────── */
const enviando  = ref(false);
const enviado   = ref(false);

const enviarFormulario = async () => {
  enviando.value = true;
  await new Promise(r => setTimeout(r, 1500));
  enviado.value  = true;
  enviando.value = false;
};

const step = ref(1);
const totalSteps = 4;
</script>

<template>
  <layoutNavbarOperator>
    <div class="formulario-page">

      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link :to="`/tecnico/visita/${visita.id}`" class="back-btn">
          <i class="ti ti-arrow-left" aria-hidden="true"></i> Detalle de visita
        </router-link>
      </div>

      <!-- Header -->
      <div class="form-header">
        <h1 class="form-title">Formulario de cierre</h1>
        <div class="form-sub">{{ visita.cliente }} · {{ visita.local }}</div>
      </div>

      <!-- Stepper -->
      <div class="stepper">
        <div
          v-for="n in totalSteps"
          :key="n"
          class="step"
          :class="{ 'step--active': step === n, 'step--done': step > n }"
          @click="step = n"
        >
          <div class="step-dot">
            <i v-if="step > n" class="ti ti-check" aria-hidden="true"></i>
            <span v-else>{{ n }}</span>
          </div>
          <span class="step-label">{{
            ['Servicios','Plagas','Productos','Firma'][n-1]
          }}</span>
        </div>
      </div>

      <!-- ── STEP 1: Servicios realizados ── -->
      <div v-if="step === 1" class="step-content">
        <div class="section-title">¿Qué servicios realizaste?</div>
        <div class="checkbox-list">
          <label class="checkbox-item" :class="{ 'checkbox-item--checked': form.serviciosRealizados.desinsectacion }">
            <input type="checkbox" v-model="form.serviciosRealizados.desinsectacion" />
            <span class="check-icon"><i class="ti ti-check" aria-hidden="true"></i></span>
            <span class="check-emoji">🦟</span>
            <span class="check-label">Desinsectación</span>
          </label>
          <label class="checkbox-item" :class="{ 'checkbox-item--checked': form.serviciosRealizados.desratizacion }">
            <input type="checkbox" v-model="form.serviciosRealizados.desratizacion" />
            <span class="check-icon"><i class="ti ti-check" aria-hidden="true"></i></span>
            <span class="check-emoji">🐀</span>
            <span class="check-label">Desratización</span>
          </label>
          <label class="checkbox-item" :class="{ 'checkbox-item--checked': form.serviciosRealizados.desinfeccion }">
            <input type="checkbox" v-model="form.serviciosRealizados.desinfeccion" />
            <span class="check-icon"><i class="ti ti-check" aria-hidden="true"></i></span>
            <span class="check-emoji">💧</span>
            <span class="check-label">Desinfección</span>
          </label>
        </div>

        <div class="section-title" style="margin-top:20px">Observaciones generales</div>
        <textarea
          v-model="form.observaciones"
          class="textarea"
          rows="3"
          placeholder="Describe el estado general del local, accesos, condiciones encontradas…"
        ></textarea>
      </div>

      <!-- ── STEP 2: Plagas encontradas ── -->
      <div v-if="step === 2" class="step-content">
        <div class="section-title">Plagas encontradas</div>
        <div class="plaga-list">
          <div v-for="(p, i) in form.plagasEncontradas" :key="i" class="plaga-item">
            <select v-model="p.nombre" class="select-field">
              <option value="">Seleccionar plaga</option>
              <option v-for="pl in plagasOpciones" :key="pl" :value="pl">{{ pl }}</option>
            </select>
            <div class="nivel-group">
              <button
                v-for="nv in ['bajo','medio','alto']"
                :key="nv"
                class="nivel-btn"
                :class="`nivel-btn--${nv} ${p.nivel === nv ? 'nivel-btn--active' : ''}`"
                @click="p.nivel = nv"
                type="button"
              >{{ nv }}</button>
            </div>
            <button class="btn-quitar" @click="quitarPlaga(i)" v-if="form.plagasEncontradas.length > 1">
              <i class="ti ti-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <button class="btn-agregar" @click="agregarPlaga">
          <i class="ti ti-plus" aria-hidden="true"></i> Agregar plaga
        </button>
      </div>

      <!-- ── STEP 3: Productos usados ── -->
      <div v-if="step === 3" class="step-content">
        <div class="section-title">Productos utilizados</div>
        <div class="producto-list">
          <div v-for="(p, i) in form.productosUsados" :key="i" class="producto-item">
            <select
              v-model="p.productoId"
              class="select-field"
              @change="onProductoChange(i)"
            >
              <option value="">Seleccionar producto</option>
              <option v-for="pd in productosDisponibles" :key="pd.id" :value="pd.id">
                {{ pd.nombre }}
              </option>
            </select>
            <div class="cantidad-row">
              <input
                v-model="p.cantidad"
                type="number"
                class="input-field input-small"
                placeholder="Cant."
                min="0"
              />
              <span class="unidad-tag">{{ p.unidad || 'u.' }}</span>
              <button class="btn-quitar" @click="quitarProducto(i)" v-if="form.productosUsados.length > 1">
                <i class="ti ti-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <button class="btn-agregar" @click="agregarProducto">
          <i class="ti ti-plus" aria-hidden="true"></i> Agregar producto
        </button>

        <!-- Fotos -->
        <div class="section-title" style="margin-top:20px">Fotos de evidencia</div>
        <label class="foto-upload">
          <i class="ti ti-camera" aria-hidden="true"></i>
          <span>Tomar foto o seleccionar</span>
          <input type="file" accept="image/*" capture="environment" multiple hidden />
        </label>
        <div class="foto-preview" v-if="form.fotos.length > 0">
          <!-- Preview de fotos subidas -->
        </div>
      </div>

      <!-- ── STEP 4: Firma ── -->
      <div v-if="step === 4" class="step-content">

        <!-- Pantalla de éxito -->
        <div v-if="enviado" class="success-screen">
          <div class="success-icon">✅</div>
          <h2>¡Visita completada!</h2>
          <p>El formulario fue enviado. El certificado se generará automáticamente.</p>
          <router-link to="/tecnico/mis-visitas" class="btn-volver">
            Volver a mis visitas
          </router-link>
        </div>

        <template v-else>
          <div class="section-title">Firma del responsable</div>
          <p class="firma-instruccion">Pide al responsable del local que firme en el recuadro de abajo.</p>

          <div class="firma-wrap">
            <canvas
              ref="firmaCanvas"
              class="firma-canvas"
              width="320"
              height="160"
              @mousedown="iniciarFirma"
              @mousemove="dibujarFirma"
              @mouseup="terminarFirma"
              @touchstart.prevent="iniciarFirma"
              @touchmove.prevent="dibujarFirma"
              @touchend="terminarFirma"
            ></canvas>
            <div class="firma-linea"></div>
            <div class="firma-footer">
              <span>Firma del cliente</span>
              <button class="btn-limpiar" @click="limpiarFirma">Limpiar</button>
            </div>
          </div>

          <button
            class="btn-enviar"
            :class="{ 'btn-enviar--loading': enviando }"
            :disabled="enviando"
            @click="enviarFormulario"
          >
            <i class="ti ti-send" aria-hidden="true"></i>
            {{ enviando ? 'Enviando...' : 'Enviar y completar visita' }}
          </button>
        </template>
      </div>

      <!-- Navegación entre steps -->
      <div class="step-nav" v-if="!enviado">
        <button
          class="btn-nav btn-nav--back"
          v-if="step > 1"
          @click="step--"
        >
          <i class="ti ti-arrow-left" aria-hidden="true"></i> Anterior
        </button>
        <button
          class="btn-nav btn-nav--next"
          v-if="step < totalSteps"
          @click="step++"
        >
          Siguiente <i class="ti ti-arrow-right" aria-hidden="true"></i>
        </button>
      </div>

    </div>
  </layoutNavbarOperator>
</template>

<style scoped>
.formulario-page {
  font-family: 'Inter','Segoe UI',sans-serif;
  color: #111827;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.back-btn { display:inline-flex; align-items:center; gap:6px; color:#42ae1a; font-size:13px; font-weight:500; text-decoration:none; }

.form-header { }
.form-title { font-size:20px; font-weight:700; margin:0 0 4px; }
.form-sub   { font-size:13px; color:#6b7280; }

/* Stepper */
.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
  gap: 4px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex: 1;
  cursor: pointer;
}

.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.2s;
}

.step--active .step-dot { background: #42ae1a; color: #fff; }
.step--done   .step-dot { background: #e8f5e9; color: #2e7d32; }

.step-label {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: .04em;
}

.step--active .step-label { color: #42ae1a; }
.step--done   .step-label { color: #4caf50; }

/* Step content */
.step-content {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
}

/* Checkboxes servicios */
.checkbox-list { display:flex; flex-direction:column; gap:8px; }

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.checkbox-item input { display: none; }

.checkbox-item--checked {
  border-color: #42ae1a;
  background: #f0fdf0;
}

.check-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: transparent;
  flex-shrink: 0;
  transition: all 0.15s;
}

.checkbox-item--checked .check-icon {
  background: #42ae1a;
  border-color: #42ae1a;
  color: #fff;
}

.check-emoji { font-size: 20px; }
.check-label { font-size: 14px; font-weight: 500; }

/* Textarea */
.textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13.5px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  color: #374151;
  transition: border-color 0.15s;
}
.textarea:focus { border-color: #42ae1a; }

/* Plagas */
.plaga-list { display:flex; flex-direction:column; gap:10px; }
.plaga-item { display:flex; flex-direction:column; gap:8px; background:#f9fafb; border-radius:10px; padding:12px; }

.select-field {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 13.5px;
  color: #374151;
  background: #fff;
  outline: none;
  box-sizing: border-box;
}

.nivel-group { display:flex; gap:6px; }

.nivel-btn {
  flex: 1;
  padding: 7px;
  border-radius: 8px;
  border: 1.5px solid #e5e7eb;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: #fff;
  text-transform: capitalize;
  transition: all 0.15s;
}

.nivel-btn--bajo.nivel-btn--active   { background:#e8f5e9; border-color:#42ae1a; color:#2e7d32; }
.nivel-btn--medio.nivel-btn--active  { background:#fff8e1; border-color:#f59e0b; color:#92400e; }
.nivel-btn--alto.nivel-btn--active   { background:#ffebee; border-color:#ef4444; color:#b91c1c; }

/* Productos */
.producto-list { display:flex; flex-direction:column; gap:10px; }
.producto-item { display:flex; flex-direction:column; gap:8px; background:#f9fafb; border-radius:10px; padding:12px; }

.cantidad-row { display:flex; align-items:center; gap:8px; }

.input-field {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 13.5px;
  color: #374151;
  outline: none;
  box-sizing: border-box;
  width: 100%;
}

.input-small { width: 80px; flex-shrink: 0; }

.unidad-tag {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
}

.btn-quitar {
  background: #ffebee;
  border: none;
  border-radius: 8px;
  padding: 8px;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;
}

.btn-agregar {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1.5px dashed #d1d5db;
  border-radius: 10px;
  padding: 10px;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: all 0.15s;
}
.btn-agregar:hover { border-color: #42ae1a; color: #42ae1a; }

/* Foto upload */
.foto-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1.5px dashed #d1d5db;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #6b7280;
  transition: all 0.15s;
}
.foto-upload:hover { border-color: #42ae1a; color: #42ae1a; }
.foto-upload .ti { font-size: 24px; }

/* Firma */
.firma-instruccion { font-size: 13px; color: #6b7280; margin: 0; }

.firma-wrap {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
}

.firma-canvas {
  display: block;
  width: 100%;
  height: 160px;
  background: #fff;
  border-radius: 8px;
  cursor: crosshair;
  touch-action: none;
}

.firma-linea {
  height: 1px;
  background: #d1d5db;
  margin: 8px 0 6px;
}

.firma-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #9ca3af;
}

.btn-limpiar {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
}

/* Enviar */
.btn-enviar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #42ae1a;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-enviar:hover { background: #379614; }
.btn-enviar--loading { opacity: 0.7; pointer-events: none; }

/* Success */
.success-screen {
  text-align: center;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.success-icon { font-size: 52px; }
.success-screen h2 { font-size: 20px; font-weight: 700; margin: 0; }
.success-screen p  { font-size: 14px; color: #6b7280; margin: 0; }
.btn-volver {
  background: #42ae1a;
  color: #fff;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 8px;
}

/* Nav steps */
.step-nav {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.btn-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s;
}

.btn-nav--back { background: #f3f4f6; color: #374151; }
.btn-nav--back:hover { background: #e5e7eb; }
.btn-nav--next { background: #42ae1a; color: #fff; margin-left: auto; }
.btn-nav--next:hover { background: #379614; }
</style>