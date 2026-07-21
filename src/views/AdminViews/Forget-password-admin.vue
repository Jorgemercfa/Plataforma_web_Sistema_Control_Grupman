<script setup>
</script>

<template>
    <div class="Sign-in-area">
        <div class="Sign-in-container">
            <div class="Sign-in-form">
                <h1>Recuperar contraseña</h1>
                <form>
                    <div class="form-group">
                        <label for="username">Usuario</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="new-password">Nueva contraseña</label>
                        <input type="password" id="new-password" name="new-password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirmar nueva contraseña</label>
                        <input type="password" id="confirm-password" name="confirm-password" required>
                    </div>
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

</style>