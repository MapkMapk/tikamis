import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/Auth/Auth.vue'
import PostSelector from '@/pages/PostSelector/PostSelector.vue'
import MechanicSelector from '@/pages/MechanicSelector/MechanicSelector.vue'
import Order from '@/pages/Order/Order.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/post-selector',
      name: 'Post Selector',
      component: PostSelector
    },
    {
      path: '/mechanic-selector',
      name: 'Post Opener',
      component: MechanicSelector
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
    // {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
