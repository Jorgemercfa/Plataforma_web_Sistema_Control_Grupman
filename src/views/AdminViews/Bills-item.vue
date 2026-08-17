<script setup>
import { ref, reactive, computed } from 'vue';
import layoutNavbarAdmin from '../../components/adminComponents/layoutNavbarAdmin.vue';

// Lista de gastos guardados (esto lo reemplazas por tu fetch/API real)
const expenses = ref([
  // { id: 1, type: 'Servicios', amount: 150.5, date: '2026-08-10' },
]);

// Estado del formulario
const form = reactive({
  type: '',
  amount: null,
});

const total = computed(() =>
  expenses.value.reduce((sum, e) => sum + Number(e.amount), 0)
);

function formatCurrency(value) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(value);
}

function handleSubmit() {
  if (!form.type.trim() || !form.amount || Number(form.amount) <= 0) {
    return;
  }

  expenses.value.unshift({
    id: Date.now(),
    type: form.type.trim(),
    amount: Number(form.amount),
    date: new Date().toISOString().slice(0, 10),
  });

  // Aquí harías el POST a tu backend, por ejemplo:
  // await api.post('/gastos', { type: form.type, amount: form.amount })

  form.type = '';
  form.amount = null;
}

function removeExpense(id) {
  expenses.value = expenses.value.filter((e) => e.id !== id);

  // Aquí harías el DELETE a tu backend
}
</script>

<template>
  <layoutNavbarAdmin>
    <div class="bills-content">
      <h1>Gastos de la Empresa</h1>

      <div class="bills-layout">
        <!-- Formulario para registrar un nuevo gasto -->
        <form class="card form-card" @submit.prevent="handleSubmit">
          <h2>Registrar Gasto</h2>

          <div class="form-group">
            <label for="type">Tipo de Gasto</label>
            <input
              id="type"
              v-model="form.type"
              type="text"
              placeholder="Ej. Servicios, Insumos, Transporte"
              required
            />
          </div>

          <div class="form-group">
            <label for="amount">Monto</label>
            <input
              id="amount"
              v-model.number="form.amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
            />
          </div>

          <button type="submit" class="submit-btn">Generar Gasto</button>
        </form>

        <!-- Lista de gastos ya guardados -->
        <div class="card list-card">
          <div class="list-header">
            <h2>Gastos Registrados</h2>
            <span class="total-badge">Total: {{ formatCurrency(total) }}</span>
          </div>

          <table v-if="expenses.length" class="expenses-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expense in expenses" :key="expense.id">
                <td>{{ expense.type }}</td>
                <td>{{ formatCurrency(expense.amount) }}</td>
                <td>{{ expense.date }}</td>
                <td>
                  <button
                    class="delete-btn"
                    type="button"
                    @click="removeExpense(expense.id)"
                    aria-label="Eliminar gasto"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p v-else class="empty-state">Todavía no hay gastos registrados.</p>
        </div>
      </div>
    </div>
  </layoutNavbarAdmin>
</template>

<style scoped>
.bills-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
}

.bills-content h1 {
  margin-bottom: 24px;
  color: #1f2937;
}

.bills-layout {
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 1000px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid #eef0f2;
}

.form-card {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-card h2,
.list-card h2 {
  margin: 0 0 4px;
  font-size: 1.1rem;
  color: #1f2937;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  color: #4b5563;
  font-weight: 500;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
}

.form-group input:focus {
  outline: none;
  border-color: #22a745;
  box-shadow: 0 0 0 3px rgba(34, 167, 69, 0.15);
}

.submit-btn {
  margin-top: 8px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #22a745;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #1b8a38;
}

.list-card {
  flex: 1.4;
  min-width: 320px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.total-badge {
  background: #eafbf0;
  color: #1b8a38;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.expenses-table {
  width: 100%;
  border-collapse: collapse;
}

.expenses-table th {
  text-align: left;
  font-size: 0.8rem;
  color: #6b7280;
  border-bottom: 1px solid #eef0f2;
  padding: 8px 6px;
}

.expenses-table td {
  padding: 10px 6px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.9rem;
  color: #1f2937;
}

.delete-btn {
  border: none;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.9rem;
}

.delete-btn:hover {
  color: #b91c1c;
}

.empty-state {
  color: #9ca3af;
  font-size: 0.9rem;
  padding: 20px 0;
  text-align: center;
}
</style>