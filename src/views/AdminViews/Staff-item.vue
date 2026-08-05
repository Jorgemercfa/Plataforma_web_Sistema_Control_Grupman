<script setup>
import layoutNavbarAdmin from '../../components/layoutNavbarAdmin.vue';
</script>

<template>
    <layoutNavbarAdmin>
        <div class="staff-content">
            <div class="staff-container">
               <p class="staff-nombre">Juan Pérez</p>
               <p class="staff-puesto">Recursos Humanos · Gerente</p>

               <div class="personal_staff_data">
                 <div class="dato">
                   <p>Teléfono</p>
                   <span>+1 234 567 890</span>
                 </div>
                 <div class="dato">
                   <p>Correo</p>
                   <span>juan.perez@grupman.com</span>
                 </div>
               </div>

               <div class="profesional_staff_data">
                 <div class="dato">
                   <p>Contraseña</p>
                   <span>********</span>
                 </div>
                 <div class="dato">
                   <p>Área</p>
                   <span>Recursos Humanos</span>
                 </div>
               </div>

               <div class="staff-botones">
                 <button class="button_staff_container button_editar">Editar</button>
                 <button class="button_staff_container button_eliminar">Eliminar</button>
               </div>
            </div>
        </div>
    </layoutNavbarAdmin>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
}

.staff-content {
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.staff-container {
    background-color: #42ae1a;
    color: #fff;
    padding: 1.75rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 480px;
}

.staff-nombre {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 2px;
}

.staff-puesto {
    font-size: 13px;
    color: #d9f2cc;
    margin: 0 0 18px;
}

.personal_staff_data,
.profesional_staff_data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 20px;
    padding-bottom: 16px;
    margin-bottom: 16px;
}

.personal_staff_data {
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.dato p {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #d9f2cc;
    margin: 0 0 3px;
}

.dato span {
    font-size: 14px;
    font-weight: bold;
}

.staff-botones {
    display: flex;
    gap: 10px;
}

.button_staff_container {
    flex: 1;
    border: none;
    height: 40px;
    border-radius: 999px;
    cursor: pointer;
    font-weight: bold;
    font-size: 13px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.button_editar {
    background-color: #ffffff;
    color: #004c08;
}

.button_editar:hover {
    background-color: #e8f9df;
}

.button_eliminar {
    background-color: #004c08;
    color: #ffffff;
}

.button_eliminar:hover {
    background-color: #003a06;
}
</style>