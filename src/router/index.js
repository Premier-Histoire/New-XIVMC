import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Itemlist from './components/Itemlist.vue'

// デフォルトのタグ番号
const defaultTagNumber = '1';

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', component: Itemlist, props: true },
  { path: '/name/:ItemName', component: Itemlist, props: true },
  // その他のパスへのリダイレクトを処理
  {
    path: '/:catchAll(.*)', // すべてのパスにマッチ
    redirect: (to) => {
      // リダイレクト先のパスを動的に生成
      if (to.params.tagNumber) {
        // /tag/パスにアクセスされ、かつtagNumberが指定されている場合
        return `/tag/${to.params.tagNumber}`;
      } else if (to.params.ItemName) {
        // /name/パスにアクセスされ、かつItemNameが指定されている場合
        return `/name/${to.params.ItemName}`;
      } else {
        // それ以外の場合はデフォルトのパスにリダイレクト
        return `/tag/${defaultTagNumber}`;
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
