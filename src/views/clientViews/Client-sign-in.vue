<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  // Aquí irá la lógica con Firebase Auth según la Fase 1 del proyecto
  console.log('Iniciando sesión:', email.value, password.value);
  router.push({ name: 'HomeItemClient' });
};
</script>

<template>
  <div class="signin-page">
    <div class="signin-card">
      
      <!-- Encabezado -->
      <div class="signin-header">
        <h1 class="signin-title">Iniciar Sesión Clientes</h1>
        <p class="signin-subtitle">Grupman</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="signin-form">
        
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email"
            class="form-input" 
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            class="form-input" 
            placeholder="••••••••"
            required
          />
        </div>

        <!-- Botón Principal -->
        <button type="submit" class="btn btn-primary">
          Iniciar sesión
        </button>

        <!-- Botón Secundario (Outline) -->
        <button 
          type="button" 
          class="btn btn-outline"
          @click="router.push('/forget-password')"
        >
          Olvidé Contraseña
        </button>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal con fondo suave */
.signin-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f9f6; /* Fondo exterior suave */
  padding: 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Tarjeta Blanca Redondeada */
.signin-card {
  background-color: #42ae1a;
  padding: 40px 32px;
  border-radius: 28px; /* Redondeado idéntico a la imagen */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 420px;
}

/* Encabezado */
.signin-header {
  text-align: center;
  margin-bottom: 32px;
}

.signin-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff; /* Azul oscuro elegante para el título */
  margin: 0 0 6px 0;
}

.signin-subtitle {
  font-size: 0.95rem;
  color: #ffffff;
  margin: 0;
}

/* Formulario e Inputs */
.signin-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff; /* Verde corporativo para labels */
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #111827;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #42ae1a;  
  box-shadow: 0 0 0 3px rgba(66, 174, 26, 0.15);
}

/* Estilos de Botones */
.btn {
  width: 100%;
  padding: 14px;
  border-radius: 50px; /* Estilo píldora */
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Botón Sólido Principal (Verde Grupman) */
.btn-primary {
  background-color: #004c08;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(66, 174, 26, 0.25);
}

.btn-primary:hover {
  background-color: #004c08;
  box-shadow: 0 6px 16px rgba(66, 174, 26, 0.35);
}

/* Botón Outline Secundario */
.btn-outline {
  background-color: #004c08;
  color: #ffffff;
  border: 2px solid #004c08;
}

.btn-outline:hover {
  background-color: #004c08;
}
</style>