import { createRouter, createWebHistory } from 'vue-router'
import MechanicAuthView from '@/views/Mechanic/MechanicAuth/MechanicAuthView.vue'
import MechanicHumanSelectView from '@/views/Mechanic/MechanicHumanSelect/MechanicHumanSelectView.vue'
import MechanicOrderView from '@/views/Mechanic/MechanicOrder/MechanicOrderView.vue'
import MechanicOrderWorkAddView from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddView.vue'
import MechanicPaymentQrView from '@/views/Mechanic/MechanicPaymentQr/MechanicPaymentQrView.vue'
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js'
import Index from '@/views/index.vue'

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

    // 404 page

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Index
    }
  ]
})

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken')
  let mechanicUserStore = useMechanicUserStore()

  // Роутинг если в localStorage нету access токена

  if (!accessToken) {
    if (to.name === 'mechanic.auth') {
      return next()
    } else {
      return next({
        name: 'mechanic.auth'
      })
    }
  }

  // Роутинг если в localStorage есть access токен

  if (accessToken) {
    // Если переход на страницу выбора механика, но механик уже выбран
    // то редиректнуть на страницу заказа
    if (to.name === 'mechanic.humanSelect' && mechanicUserStore.activeMechanicId) {
      return next({
        name: 'mechanic.order'
      })
    }
    // Если переход на страницу заказа, но механик ещё не выбран
    // то редиректнуть на страницу выбора механика
    if (to.name === 'mechanic.order' && mechanicUserStore.activeMechanicId === '') {
      return next({
        name: 'mechanic.humanSelect'
      })
    }
    // Если переход на страницу авторизации, но человек уже авторизован
    // То переход на страницу выбора механика
    if (to.name === 'mechanic.auth' && localStorage.getItem('accessToken')) {
      return next({
        name: 'mechanic.humanSelect'
      })
    }

    next()
  }
})

export default router
