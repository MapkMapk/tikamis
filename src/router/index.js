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
      name: 'Root page',
      component: Index
    },

    // Mechanic routes

    {
      path: '/mechanic/auth',
      name: 'Mechanic auth',
      component: MechanicAuth
    },
    {
      path: '/mechanic/human-select',
      name: 'Mechanic human select',
      component: MechanicHumanSelect
    },
    {
      path: '/mechanic/order',
      name: 'Mechanic order',
      component: MechanicOrder
    },
    {
      path: '/mechanic/order/work-add',
      name: 'Mechanic order work add',
      component: MechanicOrderWorkAdd
    },
    {
      path: '/mechanic/payment-qr',
      name: 'Mechanic payment QR',
      component: MechanicPaymentQr
    },

    // Sadmin routes

    // Director routes

  ]
})




// {
// path: '/about',
// name: 'about',
// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import('../views/AboutView.vue')
// }

export default router
