import { createRouter, createWebHistory } from 'vue-router'
import SeatView from '../views/SeatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: SeatView
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TransparentView.vue')
    }
  ]
})

export default router
