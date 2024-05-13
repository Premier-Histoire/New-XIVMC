import { createRouter, createWebHistory } from 'vue-router'
import Itemlist from './components/Itemlist.vue'

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', redirect: '/' },
  { path: '/name/:ItemName', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
