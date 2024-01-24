import { createRouter, createWebHistory } from 'vue-router';
// Базовая страница
import Index from '@/views/index.vue';
// Страницы и сторы механика
import MechanicAuthView from '@/views/Mechanic/MechanicAuth/MechanicAuthView.vue';
import MechanicHumanSelectView from '@/views/Mechanic/MechanicHumanSelect/MechanicHumanSelectView.vue';
import MechanicOrderView from '@/views/Mechanic/MechanicOrder/MechanicOrderView.vue';
import MechanicOrderWorkAddView from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddView.vue';
import MechanicPaymentQrView from '@/views/Mechanic/MechanicPaymentQr/MechanicPaymentQrView.vue';
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';
// Страницы и сторы директора
import DirectorAuthView from '@/views/Director/DirectorAuth/DirectorAuthView.vue'
import DirectorTechnicalSettingsView from '@/views/Director/DirectorTechnicalSettings/DirectorTechnicalSettingsView.vue'
import SadminAuthView from '@/views/Sadmin/SadminAuth/SadminAuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Base routes
    {
      path: '/',
      name: 'root',
      component: Index
    },

    // Mechanic routes

    {
      path: '/mechanic/auth',
      name: 'mechanic.auth',
      component: MechanicAuthView
    },
    {
      path: '/mechanic/human-select',
      name: 'mechanic.humanSelect',
      component: MechanicHumanSelectView
    },
    {
      path: '/mechanic/order',
      name: 'mechanic.order',
      component: MechanicOrderView
    },
    {
      path: '/mechanic/order/work-add',
      name: 'mechanic.order.workAdd',
      component: MechanicOrderWorkAddView
    },
    {
      path: '/mechanic/payment-qr',
      name: 'mechanic.paymentQr',
      component: MechanicPaymentQrView
    },

    // Director routes

    {
      path: '/director/auth',
      name: 'director.auth',
      component: DirectorAuthView
    },
    {
      path: '/director/technical-settings',
      name: 'director.technicalSettings',
      component: DirectorTechnicalSettingsView
    },

    // Sadmin routes

    {
      path: '/sadmin/auth',
      name: 'sadmin.auth',
      component: SadminAuthView
    },

    // 404 page

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Index
    }
  ]
});

router.beforeEach((to, from, next) => {

  // Сюда попадание при попытке перехода на одну из страниц раздела директора
  if (to.fullPath.split('/')[1] === 'director') {
    console.log('director route chapter')
  }

  // Сюда попадание при попытке перехода на одну из страниц раздела механика
  if (to.fullPath.split('/')[1] === 'mechanic') {
    const mechanicUserStore = useMechanicUserStore();
    const mechanicOrderStore = useMechanicOrderStore();

    // Роутинг если в localStorage нету access токена
    if (!mechanicUserStore.accessToken) {
      if (to.name === 'mechanic.auth') {
        return next();
      } else {
        return next({
          name: 'mechanic.auth'
        });
      }
    }

    // Роутинг если в localStorage есть access токен

    if (mechanicUserStore.accessToken) {
      // Если переход на страницу выбора механика, но механик уже выбран
      // то редиректнуть на страницу заказа
      if (to.name === 'mechanic.humanSelect' && mechanicUserStore.activeMechanicId) {
        return next({
          name: 'mechanic.order'
        });
      }
      // Если переход на страницу заказа, но механик ещё не выбран
      // то редиректнуть на страницу выбора механика
      if (to.name === 'mechanic.order' && mechanicUserStore.activeMechanicId === '') {
        return next({
          name: 'mechanic.humanSelect'
        });
      }
      // Если переход на страницу авторизации, но человек уже авторизован
      // то переход на страницу выбора механика
      if (to.name === 'mechanic.auth' && localStorage.getItem('accessToken')) {
        return next({
          name: 'mechanic.humanSelect'
        });
      }
      // Если переход на страницу добавления работ в заказ, но механик ещё не выбран
      // то редиректнуть на страницу выбора механика
      if (to.name === 'mechanic.order.workAdd' && !mechanicUserStore.activeMechanicId) {
        return next({
          name: 'mechanic.humanSelect'
        });
      }
      // Если переход на страницу с QR кодом, но QR код о завершении заказа ещё не получен
      // то редиректнуть на страницу заказа
      if (to.name === 'mechanic.paymentQr' && !mechanicOrderStore.qrcode) {
        return next({
          name: 'mechanic.order'
        });
      }
    }
  }

  next();

});

export default router;
