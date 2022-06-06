import { createRouter, createWebHistory } from 'vue-router'
import Channels from '../views/Channels.vue'
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
  }
]

const router = createRouter({
  history: createWebHistory('/stat-milestones-website/'),
  routes
})

export default router
