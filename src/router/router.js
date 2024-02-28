import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    component: () => import("../views/Home.vue")
  },
  {
    path: '/',
    redirect : '/login'
  },
  {
    path: '/favoritas',
    component: () => import("../views/PeliculasFavoritas.vue")
  },
  {
    path: '/watchlist',
    component: () => import("../views/PeliculasWatchlist.vue")
  },
  {
    path: '/guardadas',
    component: () => import("../views/PeliculasGuardadas.vue")
  },
  {
    path: '/login',
    component : () => import("../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
