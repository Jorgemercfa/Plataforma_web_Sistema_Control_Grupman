<script setup>
import { ref } from 'vue';
import layoutNavbarOperator from '../../components/operatorComponets/layoutNavbarOperator.vue';

/* ── Estado del escáner ───────────────────────────── */
const estado = ref('idle'); // idle | scanning | resultado | error
const codigoManual = ref('');

/* ── Estación encontrada (mock) ───────────────────── */
const estacion = ref(null);

const estacionesMock = {
  'EST-001': { codigo:'EST-001', tipo:'Cebadero',       ubicacion:'Entrada principal', local:'Almacenes San Martín', cliente:'Almacenes San Martín', ultimaRevision:'18 Jun 2026', estado:'activa' },
  'EST-002': { codigo:'EST-002', tipo:'Cebadero',       ubicacion:'Zona de carga',     local:'Almacenes San Martín', cliente:'Almacenes San Martín', ultimaRevision:'18 Jun 2026', estado:'activa' },
  'EST-003': { codigo:'EST-003', tipo:'Trampa pegante', ubicacion:'Esquina NE',        local:'Almacenes San Martín', cliente:'Almacenes San Martín', ultimaRevision:'18 Jun 2026', estado:'activa' },
};

/* ── Formulario de hallazgo ───────────────────────── */
const hallazgo = ref({
  consumoBait:    'sin_consumo',
  plagasVivas:    false,
  plagasMuertas:  false,
  reposicion:     false,
  observaciones:  '',
});

const guardando  = ref(false);
const guardado   = ref(false);

/* ── Simular escaneo ──────────────────────────────── */
const simularEscaneo = () => {
  estado.value = 'scanning';
  setTimeout(() => {
    const codigos = Object.keys(estacionesMock);
    const codigo  = codigos[Math.floor(Math.random() * codigos.length)];
    procesarCodigo(codigo);
  }, 1800);
};

const buscarManual = () => {
  if (!codigoManual.value.trim()) return;
  procesarCodigo(codigoManual.value.trim().toUpperCase());
};

const procesarCodigo = (codigo) => {
  const e = estacionesMock[codigo];
  if (e) {
    estacion.value = e;
    estado.value   = 'resultado';
  } else {
    estado.value   = 'error';
  }
};

const reiniciar = () => {
  estado.value      = 'idle';
  estacion.value    = null;
  codigoManual.value = '';
  guardado.value    = false;
  hallazgo.value    = { consumoBait:'sin_consumo', plagasVivas:false, plagasMuertas:false, reposicion:false, observaciones:'' };
};

const guardarHallazgo = async () => {
  guardando.value = true;
  await new Promise(r => setTimeout(r, 1000));
  guardando.value = false;
  guardado.value  = true;
};

const tipoIcon = {
  'Cebadero':       '🟫',
  'Trampa pegante': '🟨',
  'Trampa luz':     '💡',
  'Dispensador':    '🔵',
};
</script>

<template>
  <layoutNavbarOperator>
    <div class="qr-page">

      <div class="page-header">
        <h1 class="page-title">Escanear estación</h1>
        <p class="page-sub">Apunta la cámara al código QR de la estación</p>
      </div>

      <!-- ── IDLE / SCANNING ── -->
      <div v-if="estado === 'idle' || estado === 'scanning'" class="scanner-area">

        <!-- Visor de cámara (simulado) -->
        <div class="visor" :class="{ 'visor--scanning': estado === 'scanning' }">
          <div class="visor-corners">
            <span class="corner corner--tl"></span>
            <span class="corner corner--tr"></span>
            <span class="corner corner--bl"></span>
            <span class="corner corner--br"></span>
          </div>
          <div v-if="estado === 'scanning'" class="scan-line"></div>
          <div class="visor-center">
            <template v-if="estado === 'idle'">
              <i class="ti ti-qrcode visor-icon" aria-hidden="true"></i>
              <span class="visor-hint">QR de la estación</span>
            </template>
            <template v-else>
              <div class="scanning-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="visor-hint">Leyendo código…</span>
            </template>
          </div>
        </div>

        <!-- Botón escanear -->
        <button
          class="btn-escanear"
          @click="simularEscaneo"
          :disabled="estado === 'scanning'"
        >
          <i class="ti ti-camera" aria-hidden="true"></i>
          {{ estado === 'scanning' ? 'Escaneando…' : 'Activar cámara' }}
        </button>

        <!-- Separador -->
        <div class="separador">
          <span>o ingresa el código manualmente</span>
        </div>

        <!-- Entrada manual -->
        <div class="manual-wrap">
          <input
            v-model="codigoManual"
            class="manual-input"
            type="text"
            placeholder="Ej: EST-001"
            @keyup.enter="buscarManual"
          />
          <button class="btn-buscar" @click="buscarManual">
            <i class="ti ti-search" aria-hidden="true"></i>
          </button>
        </div>

      </div>

      <!-- ── ERROR ── -->
      <div v-if="estado === 'error'" class="estado-card estado-card--error">
        <div class="estado-icon">❌</div>
        <h2>Código no encontrado</h2>
        <p>El código "{{ codigoManual }}" no corresponde a ninguna estación registrada.</p>
        <button class="btn-reiniciar" @click="reiniciar">Intentar de nuevo</button>
      </div>

      <!-- ── RESULTADO ── -->
      <div v-if="estado === 'resultado' && estacion" class="resultado">

        <!-- Info de la estación -->
        <div class="estacion-card">
          <div class="estacion-header">
            <span class="estacion-tipo-icon">{{ tipoIcon[estacion.tipo] || '📍' }}</span>
            <div>
              <div class="estacion-codigo">{{ estacion.codigo }}</div>
              <div class="estacion-tipo">{{ estacion.tipo }}</div>
            </div>
            <span class="badge-ok">✅ Encontrada</span>
          </div>
          <div class="estacion-rows">
            <div class="estacion-row">
              <span class="est-label">Ubicación</span>
              <span class="est-val">{{ estacion.ubicacion }}</span>
            </div>
            <div class="estacion-row">
              <span class="est-label">Local</span>
              <span class="est-val">{{ estacion.local }}</span>
            </div>
            <div class="estacion-row">
              <span class="est-label">Última revisión</span>
              <span class="est-val">{{ estacion.ultimaRevision }}</span>
            </div>
          </div>
        </div>

        <!-- Formulario de hallazgo -->
        <div v-if="!guardado" class="hallazgo-form">
          <div class="hallazgo-title">Registrar hallazgo</div>

          <!-- Consumo de cebo -->
          <div class="campo-grupo">
            <label class="campo-label">Consumo de cebo</label>
            <div class="radio-group">
              <label
                v-for="op in [
                  { val:'sin_consumo', label:'Sin consumo' },
                  { val:'parcial',     label:'Parcial'     },
                  { val:'total',       label:'Total'       },
                ]"
                :key="op.val"
                class="radio-item"
                :class="{ 'radio-item--active': hallazgo.consumoBait === op.val }"
              >
                <input type="radio" v-model="hallazgo.consumoBait" :value="op.val" hidden />
                {{ op.label }}
              </label>
            </div>
          </div>

          <!-- Checkboxes -->
          <div class="campo-grupo">
            <label class="campo-label">Hallazgos</label>
            <div class="toggle-list">
              <label class="toggle-item">
                <input type="checkbox" v-model="hallazgo.plagasVivas" />
                <span class="toggle-slider"></span>
                <span>Plagas vivas</span>
              </label>
              <label class="toggle-item">
                <input type="checkbox" v-model="hallazgo.plagasMuertas" />
                <span class="toggle-slider"></span>
                <span>Plagas muertas / capturadas</span>
              </label>
              <label class="toggle-item">
                <input type="checkbox" v-model="hallazgo.reposicion" />
                <span class="toggle-slider"></span>
                <span>Reposición de cebo</span>
              </label>
            </div>
          </div>

          <!-- Observaciones -->
          <div class="campo-grupo">
            <label class="campo-label">Observaciones</label>
            <textarea
              v-model="hallazgo.observaciones"
              class="textarea"
              rows="2"
              placeholder="Descripción adicional del hallazgo…"
            ></textarea>
          </div>

          <div class="hallazgo-actions">
            <button class="btn-cancelar" @click="reiniciar">Cancelar</button>
            <button
              class="btn-guardar"
              :class="{ 'btn-guardar--loading': guardando }"
              @click="guardarHallazgo"
            >
              <i class="ti ti-check" aria-hidden="true"></i>
              {{ guardando ? 'Guardando…' : 'Guardar hallazgo' }}
            </button>
          </div>
        </div>

        <!-- Guardado con éxito -->
        <div v-else class="guardado-ok">
          <div class="guardado-icon">✅</div>
          <h2>Hallazgo registrado</h2>
          <p>La estación {{ estacion.codigo }} fue marcada como revisada.</p>
          <button class="btn-otro" @click="reiniciar">
            <i class="ti ti-qrcode" aria-hidden="true"></i>
            Escanear otra estación
          </button>
        </div>

      </div>

    </div>
  </layoutNavbarOperator>
</template>

<style scoped>
.qr-page {
  font-family: 'Inter','Segoe UI',sans-serif;
  color: #111827;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-title { font-size:20px; font-weight:700; margin:0 0 4px; }
.page-sub   { font-size:13px; color:#6b7280; margin:0; }

/* ── Visor ───────────────────────────────────────── */
.scanner-area {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.visor {
  position: relative;
  background: #1b2e1c;
  border-radius: 20px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.visor--scanning .visor-center { opacity: 0.7; }

/* Esquinas */
.visor-corners { position:absolute; inset:20px; }
.corner {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: #42ae1a;
  border-style: solid;
}
.corner--tl { top:0; left:0;  border-width:3px 0 0 3px; border-radius:4px 0 0 0; }
.corner--tr { top:0; right:0; border-width:3px 3px 0 0; border-radius:0 4px 0 0; }
.corner--bl { bottom:0; left:0;  border-width:0 0 3px 3px; border-radius:0 0 0 4px; }
.corner--br { bottom:0; right:0; border-width:0 3px 3px 0; border-radius:0 0 4px 0; }

/* Línea de escaneo */
.scan-line {
  position: absolute;
  left: 20px; right: 20px;
  height: 2px;
  background: #42ae1a;
  box-shadow: 0 0 8px #42ae1a;
  animation: scanMove 1.5s ease-in-out infinite alternate;
}

@keyframes scanMove {
  from { top: 30px; }
  to   { top: calc(100% - 30px); }
}

.visor-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
}

.visor-icon { font-size: 48px; color: rgba(255,255,255,0.3); }
.visor-hint { font-size: 13px; color: rgba(255,255,255,0.5); }

.scanning-dots {
  display: flex;
  gap: 6px;
}

.scanning-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #42ae1a;
  animation: pulse 1s ease-in-out infinite;
}

.scanning-dots span:nth-child(2) { animation-delay: 0.2s; }
.scanning-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1.2); }
}

/* Botones principales */
.btn-escanear {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #42ae1a;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 15px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  width: 100%;
}
.btn-escanear:disabled { opacity: 0.6; pointer-events: none; }
.btn-escanear:hover { background: #379614; }

.separador {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #9ca3af;
  font-size: 12px;
}
.separador::before, .separador::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.manual-wrap {
  display: flex;
  gap: 8px;
}

.manual-input {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 14px;
  outline: none;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: .06em;
  transition: border-color 0.15s;
}
.manual-input:focus { border-color: #42ae1a; }

.btn-buscar {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #e8f5e9;
  color: #2e7d32;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Error */
.estado-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.estado-card--error { border-color: #fecaca; background: #fff5f5; }
.estado-icon { font-size: 40px; }
.estado-card h2 { font-size: 17px; font-weight: 700; margin: 0; }
.estado-card p  { font-size: 13px; color: #6b7280; margin: 0; }

.btn-reiniciar {
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 6px;
}

/* Resultado */
.resultado { display: flex; flex-direction: column; gap: 14px; }

.estacion-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
}

.estacion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.estacion-tipo-icon { font-size: 28px; }
.estacion-codigo { font-size: 15px; font-weight: 700; color: #111827; }
.estacion-tipo   { font-size: 13px; color: #6b7280; }
.badge-ok { margin-left: auto; font-size: 12px; font-weight: 600; background: #e8f5e9; color: #2e7d32; padding: 4px 10px; border-radius: 100px; }

.estacion-rows { display: flex; flex-direction: column; gap: 8px; }
.estacion-row  { display: flex; justify-content: space-between; font-size: 13px; }
.est-label { color: #9ca3af; }
.est-val   { color: #374151; font-weight: 500; text-align: right; }

/* Hallazgo form */
.hallazgo-form {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hallazgo-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.campo-grupo { display: flex; flex-direction: column; gap: 8px; }
.campo-label { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .04em; }

/* Radio */
.radio-group { display: flex; gap: 6px; }
.radio-item {
  flex: 1;
  text-align: center;
  padding: 8px 6px;
  border: 1.5px solid #e5e7eb;
  border-radius: 9px;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  color: #374151;
}
.radio-item--active { background: #42ae1a; border-color: #42ae1a; color: #fff; font-weight: 700; }

/* Toggles */
.toggle-list { display: flex; flex-direction: column; gap: 10px; }
.toggle-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13.5px;
  cursor: pointer;
}

.toggle-item input { display: none; }

.toggle-slider {
  width: 40px;
  height: 22px;
  background: #d1d5db;
  border-radius: 100px;
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s;
}

.toggle-slider::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.toggle-item input:checked + .toggle-slider {
  background: #42ae1a;
}

.toggle-item input:checked + .toggle-slider::after {
  transform: translateX(18px);
}

/* Textarea */
.textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
}
.textarea:focus { border-color: #42ae1a; }

.hallazgo-actions {
  display: flex;
  gap: 10px;
}

.btn-cancelar {
  flex: 1;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}

.btn-guardar {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #42ae1a;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-guardar:hover { background: #379614; }
.btn-guardar--loading { opacity: 0.7; pointer-events: none; }

/* Guardado */
.guardado-ok {
  background: #fff;
  border: 1px solid #bbf7d0;
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.guardado-icon { font-size: 40px; }
.guardado-ok h2 { font-size: 17px; font-weight: 700; margin: 0; }
.guardado-ok p  { font-size: 13px; color: #6b7280; margin: 0; }

.btn-otro {
  display: flex;
  align-items: center;
  gap: 7px;
  background: #42ae1a;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 11px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 6px;
}
</style>