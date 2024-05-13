import { createStore } from 'vuex';
import Cookies from 'js-cookie';

// クッキーからデータを読み込む
const savedItemData = Cookies.get('Itemdata');

export default createStore({
  state: {
    sidebarOpen: false,
    Itemdata: savedItemData ? JSON.parse(savedItemData) : [], // クッキーからデータを読み込む
    rightContentVisible: true,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    saveItemData(state, item) {
      state.Itemdata = item;

      // クッキーにデータを保存
      Cookies.set('Itemdata', JSON.stringify(item), { expires: 7 }); // クッキーの有効期限を7日に設定
    },
    toggleRightContentVisibility(state) {
      console.log("check")
      state.rightContentVisible = !state.rightContentVisible;
    },
  },
  actions: {
    saveItemData({ commit }, item) {
      commit('saveItemData', item);
    },
    toggleRightContentVisibility({ commit }) {
      commit('toggleRightContentVisibility');
    },
  },
  getters: {
    // 必要に応じてゲッターを定義
  }
});
