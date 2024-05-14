import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/main.css'
import store from './store';
import App from './App.vue'
import Itemlist from './components/Itemlist.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const routes = [
  { path: '/', component: App },
  { path: '/tag/:tagNumber', component: Itemlist, props: true},
  { path: '/name/:ItemName', component: Itemlist, props: true},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(store).use(router).mount('#app')
