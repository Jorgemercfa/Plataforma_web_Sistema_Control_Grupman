import { createRouter, createWebHistory } from 'vue-router';

// Usamos '@' (apunta a src/) y la ruta exacta en minúsculas: 'adminViews'
import MainHome from '@/views/Main-Home.vue';
import SignInAdmin from '@/views/AdminViews/Sign-in-admin.vue';
import ForgetPassword from '@/views/AdminViews/Forget-password-admin.vue';
import HomeItemAdmin from '@/views/AdminViews/Home-item-admin.vue';

const routes = [
  {
    path: '/',
    name: 'MainHome',
    component: MainHome,
    meta: {
      title: 'Inicio | Plataforma Grupman',
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