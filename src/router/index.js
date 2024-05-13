import { createRouter, createWebHistory } from 'vue-router'
import Itemlist from './components/Itemlist.vue'

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', component: App, props: true},
  { path: '/name/:ItemName', component: App, props: true},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
