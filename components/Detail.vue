<template>
  <div class="item-detail" v-if="Itemdata">
    <div class="item-header">
      <div class="item-icon">
        <img :src="getImageUrl(Itemdata.Icon)" alt="Item Icon">
      </div>
      <div class="item-info">
        <div class="item-name">
          <h1><span>{{ Itemdata.LevelItem }}</span> {{ Itemdata.Name }}</h1>
          <svg xmlns=" http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clipboard"
          viewBox="0 0 16 16" @click="copyItemName">
          <path
            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
          <path
            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg>
        </div>
        <div class="item-description">
          {{ Itemdata.Description }}
        </div>
      </div>
    </div>
    <div class="item-data">

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['Itemdata']) // ストアのItemdataをコンポーネントのItemdataとしてマッピング
  },
  methods: {
    getImageUrl(icon) {
      const normalizedIcon = String(icon).slice(0, -3) + '000'; // 万と千の桁以下を捨てて020000の形式に変換
      return `https://xivapi.com/i/0${normalizedIcon}/0${icon}_hr1.png`; // XIVAPIから画像を取得
    },
    copyItemName() {
      const itemName = this.Itemdata.Name;
      navigator.clipboard.writeText(itemName)
        .then(() => {
          alert(`${itemName}がクリップボードにコピーされました！`);
        })
        .catch(err => {
          console.error('テキストのコピーに失敗しました：', err);
        });
    }
  },
  watch: {
    Itemdata: {
      immediate: true, // 初期化時にも実行
      handler(newValue, oldValue) {
        // Itemdataが変更されたら画像URLを更新する
        if (newValue !== oldValue) {
          // 新しいアイテムのアイコンを取得
          const icon = newValue && newValue.Icon;
          // 画像URLを取得し、更新
          this.imageUrl = this.getImageUrl(icon);
        }
      }
    }
  },
  data() {
    return {
      imageUrl: '' // 画像URLを保持するための変数
    };
  }
};
</script>

<style scoped>
.item-detail {
  display: flex;
  flex-flow: column;
  padding: 20px;
  height: 100%;
}

.item-header {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}

.item-icon img {
  width: 100px;
  height: 100px;
}

.item-info {
  width: calc(100% - 100px);
  height: 100px;
  padding-left: 25px;
}

.item-name {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer; /* クリック可能であることを示すカーソル */
}

.item-name span {
  color: #f0c91b;
}

.item-name svg {
  margin-bottom: .5rem;
}

.item-data {
  background-color: red;
  opacity: 0.3;
  width: 100%;
  flex-grow: 1;
}
</style>
