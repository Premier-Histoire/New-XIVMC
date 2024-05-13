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
    path: '/tag/:tagNumber', // /tag/ で始まるパスにマッチ
    redirect: (to) => {
      // パスが /tag/ で始まる場合、リダイレクトしない
      return to.path;
    }
  },
  {
    path: '/name/:ItemName', // /name/ で始まるパスにマッチ
    redirect: (to) => {
      // パスが /name/ で始まる場合、リダイレクトしない
      return to.path;
    }
  },
  { 
    path: '/:catchAll(.*)', // すべてのパスにマッチ
    redirect: (to) => {
      // パスが /tag/ または /name/ で始まる場合のみリダイレクト
      if (to.path.startsWith('/tag/') || to.path.startsWith('/name/')) {
        return to.path;
      } else {
        // それ以外の場合、デフォルトのパスにリダイレクト
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
