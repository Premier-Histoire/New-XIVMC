import { createRouter, createWebHistory } from 'vue-router'
import Itemlist from './components/Itemlist.vue'

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', component: Itemlist, props: true },
  { path: '/name/:ItemName', component: Itemlist, props: true },
  // 追加のルート
  { path: '/tag/', redirect: '/' },
  { path: '/name/', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
