import { createRouter, createWebHistory } from 'vue-router'
import Channels from '../views/Channels.vue'
import Playground from '../views/Playground.vue'
import Analytics from '../views/Analytics.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/channels',
    name: 'Channels',
    component: Channels
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
