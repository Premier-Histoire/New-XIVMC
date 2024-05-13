import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Itemlist from './components/Itemlist.vue'

// デフォルトのパスを定義
const defaultTagNumber = '1'; // デフォルトのタグ番号

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', component: Itemlist, props: true },
  { path: '/name/:ItemName', component: Itemlist, props: true },
  // ルートパスの定義
  { 
    path: '/:pathMatch(.*)*', // すべてのパスにマッチ
    redirect: (to) => {
      // リダイレクト先のパスを動的に生成
      return `/tag/${to.params.tagNumber || defaultTagNumber}`;
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
