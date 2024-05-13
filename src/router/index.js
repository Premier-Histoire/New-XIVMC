import { createRouter, createWebHistory } from 'vue-router'
import Itemlist from './components/Itemlist.vue'

const routes = [
  { path: '/', component: App },
  // リダイレクト先に変数を渡してリダイレクトする
  { path: '/old-route/:oldParam', redirect: to => {
      if (to.params.oldParam.startsWith('tag')) {
        const tagNumber = to.params.oldParam.split('tag')[1];
        return { path: `/tag/${tagNumber}` };
      } else if (to.params.oldParam.startsWith('name')) {
        const ItemName = to.params.oldParam.split('name')[1];
        return { path: `/name/${ItemName}` };
      } else {
        // リダイレクト先が不明な場合はトップページにリダイレクト
        return { path: '/' };
      }
    }
  },
  // その他のルート
  { path: '/tag/:tagNumber', component: Itemlist, props: true },
  { path: '/name/:ItemName', component: Itemlist, props: true },
  { path: '/:pathMatch(.*)', redirect: '/' }, // 未定義のルートへのリダイレクト
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
