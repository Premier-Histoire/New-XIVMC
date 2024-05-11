<template>
  <div id="app">
    <Header />
    <div class="main-content" :class="{ 'mobile-layout': isMobile }">
      <div class="left-content">
        <div class="item-search">
          <h5>検索結果</h5>
        </div>
        <div class="scrollable-area">
          <Itemlist class="item-list"></Itemlist>
        </div>
      </div>
      <div class="right-content">
        <Detail />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Itemlist from './components/Itemlist.vue';
import Detail from './components/Detail.vue';

export default {
  components: {
    Header,
    Itemlist,
    Detail
  },
  data() {
    return {
      isMobile: false
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkIsMobile);
    this.checkIsMobile();
  },
  destroyed() {
    window.removeEventListener('resize', this.checkIsMobile);
  },
  watch: {
    '$route.params.tagName': function (newValue, oldValue) {
      if (newValue !== oldValue) { // タグの名前が変更された場合に再検索を行う
        this.scrollToTop(); // スクロール位置を一番上に戻す
      }
    }
  },
  methods: {
    checkIsMobile() {
      this.isMobile = window.innerWidth <= 768; // 768px以下の場合をスマートフォンと見なす
    },
    scrollToTop() {
      this.$el.querySelector('.scrollable-area').scrollTop = 0; // スクロール可能領域のscrollTopを0に設定してスクロール位置を一番上に戻す
    }
  },
};
</script>

<style>
.main-content {
  position: absolute;
  top: 64px;
  /* ヘッダーの高さ分下にずらす */
  left: 0;
  width: 100%;
  bottom: 0;
  overflow-x: hidden;
}

.left-content {
  width: 25%;
  float: left;
  height: calc(100vh - 64px);
  /* ヘッダーの高さを引いた値を高さに設定 */
  padding: 10px;
}

.item-search {
  display: flex;
  align-items: center; /* 縦方向（上下）の中央揃え */
}

.scrollable-area {
  width: 100%;
  /* 左右の余白を削除してスクロール可能領域の幅を設定 */
  height: calc(100% - 40px);
  overflow-y: auto;
  /* スクロール可能にする */
}

.right-content {
  width: 75%;
  height: calc(100vh - 64px);
  float: left;
  border-left: 1px solid #d0d7de;
  /* 左側に境界線を追加 */
}

.mobile-layout {
  flex-direction: column;
  /* Mobileの場合、上下にレイアウト */
}

.mobile-layout .left-content {
  width: 100%;
  border-left: none;
  /* モバイルの場合は境界線を削除 */
}

.mobile-layout .right-content {
  display: none; /* モバイルの場合は右側のコンテンツエリアを非表示にする */
}

.item-list {
  width: 100%;
}
</style>
