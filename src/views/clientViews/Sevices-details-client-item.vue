<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import layoutNavbarClient from '../../components/clientComponents/layoutNavbarClient.vue'

const route = useRoute()
const router = useRouter()

const cargandoPdf = ref(false)

// Datos del reporte técnico simulado
const reporte = ref({
  id: route.params.id || 'SRV-2026-042',
  fecha: '15 de Junio, 2026',
  horaInicio: '09:00 AM',
  horaFin: '11:30 AM',
  cliente: 'Grupman S.A.C.',
  sede: 'Sede Principal - Av. Central 123',
  servicio: 'Desinsectación y Control de Roedores',
  tecnico: 'Juan Pérez',
  registroTecnico: 'TEC-8841',
  estado: 'Finalizado',
  
  // Productos aplicados
  productos: [
    { nombre: 'Cipermetrina 20EC', ingrediente: 'Cipermetrina', dosificacion: '50ml / 10L', lote: 'L-2026-X', registroSanitario: 'P-09881' },
    { nombre: 'Ratimor Bloque', ingrediente: 'Bromadiolona 0.005%', dosificacion: '2 bloques/estación', lote: 'R-7721', registroSanitario: 'P-01123' }
  ],

  // Inspección puntual por estaciones
  estacionesInspeccionadas: [
    { codigo: 'EST-01', tipo: 'Cebadero Roedores', ubicacion: 'Patio Trasero', hallazgo: 'Consumo parcial (20%)', estado: 'Reabastecida' },
    { codigo: 'EST-02', tipo: 'Trampa Luz UV', ubicacion: 'Área de Cocina / Comedor', hallazgo: 'Captura menor de dípteros', estado: 'Limpia' },
    { codigo: 'EST-03', tipo: 'Cebadero Roedores', ubicacion: 'Almacén Central', hallazgo: 'Sin actividad', estado: 'Ok' }
  ],

  // Evidencia Fotográfica
  evidencias: [
    { id: 1, titulo: 'Estación EST-01 Reabastecida', url: 'https://placehold.co/400x300/e2e8f0/475569?text=Evidencia+EST-01' },
    { id: 2, titulo: 'Aplicación perimetral patio', url: 'https://placehold.co/400x300/e2e8f0/475569?text=Aplicación+Perimetral' }
  ],

  observaciones: 'Se realizó la aplicación perimetral y revisión completa de estaciones de control. El establecimiento cumple con las condiciones higiénico-sanitarias adecuadas.',
  recomendaciones: 'Mantener cerradas las rejillas del almacén central durante el horario nocturno para prevenir ingreso de plagas.',
  firmaTecnico: 'Juan Pérez - Técnico Responsable',
  clienteConformidad: 'Carlos Mendoza - Resp. SSOMA'
})

// Simulación de descarga del PDF
const descargarPdf = () => {
  cargandoPdf.value = true
  setTimeout(() => {
    cargandoPdf.value = false
    // Lógica para descargar el documento
  }, 1200)
}
</script>

<template>
  <layoutNavbarClient>
    <div class="client-container" v-if="reporte">

      <!-- Breadcrumb / Volver -->
      <div class="breadcrumb">
        <button class="btn-back" @click="router.back()">
          <i class="ti ti-arrow-left"></i> Volver a Mis Servicios
        </button>
      </div>

      <!-- Header del Reporte -->
      <div class="report-header-card">
        <div class="header-main">
          <div>
            <span class="badge badge--green">{{ reporte.estado }}</span>
            <h1 class="page-title">Reporte Técnico: {{ reporte.id }}</h1>
            <p class="page-sub"><i class="ti ti-calendar"></i> {{ reporte.fecha }} ({{ reporte.horaInicio }} - {{ reporte.horaFin }})</p>
          </div>
          <div class="header-actions">
            <button class="btn-primary" @click="descargarPdf" :disabled="cargandoPdf">
              <i class="ti" :class="cargandoPdf ? 'ti-loader spin' : 'ti-file-download'"></i>
              {{ cargandoPdf ? 'Generando PDF...' : 'Descargar PDF Certificado' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Resumen General y Personal Técnico -->
      <div class="grid-2-cols">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="ti ti-info-circle"></i> Datos del Servicio</div>
          </div>
          <div class="info-list">
            <div class="info-row"><span class="label">Servicio:</span> <span class="val">{{ reporte.servicio }}</span></div>
            <div class="info-row"><span class="label">Sede Atendida:</span> <span class="val">{{ reporte.sede }}</span></div>
            <div class="info-row"><span class="label">Cliente:</span> <span class="val">{{ reporte.cliente }}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title"><i class="ti ti-user-check"></i> Técnico A Cargo</div>
          </div>
          <div class="info-list">
            <div class="info-row"><span class="label">Nombre:</span> <span class="val">{{ reporte.tecnico }}</span></div>
            <div class="info-row"><span class="label">Cód. Técnico:</span> <span class="val">{{ reporte.registroTecnico }}</span></div>
            <div class="info-row"><span class="label">Estado de Firma:</span> <span class="badge badge--light-green">Conformidad Firmada</span></div>
          </div>
        </div>
      </div>

      <!-- Productos Químicos Utilizados -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="ti ti-flask"></i> Productos Químicos Aplicados (Ficha Sanitaria)</div>
        </div>
        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Ingrediente Activo</th>
                <th>Dosificación</th>
                <th>Lote</th>
                <th>Reg. Sanitario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in reporte.productos" :key="i">
                <td class="cell-main">{{ p.nombre }}</td>
                <td>{{ p.ingrediente }}</td>
                <td>{{ p.dosificacion }}</td>
                <td class="cell-sub">{{ p.lote }}</td>
                <td class="cell-sub">{{ p.registroSanitario }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Inspección por Estaciones de Control -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="ti ti-map-pins"></i> Inspección por Estaciones</div>
        </div>
        <div class="table-wrap">
          <table class="tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Ubicación</th>
                <th>Hallazgo Encontrado</th>
                <th>Acción / Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(e, i) in reporte.estacionesInspeccionadas" :key="i">
                <td class="cell-main">{{ e.codigo }}</td>
                <td>{{ e.tipo }}</td>
                <td class="cell-sub">{{ e.ubicacion }}</td>
                <td><span class="hallazgo-tag">{{ e.hallazgo }}</span></td>
                <td><span class="badge badge--gray">{{ e.estado }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Evidencia Fotográfica -->
      <div class="card" v-if="reporte.evidencias?.length">
        <div class="card-header">
          <div class="card-title"><i class="ti ti-camera"></i> Evidencia Fotográfica del Servicio</div>
        </div>
        <div class="gallery-grid">
          <div v-for="foto in reporte.evidencias" :key="foto.id" class="gallery-item">
            <img :src="foto.url" :alt="foto.titulo" class="gallery-img" />
            <span class="gallery-caption">{{ foto.titulo }}</span>
          </div>
        </div>
      </div>

      <!-- Observaciones y Recomendaciones del Técnico -->
      <div class="grid-2-cols">
        <div class="card card-notes">
          <div class="card-header">
            <div class="card-title"><i class="ti ti-notes"></i> Observaciones del Servicio</div>
          </div>
          <div class="card-body">
            <p>{{ reporte.observaciones }}</p>
          </div>
        </div>

        <div class="card card-notes yellow-border">
          <div class="card-header">
            <div class="card-title text-amber"><i class="ti ti-alert-triangle"></i> Recomendaciones para el Cliente</div>
          </div>
          <div class="card-body">
            <p>{{ reporte.recomendaciones }}</p>
          </div>
        </div>
      </div>

      <!-- Conformidad y Firmas -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i class="ti ti-writing"></i> Validez y Conformidad Sanitaria</div>
        </div>
        <div class="signatures-grid">
          <div class="signature-box">
            <div class="signature-line"></div>
            <span class="sig-name">{{ reporte.firmaTecnico }}</span>
            <span class="sig-role">Firma Técnico Operativo</span>
          </div>
          <div class="signature-box">
            <div class="signature-line"></div>
            <span class="sig-name">{{ reporte.clienteConformidad }}</span>
            <span class="sig-role">Conformidad Representante Cliente</span>
          </div>
        </div>
      </div>

    </div>
  </layoutNavbarClient>
</template>

<style scoped>
.client-container {
  --green: #42ae1a;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #111827;
  padding: 32px;
  max-width: 1100px;
  margin: 0 auto;
}

/* Volver */
.breadcrumb { margin-bottom: 16px; }
.btn-back {
  background: none; border: none; color: #6b7280; font-size: 13.5px;
  font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
}
.btn-back:hover { color: var(--green); }

/* Header Card */
.report-header-card {
  background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;
  padding: 24px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.header-main { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; }
.page-title { font-size: 22px; font-weight: 700; margin: 8px 0 4px; color: #111827; }
.page-sub { font-size: 13.5px; color: #6b7280; margin: 0; display: flex; align-items: center; gap: 4px; }

/* Grid layout */
.grid-2-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px; }

/* Cards */
.card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; margin-bottom: 24px; }
.card-header { padding: 16px 20px; background: #fafafa; border-bottom: 1px solid #f3f4f6; }
.card-title { font-size: 14.5px; font-weight: 600; display: flex; align-items: center; gap: 8px; color: #111827; }
.card-title i { color: var(--green); font-size: 18px; }
.card-body { padding: 20px; font-size: 14px; line-height: 1.5; color: #374151; }

/* Filas de Info */
.info-list { padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }
.info-row { display: flex; justify-content: space-between; font-size: 13.5px; }
.info-row .label { color: #6b7280; font-weight: 500; }
.info-row .val { font-weight: 600; color: #111827; }

/* Tabla */
.table-wrap { overflow-x: auto; }
.tabla { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.tabla thead th { padding: 12px 16px; text-align: left; font-size: 11.5px; font-weight: 600; color: #6b7280; text-transform: uppercase; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
.tabla tbody tr { border-bottom: 1px solid #f3f4f6; }
.tabla td { padding: 14px 16px; color: #374151; vertical-align: middle; }

.cell-main { font-weight: 600; color: #111827; }
.cell-sub { font-size: 12.5px; color: #6b7280; }

.hallazgo-tag { background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; }

/* Galería de Evidencias */
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding: 20px; }
.gallery-item { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; background: #fafafa; }
.gallery-img { width: 100%; height: 140px; object-fit: cover; display: block; }
.gallery-caption { display: block; padding: 8px 12px; font-size: 12px; font-weight: 500; color: #4b5563; text-align: center; }

/* Firmas */
.signatures-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; padding: 24px; }
.signature-box { display: flex; flex-direction: column; align-items: center; text-align: center; }
.signature-line { width: 180px; height: 1px; background: #9ca3af; margin-bottom: 8px; margin-top: 24px; }
.sig-name { font-size: 13.5px; font-weight: 600; color: #111827; }
.sig-role { font-size: 12px; color: #6b7280; }

/* Botones y Badges */
.btn-primary { background: var(--green); color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 13.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: background 0.2s; }
.btn-primary:hover:not(:disabled) { background: #379614; }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

.badge { padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }
.badge--green { background: #e8f5e9; color: #2e7d32; }
.badge--light-green { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
.badge--gray { background: #f3f4f6; color: #4b5563; }

.text-amber { color: #d97706; }
.yellow-border { border-color: #fde68a; }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>