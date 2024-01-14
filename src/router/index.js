import { createRouter, createWebHistory } from 'vue-router'
import MechanicAuth from '@/pages/Mechanic/MechanicAuth/MechanicAuth.vue'
import MechanicHumanSelect from '@/pages/Mechanic/MechanicHumanSelect/MechanicHumanSelect.vue'
import MechanicOrder from '@/pages/Mechanic/MechanicOrder/MechanicOrder.vue'
import MechanicOrderWorkAdd from '@/pages/Mechanic/MechanicOrder/MechanicOrderWorkAdd/MechanicOrderWorkAdd.vue'
import MechanicPaymentQr from '@/pages/Mechanic/MechanicPaymentQr/MechanicPaymentQr.vue'
import Index from '@/pages/index.vue'

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
      component: MechanicAuth
    },
    {
      path: '/mechanic/human-select',
      name: 'mechanic.humanSelect',
      component: MechanicHumanSelect
    },
    {
      path: '/mechanic/order',
      name: 'mechanic.order',
      component: MechanicOrder
    },
    {
      path: '/mechanic/order/work-add',
      name: 'mechanic.order.workAdd',
      component: MechanicOrderWorkAdd
    },
    {
      path: '/mechanic/payment-qr',
      name: 'mechanic.paymentQr',
      component: MechanicPaymentQr
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

  if (!accessToken) {

    if (to.name === 'mechanic.auth') {
      return next()
    } else {
      return next({
        name: 'mechanic.auth'
      })
    }

  }

  if (accessToken) {

    if (to.name === 'mechanic.humanSelect' && localStorage.getItem('activeMechanicId')) {
      return next({
        name: 'mechanic.order'
      })
    }
    if (to.name === 'mechanic.order' && localStorage.getItem('activeMechanicId') == "") {
      return next({
        name: 'mechanic.humanSelect'
      })
    }
    if (to.name === 'mechanic.auth') {
      return next({
        name: 'mechanic.humanSelect'
      })
    }
    next()

  }
})

export default router