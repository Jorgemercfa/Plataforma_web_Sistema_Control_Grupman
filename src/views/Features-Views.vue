<script setup>
/**
 * views/publico/FuncionalidadesView.vue
 *
 * Manual de usuario interactivo del sistema.
 * Ruta base: /  |  Layout: LayoutPublico.vue
 *
 * El contenido (módulos + preguntas) vive en data/manual.js para poder
 * reutilizarlo después como ayuda contextual dentro de admin/tecnico/cliente.
 */
import { ref, computed } from 'vue'
import manual from '@/data/Manual.js'

const roles = [
  { id: 'todos', label: 'Todos' },
  { id: 'admin', label: 'Administración' },
  { id: 'tecnico', label: 'Técnico de campo' },
  { id: 'cliente', label: 'Portal de clientes' },
]

const rolActivo = ref('todos')
const moduloActivoId = ref(manual[0].id)
const preguntaAbierta = ref(null)

const modulosFiltrados = computed(() =>
  rolActivo.value === 'todos'
    ? manual
    : manual.filter((m) => m.rol === rolActivo.value)
)

const moduloActivo = computed(
  () =>
    modulosFiltrados.value.find((m) => m.id === moduloActivoId.value) ||
    modulosFiltrados.value[0]
)

function seleccionarRol(rolId) {
  rolActivo.value = rolId
  const disponibles = rolId === 'todos' ? manual : manual.filter((m) => m.rol === rolId)
  if (disponibles.length) {
    moduloActivoId.value = disponibles[0].id
  }
  preguntaAbierta.value = null
}

function seleccionarModulo(id) {
  moduloActivoId.value = id
  preguntaAbierta.value = null
}

function togglePregunta(idx) {
  preguntaAbierta.value = preguntaAbierta.value === idx ? null : idx
}

const nombreRol = {
  admin: 'Administración',
  tecnico: 'Técnico de campo',
  cliente: 'Portal de clientes',
}
</script>

<template>
  <section class="manual">
  <RouterLink to="/" class="return-main-view">Regresar</RouterLink>
    <header class="manual-header">
      <span class="eyebrow">Manual de usuario</span>
      <h1>Cómo funciona la plataforma</h1>
      <p class="subtitle">
        Guía paso a paso de cada módulo. Elige tu rol y busca la pregunta que necesitas resolver.
      </p>

      <div class="rol-tabs" role="tablist" aria-label="Filtrar por rol">
        <button
          v-for="rol in roles"
          :key="rol.id"
          type="button"
          role="tab"
          :aria-selected="rolActivo === rol.id"
          class="rol-tab"
          :class="{ activo: rolActivo === rol.id }"
          @click="seleccionarRol(rol.id)"
        >
          {{ rol.label }}
        </button>
      </div>
    </header>

    <div class="manual-body">
      <nav class="sidebar" aria-label="Módulos">
        <button
          v-for="modulo in modulosFiltrados"
          :key="modulo.id"
          type="button"
          class="sidebar-item"
          :class="{ activo: moduloActivo && modulo.id === moduloActivo.id }"
          @click="seleccionarModulo(modulo.id)"
        >
          <span class="sidebar-icon" v-html="modulo.icono" aria-hidden="true" />
          <span>
            {{ modulo.titulo }}
            <small>{{ nombreRol[modulo.rol] }}</small>
          </span>
        </button>
      </nav>

      <div class="contenido" v-if="moduloActivo">
        <div class="contenido-header">
          <span class="contenido-icon" v-html="moduloActivo.icono" aria-hidden="true" />
          <div>
            <h2>{{ moduloActivo.titulo }}</h2>
            <p>{{ moduloActivo.descripcion }}</p>
          </div>
        </div>

        <div class="faq-list">
          <div
            v-for="(item, idx) in moduloActivo.preguntas"
            :key="idx"
            class="faq-item"
          >
            <button
              type="button"
              class="faq-pregunta"
              :aria-expanded="preguntaAbierta === idx"
              @click="togglePregunta(idx)"
            >
              <span>{{ item.q }}</span>
              <svg
                class="chevron"
                :class="{ abierta: preguntaAbierta === idx }"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div v-show="preguntaAbierta === idx" class="faq-respuesta">
              <p>{{ item.a }}</p>
              <ol v-if="item.pasos && item.pasos.length" class="faq-pasos">
                <li v-for="(paso, pIdx) in item.pasos" :key="pIdx">{{ paso }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manual {
  --verde: #16a34a;
  --verde-suave: #eafaf0;
  --texto: #0f172a;
  --texto-secundario: #475569;
  --borde: #e2e8f0;
  --fondo-suave: #f8fafc;

  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 24px 96px;
  color: var(--texto);
}

.manual-header {
  max-width: 640px;
  margin-bottom: 40px;
}

.return-main-view {
  display: inline-block;
  font-size: 14px;
  color: var(--verde);
  text-decoration: none;
  margin-bottom: 12px;
}

.eyebrow {
  display: inline-block;
  background: var(--verde-suave);
  color: var(--verde);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.manual-header h1 {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 12px;
}

.subtitle {
  font-size: 16px;
  color: var(--texto-secundario);
  line-height: 1.6;
  margin: 0 0 28px;
}

.rol-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rol-tab {
  border: 1px solid var(--borde);
  background: #fff;
  color: var(--texto-secundario);
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.rol-tab:hover {
  border-color: var(--verde);
  color: var(--verde);
}

.rol-tab.activo {
  background: var(--verde);
  border-color: var(--verde);
  color: #fff;
}

.manual-body {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--fondo-suave);
  border: 1px solid var(--borde);
  border-radius: 16px;
  padding: 10px;
  position: sticky;
  top: 24px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--texto);
  cursor: pointer;
  transition: background 0.15s ease;
}

.sidebar-item small {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--texto-secundario);
}

.sidebar-item:hover {
  background: #fff;
}

.sidebar-item.activo {
  background: #fff;
  box-shadow: inset 3px 0 0 var(--verde);
}

.sidebar-icon,
.contenido-icon {
  display: inline-flex;
  color: var(--verde);
  flex-shrink: 0;
}

.contenido {
  background: #fff;
  border: 1px solid var(--borde);
  border-radius: 16px;
  padding: 28px 32px;
}

.contenido-header {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--borde);
}

.contenido-icon {
  width: 40px;
  height: 40px;
  background: var(--verde-suave);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}

.contenido-header h2 {
  font-size: 22px;
  margin: 0 0 4px;
}

.contenido-header p {
  font-size: 14px;
  color: var(--texto-secundario);
  margin: 0;
  line-height: 1.6;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.faq-item {
  border: 1px solid var(--borde);
  border-radius: 12px;
  overflow: hidden;
}

.faq-pregunta {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: var(--fondo-suave);
  border: none;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--texto);
  text-align: left;
  cursor: pointer;
}

.chevron {
  flex-shrink: 0;
  color: var(--texto-secundario);
  transition: transform 0.15s ease;
}

.chevron.abierta {
  transform: rotate(180deg);
  color: var(--verde);
}

.faq-respuesta {
  padding: 14px 16px 18px;
  font-size: 14px;
  color: var(--texto-secundario);
  line-height: 1.6;
}

.faq-respuesta p {
  margin: 0 0 8px;
}

.faq-pasos {
  margin: 8px 0 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 780px) {
  .manual-body {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: static;
    flex-direction: row;
    overflow-x: auto;
  }
  .sidebar-item small {
    display: none;
  }
}
</style>