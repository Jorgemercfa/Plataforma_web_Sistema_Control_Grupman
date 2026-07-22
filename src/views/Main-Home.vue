<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const irALogin = () => router.push('/SignInAdmin');
const irAFuncionalidades = () => router.push('/funcionalidades');
</script>

<template>
  <div class="home-area">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">

        <div class="hero-badge">Sistema de gestión</div>

        <h1 class="hero-title">
          Control de plagas,<br />
          <span class="hero-title--accent">todo en un lugar</span>
        </h1>

        <p class="hero-subtitle">
          Plataforma web para gestionar operaciones, finanzas y equipo humano
          de tu empresa de control de plagas. Desde la cotización hasta el
          certificado, sin papeles.
        </p>

        <div class="hero-actions">
          <button class="btn-primary" @click="irALogin">
            Ingresar a la plataforma
          </button>
          <button class="btn-ghost" @click="irAFuncionalidades">
            Ver funcionalidades
          </button>
        </div>

      </div>

      <!-- Decoración lado derecho -->
      <div class="hero-visual" aria-hidden="true">
        <div class="visual-card visual-card--top">
          <span class="visual-dot visual-dot--green"></span>
          Visita completada
        </div>
        <div class="visual-orb"></div>
        <div class="visual-card visual-card--bottom">
          <span class="visual-dot visual-dot--yellow"></span>
          Stock bajo — Revisar inventario
        </div>
      </div>
    </section>

    <!-- MÓDULOS — tres píldoras rápidas -->
    <section class="modules">
      <div class="module-pill">
        <span class="module-icon">🛠️</span>
        <div>
          <div class="module-name">Operaciones</div>
          <div class="module-desc">Clientes, visitas, cotizaciones e inventario</div>
        </div>
      </div>
      <div class="module-divider" aria-hidden="true"></div>
      <div class="module-pill">
        <span class="module-icon">💰</span>
        <div>
          <div class="module-name">Finanzas</div>
          <div class="module-desc">Facturación, cobros, proveedores y planilla</div>
        </div>
      </div>
      <div class="module-divider" aria-hidden="true"></div>
      <div class="module-pill">
        <span class="module-icon">👥</span>
        <div>
          <div class="module-name">Gestión humana</div>
          <div class="module-desc">Personal, roles y accesos al sistema</div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ─── Reset de área ─────────────────────────────────── */
.home-area {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

/* ─── Hero ──────────────────────────────────────────── */
.hero {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 40px;
}

/* Texto */
.hero-content {
  flex: 1;
  max-width: 560px;
}

.hero-badge {
  display: inline-block;
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.15;
  color: #111827;
  margin: 0 0 20px;
}

.hero-title--accent {
  color: #42ae1a;
}

.hero-subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 36px;
  max-width: 480px;
}

/* Botones */
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: #42ae1a;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 28px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.btn-primary:hover {
  background-color: #379614;
  transform: translateY(-2px);
}

.btn-ghost {
  background-color: transparent;
  color: #374151;
  font-size: 15px;
  font-weight: 500;
  padding: 14px 28px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-ghost:hover {
  border-color: #42ae1a;
  color: #42ae1a;
}

/* Visual decorativo */
.hero-visual {
  flex-shrink: 0;
  position: relative;
  width: 340px;
  height: 340px;
}

.visual-orb {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 40% 40%, #42ae1a22, #42ae1a08);
  border: 1.5px solid #42ae1a33;
  border-radius: 50%;
}

.visual-card {
  position: absolute;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 18px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  white-space: nowrap;
}

.visual-card--top {
  top: 40px;
  left: -20px;
}

.visual-card--bottom {
  bottom: 60px;
  right: -20px;
}

.visual-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.visual-dot--green  { background-color: #42ae1a; }
.visual-dot--yellow { background-color: #f59e0b; }

/* ─── Módulos ────────────────────────────────────────── */
.modules {
  background: #fff;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  padding: 32px 40px;
}

.module-pill {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 40px;
}

.module-icon {
  font-size: 28px;
  line-height: 1;
}

.module-name {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2px;
}

.module-desc {
  font-size: 13px;
  color: #6b7280;
}

.module-divider {
  width: 1px;
  height: 48px;
  background-color: #e5e7eb;
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    padding: 60px 24px;
    text-align: center;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-subtitle {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    width: 260px;
    height: 260px;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 48px 20px;
  }

  .hero-visual {
    display: none;
  }

  .modules {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
  }

  .module-divider {
    width: 100%;
    height: 1px;
  }

  .module-pill {
    padding: 16px 0;
  }
}
</style>