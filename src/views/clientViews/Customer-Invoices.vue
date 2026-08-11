<script setup>
import { ref, computed } from 'vue'

// Filtros
const filtroEstado = ref('todos')
const filtroAnio = ref('2026')
const busqueda = ref('')

// Modal de reporte de pago
const mostrarModalPago = ref(false)
const facturaSeleccionada = ref(null)
const comprobantePago = ref(null)
const cargandoPago = ref(false)
const pagoReportadoExito = ref(false)

// Listado de comprobantes
const comprobantes = ref([
  {
    id: 'F001-000482',
    tipo: 'Factura Electrónica',
    concepto: 'Servicio de Control de Plagas - Sede Miraflores (Mes Mayo)',
    monto: 350.00,
    moneda: 'S/',
    fechaEmision: '2026-05-02',
    fechaVencimiento: '2026-05-20',
    estado: 'pendiente', // pendiente | pagado | vencido
    pdfUrl: '#',
    xmlUrl: '#'
  },
  {
    id: 'F001-000410',
    tipo: 'Factura Electrónica',
    concepto: 'Limpieza y Desinfección de Cisternas - Almacén Central',
    monto: 820.00,
    moneda: 'S/',
    fechaEmision: '2026-04-12',
    fechaVencimiento: '2026-04-30',
    estado: 'pagado',
    fechaPago: '2026-04-28',
    pdfUrl: '#',
    xmlUrl: '#'
  },
  {
    id: 'F001-000355',
    tipo: 'Factura Electrónica',
    concepto: 'Servicio de Desratización Intensiva - Sede San Isidro',
    monto: 450.00,
    moneda: 'S/',
    fechaEmision: '2026-03-01',
    fechaVencimiento: '2026-03-15',
    estado: 'pagado',
    fechaPago: '2026-03-10',
    pdfUrl: '#',
    xmlUrl: '#'
  },
  {
    id: 'F001-000289',
    tipo: 'Factura Electrónica',
    concepto: 'Servicio Mensual de Desinsectación - Sede Miraflores',
    monto: 350.00,
    moneda: 'S/',
    fechaEmision: '2026-02-01',
    fechaVencimiento: '2026-02-15',
    estado: 'vencido',
    pdfUrl: '#',
    xmlUrl: '#'
  }
])

// Métricas / Resumen
const totalPendiente = computed(() => {
  return comprobantes.value
    .filter(c => c.estado === 'pendiente' || c.estado === 'vencido')
    .reduce((sum, c) => sum + c.monto, 0)
    .toFixed(2)
})

const facturasVencidasCount = computed(() => {
  return comprobantes.value.filter(c => c.estado === 'vencido').length
})

// Filtrado dinámico
const comprobantesFiltrados = computed(() => {
  return comprobantes.value.filter(item => {
    const cumpleEstado = filtroEstado.value === 'todos' || item.estado === filtroEstado.value
    const cumpleBusqueda = item.id.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                          item.concepto.toLowerCase().includes(busqueda.value.toLowerCase())
    return cumpleEstado && cumpleBusqueda
  })
})

// Acciones de modal de pago
const abrirModalPago = (factura) => {
  facturaSeleccionada.value = factura
  pagoReportadoExito.value = false
  comprobantePago.value = null
  mostrarModalPago.value = true
}

const handleFilePago = (e) => {
  const file = e.target.files[0]
  if (file) comprobantePago.value = file.name
}

const enviarReportePago = () => {
  if (!comprobantePago.value) {
    alert('Por favor selecciona la imagen o PDF del voucher de pago.')
    return
  }
  cargandoPago.value = true
  setTimeout(() => {
    cargandoPago.value = false
    pagoReportadoExito.value = true
    setTimeout(() => {
      mostrarModalPago.value = false
    }, 1800)
  }, 1200)
}
</script>

<template>
  <div class="facturas-container">
    
    <!-- Header de la sección -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Centro de Facturación & Comprobantes</h1>
        <p class="page-subtitle">Consulta tus comprobantes emitidos, descarga archivos tributarios y gestiona tus pagos.</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="filtroEstado = 'pendiente'">
          <i class="ti ti-alert-circle"></i> Ver Pendientes ({{ comprobantes.filter(c => c.estado === 'pendiente').length }})
        </button>
      </div>
    </div>

    <!-- Cards de Resumen Finanzas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon icon-amber"><i class="ti ti-receipt-tax"></i></div>
        <div class="stat-info">
          <span class="stat-label">Total por Pagar</span>
          <h2 class="stat-value">S/ {{ totalPendiente }}</h2>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon icon-red"><i class="ti ti-clock-exclamation"></i></div>
        <div class="stat-info">
          <span class="stat-label">Comprobantes Vencidos</span>
          <h2 class="stat-value">{{ facturasVencidasCount }}</h2>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon icon-green"><i class="ti ti-circle-check-filled"></i></div>
        <div class="stat-info">
          <span class="stat-label">Comprobantes Pagados</span>
          <h2 class="stat-value">{{ comprobantes.filter(c => c.estado === 'pagado').length }}</h2>
        </div>
      </div>
    </div>

    <!-- Barra de Filtros y Búsqueda -->
    <div class="filter-bar">
      <div class="search-box">
        <i class="ti ti-search search-icon"></i>
        <input 
          type="text" 
          v-model="busqueda" 
          placeholder="Buscar por N° de comprobante o servicio..." 
          class="search-input"
        />
      </div>

      <div class="filter-group">
        <select v-model="filtroEstado" class="filter-select">
          <option value="todos">Todos los Estados</option>
          <option value="pendiente">Pendientes</option>
          <option value="vencido">Vencidos</option>
          <option value="pagado">Pagados</option>
        </select>

        <select v-model="filtroAnio" class="filter-select">
          <option value="2026">Año 2026</option>
          <option value="2025">Año 2025</option>
        </select>
      </div>
    </div>

    <!-- Tabla de Comprobantes -->
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Comprobante</th>
            <th>Concepto / Servicio</th>
            <th>Emisión</th>
            <th>Vencimiento</th>
            <th>Monto</th>
            <th>Estado</th>
            <th class="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in comprobantesFiltrados" :key="c.id">
            <td class="font-bold text-dark">
              <div class="doc-code">
                <i class="ti ti-file-text"></i>
                <span>{{ c.id }}</span>
              </div>
            </td>
            <td>
              <span class="concept-text" :title="c.concepto">{{ c.concepto }}</span>
            </td>
            <td>{{ c.fechaEmision }}</td>
            <td>
              <span :class="{ 'text-danger font-semibold': c.estado === 'vencido' }">
                {{ c.fechaVencimiento }}
              </span>
            </td>
            <td class="font-bold">S/ {{ c.monto.toFixed(2) }}</td>
            <td>
              <span class="badge" :class="`badge--${c.estado}`">
                <i class="ti" :class="{
                  'ti-clock': c.estado === 'pendiente',
                  'ti-check': c.estado === 'pagado',
                  'ti-alert-triangle': c.estado === 'vencido'
                }"></i>
                {{ c.estado.toUpperCase() }}
              </span>
            </td>
            <td class="text-right">
              <div class="actions-wrapper">
                <!-- Botón reportar pago si no está pagado -->
                <button 
                  v-if="c.estado !== 'pagado'" 
                  class="btn-action btn-pay" 
                  @click="abrirModalPago(c)"
                  title="Reportar Pago"
                >
                  <i class="ti ti-upload"></i> Reportar Pago
                </button>

                <!-- Descargar PDF y XML -->
                <a :href="c.pdfUrl" class="btn-icon" title="Descargar PDF"><i class="ti ti-file-type-pdf"></i></a>
                <a :href="c.xmlUrl" class="btn-icon" title="Descargar XML (SUNAT)"><i class="ti ti-file-code"></i></a>
              </div>
            </td>
          </tr>

          <tr v-if="comprobantesFiltrados.length === 0">
            <td colspan="7" class="empty-table">
              <i class="ti ti-search-off"></i>
              <p>No se encontraron comprobantes con los filtros seleccionados.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Reportar Pago -->
    <div v-if="mostrarModalPago" class="modal-overlay" @click.self="mostrarModalPago = false">
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Reportar Pago - {{ facturaSeleccionada?.id }}</h3>
            <p class="modal-sub">Monto: <strong>S/ {{ facturaSeleccionada?.monto.toFixed(2) }}</strong></p>
          </div>
          <button class="btn-close" @click="mostrarModalPago = false"><i class="ti ti-x"></i></button>
        </div>

        <div v-if="pagoReportadoExito" class="success-state">
          <i class="ti ti-circle-check icon-success"></i>
          <h3>Voucher Enviado</h3>
          <p>Tu comprobante de pago fue recibido. La validación administrativa tomará aprox. 15-30 minutos.</p>
        </div>

        <div v-else class="modal-body">
          <p class="pay-instructions">
            Puedes realizar la transferencia a las siguientes cuentas corporativas y adjuntar tu voucher:
          </p>
          <div class="bank-details">
            <div><strong>BCP Soles:</strong> 193-98765432-0-11</div>
            <div><strong>CCI:</strong> 002-193-0098765432011-12</div>
            <div><strong>Yape / Plin:</strong> 987 654 321 (Grupman S.A.C.)</div>
          </div>

          <div class="form-group">
            <label class="form-label">Adjuntar Voucher / Captura de Pago <span class="req">*</span></label>
            <input type="file" @change="handleFilePago" accept="image/*,application/pdf" class="file-input-custom" />
          </div>
        </div>

        <div v-if="!pagoReportadoExito" class="modal-footer">
          <button class="btn-cancel" @click="mostrarModalPago = false">Cancelar</button>
          <button class="btn-submit" @click="enviarReportePago" :disabled="cargandoPago">
            <i class="ti" :class="cargandoPago ? 'ti-loader spin' : 'ti-send'"></i>
            {{ cargandoPago ? 'Validando...' : 'Enviar Voucher' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.facturas-container {
  padding: 24px; max-width: 1200px; margin: 0 auto;
  font-family: 'Inter', 'Segoe UI', sans-serif; color: #111827;
}

/* Header */
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-title { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 4px; }
.page-subtitle { font-size: 13.5px; color: #64748b; margin: 0; }

/* Stats */
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px;
  display: flex; align-items: center; gap: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.stat-icon {
  width: 46px; height: 46px; border-radius: 10px; display: flex; align-items: center;
  justify-content: center; font-size: 22px;
}
.icon-amber { background: #fef3c7; color: #d97706; }
.icon-red { background: #fee2e2; color: #dc2626; }
.icon-green { background: #dcfce7; color: #15803d; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 20px; font-weight: 700; margin: 2px 0 0; color: #0f172a; }

/* Filter Bar */
.filter-bar { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
.search-box { position: relative; flex: 1; min-width: 280px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
.search-input {
  width: 100%; padding: 9px 12px 9px 36px; border: 1px solid #cbd5e1; border-radius: 8px;
  font-size: 13px; outline: none; transition: border-color 0.15s;
}
.search-input:focus { border-color: #42ae1a; }

.filter-group { display: flex; gap: 10px; }
.filter-select {
  padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 8px;
  font-size: 13px; color: #334155; background: #fff; outline: none;
}

/* Data Table */
.table-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.data-table th { background: #f8fafc; padding: 12px 16px; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0; }
.data-table td { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }

.doc-code { display: flex; align-items: center; gap: 6px; color: #0f172a; }
.concept-text { display: inline-block; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; }
.badge--pendiente { background: #fef3c7; color: #b45309; }
.badge--pagado { background: #dcfce7; color: #15803d; }
.badge--vencido { background: #fee2e2; color: #b91c1c; }

.actions-wrapper { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
.btn-action { padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 4px; }
.btn-pay { background: #42ae1a; color: #fff; }
.btn-pay:hover { background: #379614; }

.btn-icon { width: 32px; height: 32px; border-radius: 6px; border: 1px solid #e2e8f0; display: inline-flex; align-items: center; justify-content: center; color: #64748b; text-decoration: none; }
.btn-icon:hover { background: #f8fafc; color: #0f172a; }

.text-danger { color: #dc2626; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-right { text-align: right; }
.empty-table { text-align: center; padding: 40px; color: #94a3b8; }
.empty-table i { font-size: 32px; margin-bottom: 8px; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 99; }
.modal-card { background: #fff; width: 100%; max-width: 480px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.modal-header { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; }
.modal-title { font-size: 16px; font-weight: 700; margin: 0; }
.modal-sub { font-size: 12px; color: #64748b; margin: 2px 0 0; }
.btn-close { background: none; border: none; font-size: 18px; color: #94a3b8; cursor: pointer; }

.modal-body { padding: 20px; }
.pay-instructions { font-size: 12.5px; color: #475569; margin-bottom: 10px; }
.bank-details { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 12px; color: #334155; display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }

.file-input-custom { width: 100%; font-size: 12px; }

.modal-footer { padding: 12px 20px; background: #f8fafc; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: 8px; }
.btn-cancel { background: #fff; border: 1px solid #cbd5e1; padding: 6px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; }
.btn-submit { background: #42ae1a; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }

.success-state { padding: 30px 20px; text-align: center; }
.icon-success { font-size: 42px; color: #42ae1a; margin-bottom: 8px; }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>