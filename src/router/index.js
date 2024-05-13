import { createRouter, createWebHistory } from 'vue-router'
import Itemlist from './components/Itemlist.vue'

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', component: Itemlist, props: true, redirect: '/' },
  { path: '/name/:ItemName', component: Itemlist, props: true, redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
