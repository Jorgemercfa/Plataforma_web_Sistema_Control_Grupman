import { createRouter, createWebHistory } from 'vue-router';

// Usamos '@' (apunta a src/) y la ruta exacta en minúsculas: 'adminViews'
import MainHome from '@/views/Main-Home.vue';
import ManualFeature from '@/views/Features-Views.vue';
//Admin views
import SignInAdmin from '@/views/AdminViews/Sign-in-admin.vue';
import ForgetPassword from '@/views/AdminViews/Forget-password-admin.vue';
import HomeItemAdmin from '@/views/AdminViews/Home-item-admin.vue';
//Admin views Operations
import ClientDetails from '@/views/AdminViews/Client-detail-view.vue';
import QuotesDetails from '@/views/AdminViews/Quotes-item.vue';
import VisitorDetails from '@/views/AdminViews/Visits-item.vue';
import InventoryDetails from '@/views/AdminViews/Inventory-item.vue';
import ServicesDetails from '@/views/AdminViews/Services-types.vue';
// Admin views Financial
import FinancialSummary from '@/views/AdminViews/Financial-summary.vue';
import InvoiceDetails from '@/views/AdminViews/Invoices-item.vue';
import SuppliersDetails from '@/views/AdminViews/Suppliers-item.vue';
import BusinessPurchases from '@/views/AdminViews/Business-Purchases.vue';
import BillsDetails from '@/views/AdminViews/Bills-item.vue';
import PayrollItem from './views/AdminViews/Payroll-item.vue';
// Admin views Human Resources
import StaffDetails from '@/views/AdminViews/Staff-item.vue';
import AdminScheduler from '@/views/AdminViews/Work-schedules-amin.vue';
import WorkerHours from '@/views/AdminViews/Worker-hours-work.vue';

//Operator Views
import OperatorSignIn from '@/views/operatorViews/Operator-sign-in.vue';
import HomeItemOperator from '@/views/operatorViews/Home-operator-item.vue';
import VisitorDetailsOperator from '@/views/operatorViews/Visits-operator-item.vue';
import InventoryDetailsOperator from '@/views/operatorViews/Inventory-operator-item.vue';
import WorkSchedulesOperator from '@/views/operatorViews/Work-schedules-operator.vue';

const routes = [
  // Vistas principales
  {
    path: '/',
    name: 'MainHome',
    component: MainHome,
    meta: {
      title: 'Inicio | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path: '/ManualFeature',
    name: 'ManualFeature',
    component: ManualFeature,
    meta: {
      title: 'Manual de usuario | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  // Rutas de administración
  {
    path: '/SignInAdmin',
    name: 'SignInAdmin',
    component: SignInAdmin,
    meta: {
      title: 'Iniciar sesión | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path: '/Forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword,
    meta: {
      title: 'Recuperar contraseña | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path: '/Home-item-admin',
    name: 'HomeItemAdmin',
    component: HomeItemAdmin,
    meta: {
      title: 'Inicio Administración | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Client-detail',
    name: 'ClientDetails',
    component: ClientDetails,
    meta: {
      title: 'Detalles del Cliente | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Quotes-item',
    name: 'QuotesDetails',
    component: QuotesDetails,
    meta: {
      title: 'Detalles de Cotizaciones | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Visits-item',
    name: 'VisitorDetails',
    component: VisitorDetails,
    meta: {
      title: 'Detalles de Visitas | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Inventory-item',
    name: 'InventoryDetails',
    component: InventoryDetails,
    meta: {
      title: 'Detalles de Inventario | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Services-item',
    name: 'ServicesDetails',
    component: ServicesDetails,
    meta: {
      title: 'Servicios | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Financial-summary',
    name: 'FinancialSummary',
    component: FinancialSummary,
    meta: {
      title: 'Resumen Financiero | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Invoice-item',
    name: 'InvoiceDetails',
    component: InvoiceDetails,
    meta: {
      title: 'Facturas | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Suppliers-item',
    name: 'SuppliersDetails',
    component: SuppliersDetails,
    meta: {
      title: 'Proveedores | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Business-purchases',
    name: 'BusinessPurchases',
    component: BusinessPurchases,
    meta: {
      title: 'Compras | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Bills-item',
    name: 'BillsDetails',
    component: BillsDetails,
    meta: {
      title: 'Facturas de Proveedores | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Payroll-item',
    name: 'PayrollItem',
    component: PayrollItem,
    meta: {
      title: 'Nómina | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Staff-detail',
    name: 'StaffDetails',
    component: StaffDetails,
    meta: {
      title: 'Personal de la empresa | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Work-schedules',
    name: 'AdminScheduler',
    component: AdminScheduler,
    meta: {
      title: 'Horarios de Trabajo | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path:'/Worker-hours',
    name: 'WorkerHours',
    component: WorkerHours,
    meta: {
      title: 'Horas de Trabajas por empleado | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  // Operator views
  {
    path: '/SignInOperator',
    name: 'OperatorSignIn',
    component: OperatorSignIn,
    meta: {
      title: 'Iniciar sesión Operador | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path: '/Home-item-operator',
    name: 'HomeItemOperator',
    component: HomeItemOperator,
    meta: {
      title: 'Inicio Operador | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path: '/Visits-item-operator',
    name: 'VisitorDetailsOperator',
    component: VisitorDetailsOperator,
    meta: { 
      title: 'Detalles de Visitas | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  {
    path: '/Inventory-item-operator',
    name: 'InventoryDetailsOperator',
    component: InventoryDetailsOperator,
    meta: {
      title: 'Detalles de Inventario | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },  
  },
  {
    path: '/Work-schedules-operator',
    name: 'WorkSchedulesOperator',
    component: WorkSchedulesOperator,
    meta: {
      title: 'Horarios de Trabajo | Plataforma Grupman',
      description: 'Plataforma Grupman — soluciones profesionales para tu empresa.',
    },
  },
  // Redirección para rutas no encontradas (404)
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'auto' };
    }
  },
});

const defaultTitle = 'Grupman';
const defaultDescription = 'Grupman — soluciones profesionales para tu empresa.';

router.afterEach((to) => {
  window.scrollTo(0, 0);

  // Título dinámico
  document.title = to.meta.title || defaultTitle;

  // Meta description dinámica
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', to.meta.description || defaultDescription);

  // Canonical dinámico
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  const base = process.env.BASE_URL.endsWith('/')
    ? process.env.BASE_URL
    : `${process.env.BASE_URL}/`;
  const cleanPath = to.path.replace(/^\//, '');
  canonicalLink.setAttribute('href', `${window.location.origin}${base}${cleanPath}`);
});

export default router;