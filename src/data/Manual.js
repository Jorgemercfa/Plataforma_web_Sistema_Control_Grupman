// src/data/manual.js
// Contenido del manual de usuario (FuncionalidadesView.vue).
// Cada pregunta puede incluir "pasos" opcionales para instrucciones numeradas.

const iconOperaciones = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" stroke-width="1.6"/><path d="M9 3h6v4H9z" stroke="currentColor" stroke-width="1.6"/><path d="M9 12h6M9 16h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`

const iconFinanzas = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v10M9.5 9.5c0-1.4 1.2-2.5 2.7-2.5s2.7.9 2.7 2c0 2.5-5.4 1.5-5.4 4 0 1.1 1.2 2 2.7 2s2.7-1.1 2.7-2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`

const iconPersonal = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16 8a3 3 0 110-6M21 20c0-2.8-1.9-5.1-4.5-5.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`

const iconTecnico = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M10 18h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`

const iconCliente = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 20l1.4-4.2A8 8 0 1112 20H4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`

export default [
  {
    id: 'operaciones',
    titulo: 'Operaciones',
    rol: 'admin',
    icono: iconOperaciones,
    descripcion: 'Visitas, clientes, locales, estaciones y cotizaciones.',
    preguntas: [
      {
        q: '¿Cómo registro una visita nueva?',
        a: 'Desde Visitas → Nueva visita eliges cliente, local y técnico disponible. El sistema bloquea automáticamente los horarios ya ocupados de ese técnico.',
        pasos: [
          'Ve a Visitas → Nueva visita',
          'Selecciona cliente y local',
          'Elige técnico (solo muestra los disponibles en ese horario)',
          'Confirma para agendar',
        ],
      },
      {
        q: '¿Cómo genero una cotización?',
        a: 'En Cotizaciones → Nueva, seleccionas el tipo de servicio y los m² del local. El precio se calcula automático según la tarifa configurada.',
      },
      {
        q: '¿Dónde veo las estaciones de un local?',
        a: 'Dentro de la ficha del local encontrarás el mapa de estaciones con marcadores, y una tabla con el tipo y estado de cada una.',
      },
      {
        q: '¿Dónde veo el stock bajo?',
        a: 'El dashboard muestra una alerta de stock bajo con acceso directo al listado de productos afectados en Inventario.',
      },
      {
        q: '¿Cómo descargo el certificado de una visita?',
        a: 'Abre la visita completada y usa el botón de descarga de certificado. Solo está disponible una vez que el técnico cerró la visita.',
      },
    ],
  },
  {
    id: 'finanzas',
    titulo: 'Finanzas',
    rol: 'admin',
    icono: iconFinanzas,
    descripcion: 'Facturación, pagos, proveedores, compras y planilla.',
    preguntas: [
      {
        q: '¿Cómo registro un pago recibido?',
        a: 'Abre la factura correspondiente y usa Registrar pago. El estado de la factura se actualiza a pagada automáticamente.',
      },
      {
        q: '¿Cómo veo el margen del mes?',
        a: 'El Resumen financiero muestra cobros pendientes, gastos del mes y el margen resultante, con un gráfico comparativo mes a mes.',
      },
      {
        q: '¿Cómo registro un gasto operativo?',
        a: 'En Gastos → Nuevo gasto, indicas categoría, monto y fecha. Se refleja de inmediato en el resumen financiero.',
      },
      {
        q: '¿Cómo gestiono pagos a proveedores?',
        a: 'Desde la ficha del proveedor puedes ver su historial de compras y registrar un nuevo pago en Pagos a proveedores.',
      },
    ],
  },
  {
    id: 'personal',
    titulo: 'Gestión humana',
    rol: 'admin',
    icono: iconPersonal,
    descripcion: 'Empleados, roles y accesos al sistema.',
    preguntas: [
      {
        q: '¿Cómo doy de alta a un técnico?',
        a: 'En Empleados → Nuevo, completas sus datos y el rol. Esto crea automáticamente su cuenta de acceso con los permisos de ese rol.',
      },
      {
        q: '¿Cómo desactivo a un empleado que ya no trabaja con nosotros?',
        a: 'Desde su ficha, cambia el estado a inactivo. Pierde acceso al sistema pero su historial de visitas y registros se conserva.',
      },
    ],
  },
  {
    id: 'tecnico',
    titulo: 'App técnica de campo',
    rol: 'tecnico',
    icono: iconTecnico,
    descripcion: 'Visitas del día, escaneo QR, hallazgos, fotos y firma.',
    preguntas: [
      {
        q: '¿Cómo cierro una visita en campo?',
        a: 'Abre la visita del día, escanea el QR de cada estación para registrar hallazgos, agrega fotos y termina con la firma digital del cliente.',
        pasos: [
          'Abre la visita asignada del día',
          'Escanea el QR de cada estación',
          'Registra hallazgos y productos usados',
          'Toma fotos de evidencia',
          'Solicita la firma digital para cerrar',
        ],
      },
      {
        q: '¿Funciona sin conexión a internet?',
        a: 'Sí. Los datos quedan guardados en el celular y se sincronizan automáticamente en cuanto el dispositivo recupera conexión.',
      },
      {
        q: '¿Qué pasa si me equivoco al registrar un hallazgo?',
        a: 'Puedes editar el hallazgo mientras la visita siga abierta. Una vez cerrada con la firma del cliente, el registro queda bloqueado.',
      },
    ],
  },
  {
    id: 'cliente',
    titulo: 'Portal de clientes',
    rol: 'cliente',
    icono: iconCliente,
    descripcion: 'Próximas visitas, historial, facturas y certificados.',
    preguntas: [
      {
        q: '¿Dónde veo mi próxima visita?',
        a: 'En el inicio del portal aparece la fecha y el tipo de servicio de tu próxima visita programada.',
      },
      {
        q: '¿Cómo descargo mi certificado?',
        a: 'Ve a Historial de visitas, abre la visita ya completada y usa el botón Descargar certificado.',
      },
      {
        q: '¿Cómo reviso el estado de mis facturas?',
        a: 'En la sección Facturas puedes ver el monto, estado y fecha de vencimiento de cada una.',
      },
    ],
  },
]