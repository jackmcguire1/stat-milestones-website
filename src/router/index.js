import { createRouter, createWebHistory } from 'vue-router'
import Channels from '../views/Channels.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Channels
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
