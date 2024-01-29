import { createRouter, createWebHistory } from 'vue-router';
// Shared
import Index from '@/views/Index.vue';
import { mechanicBeforeEach, mechanicRoutes } from '@/router/mechanic.js';
import { sadminBeforeEach, sadminRoutes } from '@/router/sadmin.js';
import { directorBeforeEach, directorRoutes } from '@/router/director.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Index,
      meta: { title: 'Выбор раздела | Tikamis' }
    },
    sadminRoutes,
    directorRoutes,
    mechanicRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ]
});

router.beforeEach((to) => {

  // Именование страницы (meta)
  document.title = to?.meta.title ? to.meta.title : 'Tikamis';

  // Определение раздела
  let routingSection = to.fullPath.split('/')[1];

  // Делегирование обработки роутов в зависимости от раздела, к которому взывает пользователь
  if (routingSection === 'sadmin') {
    return sadminBeforeEach(to);
  }
  if (routingSection === 'director') {
    return directorBeforeEach(to);
  }
  if (routingSection === 'mechanic') {
    return mechanicBeforeEach(to);
  }
});

export default router;
