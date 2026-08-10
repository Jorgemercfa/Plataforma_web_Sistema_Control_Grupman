<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');
const successMsg = ref('');

const handleSubmit = () => {
  errorMsg.value = '';
  successMsg.value = '';

  if (!username.value || !newPassword.value || !confirmPassword.value) {
    errorMsg.value = 'Por favor completa todos los campos.';
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = 'Las contraseñas no coinciden.';
    return;
  }

  if (newPassword.value.length < 6) {
    errorMsg.value = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }

  // Lógica de recuperación
  successMsg.value = 'Contraseña actualizada correctamente.';
  setTimeout(() => router.push({ name: 'OperatorSignIn' }), 1500);
};
</script>

<template>
  <div class="signin-page">
    <RouterLink to="/Forget-password-operator" class="return-main-view">Regresar</RouterLink>

    <div class="signin-card">
      <!-- Encabezado -->
      <div class="signin-header">
        <h1 class="signin-title">Recuperar Contraseña</h1>
        <p class="signin-subtitle">Grupman</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="signin-form">

        <div class="form-group">
          <label for="username" class="form-label">Usuario / Email</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="form-input" 
            placeholder="ingresa tu usuario"
            required
          >
        </div>

        <div class="form-group">
          <label for="new-password" class="form-label">Nueva contraseña</label>
          <input 
            type="password" 
            id="new-password" 
            v-model="newPassword" 
            class="form-input" 
            placeholder="••••••••"
            required
          >
        </div>

        <div class="form-group">
          <label for="confirm-password" class="form-label">Confirmar nueva contraseña</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="confirmPassword" 
            class="form-input" 
            placeholder="••••••••"
            required
          >
        </div>

        <!-- Mensajes de Estado -->
        <p v-if="errorMsg" class="msg msg--error">{{ errorMsg }}</p>
        <p v-if="successMsg" class="msg msg--success">{{ successMsg }}</p>

        <!-- Botón Principal -->
        <button type="submit" class="btn btn-primary">
          Actualizar contraseña
        </button>

        <!-- Botón Secundario (Cancelar / Volver) -->

      </form>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal con fondo suave */
.signin-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f9f6;
  padding: 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.return-main-view {
  display: inline-block;
  font-size: 14px;
  background-color: #42ae1a;
  color: #ffffff;
  text-decoration: none;
  margin-bottom: 12px;
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 6px;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.return-main-view:hover {
  opacity: 0.9;
}

/* Tarjeta Verde Redondeada */
.signin-card {
  background-color: #42ae1a;
  padding: 40px 32px;
  border-radius: 28px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 420px;
}

/* Encabezado */
.signin-header {
  text-align: center;
  margin-bottom: 28px;
}

.signin-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px 0;
}

.signin-subtitle {
  font-size: 0.95rem;
  color: #ffffff;
  margin: 0;
  opacity: 0.9;
}

/* Formulario e Inputs */
.signin-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
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
  border-color: #004c08;
  box-shadow: 0 0 0 3px rgba(0, 76, 8, 0.2);
}

/* Mensajes de Alerta */
.msg {
  font-size: 0.85rem;
  padding: 10px 14px;
  border-radius: 10px;
  margin: 0;
  text-align: center;
  font-weight: 500;
}

.msg--error {
  background-color: #ffebee;
  color: #b71c1c;
}

.msg--success {
  background-color: #e8f5e9;
  color: #1b5e20;
}

/* Estilos de Botones */
.btn {
  width: 100%;
  padding: 14px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-primary {
  background-color: #004c08;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
}

.btn-primary:hover {
  background-color: #003605;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
</style>