import { createRouter, createWebHistory } from 'vue-router'
import ReportsView from '../views/ReportsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ReportsView,
    },
  ],
})

export default router
