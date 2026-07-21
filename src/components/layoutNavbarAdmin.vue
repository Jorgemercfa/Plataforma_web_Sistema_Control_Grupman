<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

/* ── Sidebar colapsado (solo íconos) ── */
const collapsed = ref(false);
const toggleSidebar = () => { collapsed.value = !collapsed.value; };

/* ── Usuario mock (sin Firebase por ahora) ── */
const usuario = {
  nombre: 'Carlos Mendoza',
  rol: 'Administrador',
  iniciales: 'CM',
};

/* ── Notificaciones mock ── */
const notificaciones = ref(3);

/* ── Menú de navegación ── */
const menu = [
  {
    seccion: 'Operaciones',
    icono: '🛠️',
    items: [
      { label: 'Dashboard',    icon: '▦',  ruta: '/admin/dashboard' },
      { label: 'Clientes',     icon: '🏢', ruta: '/admin/clientes' },
      { label: 'Cotizaciones', icon: '📋', ruta: '/admin/cotizaciones' },
      { label: 'Visitas',      icon: '📅', ruta: '/admin/visitas' },
      { label: 'Inventario',   icon: '📦', ruta: '/admin/inventario' },
      { label: 'Servicios',    icon: '🔧', ruta: '/admin/servicios' },
    ],
  },
  {
    seccion: 'Finanzas',
    icono: '💰',
    items: [
      { label: 'Resumen',      icon: '📊', ruta: '/admin/finanzas' },
      { label: 'Facturas',     icon: '🧾', ruta: '/admin/finanzas/facturas' },
      { label: 'Proveedores',  icon: '🚚', ruta: '/admin/finanzas/proveedores' },
      { label: 'Compras',      icon: '🛒', ruta: '/admin/finanzas/compras' },
      { label: 'Gastos',       icon: '💸', ruta: '/admin/finanzas/gastos' },
      { label: 'Planilla',     icon: '👷', ruta: '/admin/finanzas/planilla' },
    ],
  },
  {
    seccion: 'Gestión humana',
    icono: '👥',
    items: [
      { label: 'Personal',     icon: '👤', ruta: '/admin/personal' },
    ],
  },
];

/* ── Ruta activa ── */
const route = useRoute();
const isActive = (ruta) => route.path === ruta || route.path.startsWith(ruta + '/');

/* ── Sección expandida ── */
const seccionAbierta = ref('Operaciones');
const toggleSeccion = (seccion) => {
  seccionAbierta.value = seccionAbierta.value === seccion ? null : seccion;
};

/* ── Menú usuario ── */
const menuUsuarioAbierto = ref(false);
const toggleMenuUsuario = () => { menuUsuarioAbierto.value = !menuUsuarioAbierto.value; };
</script>

<template>
  <div class="admin-shell" :class="{ 'sidebar-collapsed': collapsed }">

    <!-- ══════════════ SIDEBAR ══════════════ -->
    <aside class="sidebar">

      <!-- Logo + toggle -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span class="logo-mark">P</span>
          <span class="logo-text">PlagasControl</span>
        </div>
        <button class="sidebar-toggle" @click="toggleSidebar" :title="collapsed ? 'Expandir' : 'Colapsar'">
          <span class="toggle-icon">{{ collapsed ? '→' : '←' }}</span>
        </button>
      </div>

      <!-- Navegación -->
      <nav class="sidebar-nav">
        <div
          v-for="grupo in menu"
          :key="grupo.seccion"
          class="nav-grupo"
        >
          <!-- Cabecera de sección -->
          <button
            class="nav-seccion"
            @click="toggleSeccion(grupo.seccion)"
            :class="{ 'nav-seccion--open': seccionAbierta === grupo.seccion }"
            :title="collapsed ? grupo.seccion : ''"
          >
            <span class="nav-seccion-icon">{{ grupo.icono }}</span>
            <span class="nav-seccion-label">{{ grupo.seccion }}</span>
            <span class="nav-seccion-arrow">
              {{ seccionAbierta === grupo.seccion ? '▾' : '▸' }}
            </span>
          </button>

          <!-- Items de la sección -->
          <div
            class="nav-items"
            :class="{ 'nav-items--open': seccionAbierta === grupo.seccion }"
          >
            <router-link
              v-for="item in grupo.items"
              :key="item.ruta"
              :to="item.ruta"
              class="nav-item"
              :class="{ 'nav-item--active': isActive(item.ruta) }"
              :title="collapsed ? item.label : ''"
            >
              <span class="nav-item-icon">{{ item.icon }}</span>
              <span class="nav-item-label">{{ item.label }}</span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- Usuario en sidebar (visible cuando colapsado) -->
      <div class="sidebar-user">
        <div class="user-avatar">{{ usuario.iniciales }}</div>
        <div class="user-info">
          <div class="user-name">{{ usuario.nombre }}</div>
          <div class="user-rol">{{ usuario.rol }}</div>
        </div>
      </div>

    </aside>

    <!-- ══════════════ CONTENIDO PRINCIPAL ══════════════ -->
    <div class="main-wrapper">

      <!-- TOPBAR -->
      <header class="topbar">

        <!-- Título de la sección actual (slot opcional) -->
        <div class="topbar-left">
          <slot name="titulo">
            <span class="topbar-title">Panel de administración</span>
          </slot>
        </div>

        <!-- Acciones derecha -->
        <div class="topbar-right">

          <!-- Notificaciones -->
          <button class="topbar-btn" title="Notificaciones">
            <span class="topbar-btn-icon">🔔</span>
            <span v-if="notificaciones > 0" class="notif-badge">
              {{ notificaciones }}
            </span>
          </button>

          <!-- Separador -->
          <div class="topbar-sep"></div>

          <!-- Avatar + menú usuario -->
          <div class="topbar-user" @click="toggleMenuUsuario">
            <div class="user-avatar user-avatar--sm">{{ usuario.iniciales }}</div>
            <div class="topbar-user-info">
              <span class="topbar-user-name">{{ usuario.nombre }}</span>
              <span class="topbar-user-rol">{{ usuario.rol }}</span>
            </div>
            <span class="topbar-chevron">▾</span>

            <!-- Dropdown -->
            <div class="user-dropdown" v-if="menuUsuarioAbierto">
              <div class="dropdown-item">👤  Mi perfil</div>
              <div class="dropdown-item">⚙️  Configuración</div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-item dropdown-item--danger">⏻  Cerrar sesión</div>
            </div>
          </div>

        </div>
      </header>

      <!-- CONTENIDO DE LA VISTA -->
      <main class="main-content">
        <RouterView />
      </main>

    </div>
  </div>
</template>

<style scoped>
/* ─── Tokens ──────────────────────────────────────── */
:root {
  --green:        #42ae1a;
  --green-dark:   #2e7d32;
  --green-deeper: #1b5e20;
  --green-soft:   #e8f5e9;
  --sidebar-w:    248px;
  --sidebar-col:  68px;
  --topbar-h:     60px;
}

/* ─── Shell ────────────────────────────────────────── */
.admin-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f3f4f6;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* ─── Sidebar ──────────────────────────────────────── */
.sidebar {
  width: var(--sidebar-w);
  min-width: var(--sidebar-w);
  background: #1b2e1c;
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease, min-width 0.25s ease;
  overflow: hidden;
  position: relative;
  z-index: 100;
}

.sidebar-collapsed .sidebar {
  width: var(--sidebar-col);
  min-width: var(--sidebar-col);
}

/* Header del sidebar */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  min-height: var(--topbar-h);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.logo-mark {
  width: 32px;
  height: 32px;
  background: #42ae1a;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.2s ease;
}

.sidebar-collapsed .logo-text { opacity: 0; width: 0; }

.sidebar-toggle {
  background: rgba(255,255,255,0.07);
  border: none;
  border-radius: 6px;
  padding: 4px 7px;
  cursor: pointer;
  color: #a3b3a4;
  font-size: 12px;
  flex-shrink: 0;
  transition: background 0.15s;
}

.sidebar-toggle:hover { background: rgba(255,255,255,0.13); }
.toggle-icon { line-height: 1; }

/* Navegación */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}

.nav-grupo { margin-bottom: 4px; }

.nav-seccion {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px;
  background: none;
  border: none;
  color: #8ba98c;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  text-align: left;
  transition: color 0.15s;
  white-space: nowrap;
}

.nav-seccion:hover { color: #c8ddc9; }
.nav-seccion--open { color: #42ae1a; }

.nav-seccion-icon { font-size: 14px; flex-shrink: 0; }
.nav-seccion-label {
  flex: 1;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.2s;
}
.sidebar-collapsed .nav-seccion-label { opacity: 0; }
.nav-seccion-arrow {
  font-size: 10px;
  opacity: 1;
  transition: opacity 0.2s;
}
.sidebar-collapsed .nav-seccion-arrow { opacity: 0; }

/* Items dentro de la sección */
.nav-items {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease;
}
.nav-items--open { max-height: 400px; }
.sidebar-collapsed .nav-items--open { max-height: 400px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 8px 28px;
  color: #a8bfa9;
  font-size: 13.5px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  border-left: 3px solid transparent;
  white-space: nowrap;
}

.sidebar-collapsed .nav-item { padding-left: 16px; }

.nav-item:hover {
  background: rgba(66,174,26,0.08);
  color: #d4e8d4;
}

.nav-item--active {
  background: rgba(66,174,26,0.14);
  color: #42ae1a;
  border-left-color: #42ae1a;
  font-weight: 600;
}

.nav-item-icon { font-size: 14px; flex-shrink: 0; }
.nav-item-label {
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.2s;
}
.sidebar-collapsed .nav-item-label { opacity: 0; }

/* Usuario en sidebar */
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #42ae1a;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-info {
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.2s;
}
.sidebar-collapsed .user-info { opacity: 0; }

.user-name {
  color: #e0ece1;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-rol {
  color: #7a9b7b;
  font-size: 11px;
  white-space: nowrap;
}

/* ─── Main wrapper ─────────────────────────────────── */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

/* ─── Topbar ───────────────────────────────────────── */
.topbar {
  height: var(--topbar-h);
  min-height: var(--topbar-h);
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  gap: 16px;
  position: relative;
  z-index: 50;
}

.topbar-left { flex: 1; overflow: hidden; }

.topbar-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.topbar-btn {
  position: relative;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  font-size: 18px;
  transition: background 0.15s;
}

.topbar-btn:hover { background: #f3f4f6; }
.topbar-btn-icon { line-height: 1; }

.notif-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbar-sep {
  width: 1px;
  height: 28px;
  background: #e5e7eb;
  margin: 0 4px;
}

/* Menú de usuario en topbar */
.topbar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: background 0.15s;
  user-select: none;
}

.topbar-user:hover { background: #f3f4f6; }

.user-avatar--sm {
  width: 30px;
  height: 30px;
  font-size: 12px;
}

.topbar-user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.topbar-user-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}

.topbar-user-rol {
  font-size: 11px;
  color: #9ca3af;
}

.topbar-chevron {
  font-size: 10px;
  color: #9ca3af;
  margin-left: 2px;
}

/* Dropdown usuario */
.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
  min-width: 180px;
  overflow: hidden;
  z-index: 200;
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 13.5px;
  color: #374151;
  cursor: pointer;
  transition: background 0.12s;
}

.dropdown-item:hover { background: #f9fafb; }
.dropdown-item--danger { color: #ef4444; }
.dropdown-item--danger:hover { background: #fff5f5; }

.dropdown-divider {
  height: 1px;
  background: #f3f4f6;
  margin: 4px 0;
}

/* ─── Main content ─────────────────────────────────── */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

/* ─── Responsive ───────────────────────────────────── */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 300;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    width: var(--sidebar-w) !important;
    min-width: var(--sidebar-w) !important;
  }

  .admin-shell:not(.sidebar-collapsed) .sidebar {
    transform: translateX(0);
  }

  .main-wrapper {
    width: 100%;
  }

  .topbar-user-info { display: none; }
  .topbar-title { font-size: 14px; }
  .main-content { padding: 16px; }
}
</style>