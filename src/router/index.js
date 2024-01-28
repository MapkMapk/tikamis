import { createRouter, createWebHistory } from 'vue-router';
// Shared
import Index from '@/views/Index.vue';
import AuthView from '@/views/AuthView.vue'
import ManageSettingsView from '@/views/ManageSettingsView.vue'
import ReportPostsDowntimeView from '@/views/ReportPostsDowntimeView.vue'
// Mechanic
import MechanicAuthView from '@/views/Mechanic/MechanicAuth/MechanicAuthView.vue';
import MechanicHumanSelectView from '@/views/Mechanic/MechanicHumanSelect/MechanicHumanSelectView.vue';
import MechanicOrderView from '@/views/Mechanic/MechanicOrder/MechanicOrderView.vue';
import MechanicOrderWorkAddView from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddView.vue';
import MechanicPaymentQrView from '@/views/Mechanic/MechanicPaymentQr/MechanicPaymentQrView.vue';
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';
// Director
import { useDirectorUserStore } from '@/stores/director/directorUser.js'
// Sadmin
import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // Base routes

    {
      path: '/',
      name: 'root',
      component: Index,
      meta: {title: 'Выбор раздела | Tikamis'},
    },

    // Sadmin routes

    {
      path: '/sadmin/auth',
      name: 'sadmin.auth',
      component: AuthView,
      meta: {title: 'Аутентификация | Суперадмин | Tikamis'},
      props: {title: 'Панель админа'},
    },
    {
      path: '/sadmin/manage/settings',
      name: 'sadmin.manage.settings',
      component: ManageSettingsView,
      meta: {title: 'Настройки | Суперадмин | Tikamis'},
    },

    // Director routes

    {
      path: '/director/auth',
      name: 'director.auth',
      component: AuthView,
      meta: {title: 'Аутентификация | Директор | Tikamis'},
      props: {title: 'Панель директора'},
    },
    {
      path: '/director/manage/settings',
      name: 'director.manage.settings',
      component: ManageSettingsView,
      meta: {title: 'Настройки | Директор'},
    },
    {
      path: '/director/report/posts-downtime',
      name: 'director.report.postsDowntime',
      component: ReportPostsDowntimeView,
      meta: {title: 'Простои постов | Директор | Tikamis'},
    },

    // Mechanic routes

    {
      path: '/mechanic/auth',
      name: 'mechanic.auth',
      component: MechanicAuthView,
      meta: {title: 'Аутентификация | Механик | Tikamis'},
    },
    {
      path: '/mechanic/human-select',
      name: 'mechanic.humanSelect',
      component: MechanicHumanSelectView,
      meta: {title: 'Выбор механика | Механик | Tikamis'},
    },
    {
      path: '/mechanic/order',
      name: 'mechanic.order',
      component: MechanicOrderView,
      meta: {title: 'Заказ | Механик | Tikamis'},
    },
    {
      path: '/mechanic/order/work-add',
      name: 'mechanic.order.workAdd',
      component: MechanicOrderWorkAddView,
      meta: {title: 'Добавление работы в заказ | Механик | Tikamis'}
    },
    {
      path: '/mechanic/payment-qr',
      name: 'mechanic.paymentQr',
      component: MechanicPaymentQrView,
      meta: {title: 'QR Код | Механик | Tikamis'}
    },

    // 404 page

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Index,
      meta: {title: 'Выбор раздела | Tikamis'}
    }
  ]
});

router.beforeEach((to, from, next) => {

  // Именование страницы (meta)
  document.title = to.meta.title ? to.meta.title : 'Tikamis';

  //Сюда попадание при попытке перехода на одну из страниц раздела SADMIN
  if (to.fullPath.split('/')[1] === 'sadmin') {
    const sadminUserStore = useSadminUserStore();

    if (!sadminUserStore.accessToken) {
      if (to.name === 'sadmin.auth') {
        return next();
      } else {
        return next({
          name: 'sadmin.auth'
        })
      }
    }

    if (sadminUserStore.accessToken) {
      //
    }
  }

  // Сюда попадание при попытке перехода на одну из страниц раздела DIRECTOR
  if (to.fullPath.split('/')[1] === 'director') {
    const directorUserStore = useDirectorUserStore()

    if (!directorUserStore.accessToken) {
      if (to.name === 'director.auth') {
        return next();
      } else {
        return next({
          name: 'director.auth'
        })
      }
    }

    if (directorUserStore.accessToken) {
    //
    }
  }

  // Сюда попадание при попытке перехода на одну из страниц раздела MECHANIC
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
