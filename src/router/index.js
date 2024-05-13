import { createRouter, createWebHistory } from 'vue-router'
import Itemlist from './components/Itemlist.vue'

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', component: Itemlist, props: true },
  { path: '/name/:ItemName', component: Itemlist, props: true },
  // リダイレクトを追加
  { path: '/tag/:oldParam', redirect: to => {
      return { path: `/tag/${to.params.oldParam}` }
    }
  },
  // 未定義のルートへのリダイレクト
  { path: '/:pathMatch(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
