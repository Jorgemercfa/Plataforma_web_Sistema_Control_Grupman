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

  // Aquí irá la lógica de recuperación con Firebase Auth
  successMsg.value = 'Contraseña actualizada correctamente.';
  setTimeout(() => router.push({ name: 'SignInAdmin' }), 1500);
};
</script>

<template>
    <div class="Sign-in-area">
        <div class="Sign-in-container">
            <div class="Sign-in-form">
                <h1>Recuperar contraseña</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="username">Usuario</label>
                        <input type="text" id="username" v-model="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="new-password">Nueva contraseña</label>
                        <input type="password" id="new-password" v-model="newPassword" name="new-password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirmar nueva contraseña</label>
                        <input type="password" id="confirm-password" v-model="confirmPassword" name="confirm-password" required>
                    </div>
                    <p v-if="errorMsg" class="msg msg--error">{{ errorMsg }}</p>
                    <p v-if="successMsg" class="msg msg--success">{{ successMsg }}</p>
                    <button type="submit">Recuperar contraseña</button>
                </form>
            </div> 
        </div>   
    </div>
</template>

<style scoped>
.Sign-in-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff;
}

.Sign-in-container {
    background-color: #42ae1a;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.Sign-in-form h1 {
    text-align: center;
    color: #ffffff;
    margin-bottom: 20px;
}

.Sign-in-form .form-group {
    margin-bottom: 20px;
}

.msg {
    font-size: 13px;
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 6px;
}

.msg--error   { background: #ffebee; color: #b71c1c; }
.msg--success { background: #e8f5e9; color: #1b5e20; }

</style>