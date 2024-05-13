<template>
  <div id="app">
    <Header />
    <div class="main-content" :class="{ 'mobile-layout': isMobile }">
      <div class="left-content" :class="{ 'hide': isMobile && !rightContentVisible }">
        <div class="item-search">
          <h5>検索結果</h5>
        </div>
        <div class="scrollable-area">
          <Itemlist class="item-list" :tagNumber="tagNumber" @item-clicked="ItemListClick"></Itemlist>
        </div>
      </div>
      <div class="right-content" :class="{ 'hide': isMobile && rightContentVisible }">
        <Detail v-show="!isMobile" />
        <MobileDetail v-show="isMobile" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Itemlist from './components/Itemlist.vue';
import Detail from './components/Detail.vue';
import MobileDetail from './components/MobileDetail.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Header,
    Itemlist,
    Detail,
    MobileDetail,
  },
  computed: {
    ...mapState(['rightContentVisible']),
  },
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkIsMobile);
    this.checkIsMobile();
  },
  destroyed() {
    window.removeEventListener('resize', this.checkIsMobile);
  },
  methods: {
    ...mapActions(['toggleRightContentVisibility']),
    checkIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    ItemListClick() {
      if (this.isMobile) {
        this.toggleRightContentVisibility();
      }
    },
  },
};
</script>

<style>
.main-content {
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow: hidden;
}

.left-content {
  width: 25%;
  float: left;
  height: calc(100vh - 64px);
  padding: 10px;
  overflow-y: hidden;
}

.item-search {
  display: flex;
  align-items: center;
}

.scrollable-area {
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: auto;
}

.right-content {
  width: 75%;
  height: calc(100vh - 64px);
  float: left;
  border-left: 1px solid #d0d7de;
}

.mobile-layout {
  flex-direction: column;
}

.mobile-layout .right-content,
.mobile-layout .left-content {
  width: 100%;
  border-left: none;
}

.item-list {
  width: 100%;
}

.hide {
  display: none;
}
</style>
