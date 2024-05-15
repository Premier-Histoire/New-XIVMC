import { createStore } from 'vuex';
import Cookies from 'js-cookie';

// クッキーからデータを読み込む
const savedItemData = Cookies.get('Itemdata');
const savedMaterials = Cookies.get('materials');

export default createStore({
  state: {
    sidebarOpen: false,
    Itemdata: savedItemData ? JSON.parse(savedItemData) : [],
    rightContentVisible: true,
    materials: savedMaterials ? JSON.parse(savedMaterials) : [], // クッキーからデータを読み込む
    clicked: false,
    clickedsale: false,
    clickedbuy: false
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
      Cookies.set('Itemdata', JSON.stringify(item), { expires: 7 });
    },
    toggleRightContentVisibility(state) {
      state.rightContentVisible = !state.rightContentVisible;
    },
    saveMaterials(state, materials) {
      state.materials = materials;

      // クッキーにデータを保存
      Cookies.set('materials', JSON.stringify(materials), { expires: 7 });
    },
    setClicked(state, value) {
      state.clicked = value;
    },
    setClickedsale(state, value) {
      state.clickedsale = value;
    },
    setClickedbuy(state, value) {
      state.clickedbuy = value;
    }
  },
  actions: {
    saveItemData({ commit }, item) {
      commit('saveItemData', item);
    },
    toggleRightContentVisibility({ commit }) {
      commit('toggleRightContentVisibility');
    },
    saveMaterials({ commit }, materials) {
      commit('saveMaterials', materials);
    },
    setClicked({ commit }, value) {
      commit('setClicked', value);
    },
    setClickedsale({ commit }, value) {
      commit('setClickedsale', value);
    },
    setClickedbuy({ commit }, value) {
      commit('setClickedbuy', value);
    }
  },
  getters: {
    clicked(state) {
      return state.clicked;
    },
    clickedsale(state) {
      return state.clickedsale;
    },
    clickedbuy(state) {
      return state.clickedbuy;
    }
  }
});
