<template>
  <div v-if="filteredItems.length > 0">
    <ul ref="itemList" class="item-list">
      <li v-for="(item, index) in filteredItems" :key="item.ItemId" :class="{ 'last-item': index === filteredItems.length - 1 }" class="list-item" @click="handleItemClick(item)">
        <div class="item-wrapper">
          <img :src="getImageUrl(item.Icon)" alt="Item Icon">
          <span>{{ item.Name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Itemlist from "../assets/json/Item.json";

export default {
  props: ['tagNumber', 'ItemName'],
  data() {
    return {
      items: Itemlist,
      filteredItems: []
    };
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue.tagNumber) {
          this.filterItemsByTag(newValue.tagNumber);
        } else if (newValue.ItemName) {
          this.filterItemsByName(newValue.ItemName);
        }
      }
    }
  },
  methods: {
    filterItemsByTag(tagNumber) {
      this.filteredItems = this.items.filter(item => item.ItemSearchCategory === tagNumber);
      this.$nextTick(() => {
        this.scrollToTop();
      });
    },
    filterItemsByName(ItemName) {
      const decodedItemName = decodeURIComponent(ItemName);
      this.filteredItems = this.items.filter(item => item.Name.includes(decodedItemName));
      this.$nextTick(() => {
        this.scrollToTop();
      });
    },
    scrollToTop() {
      // アイテムリストのトップまでスクロールする
      this.$refs.itemList.scrollTop = 0;
    },
    getImageUrl(icon) {
      const normalizedIcon = String(icon).slice(0, -3) + '000';
      return `https://xivapi.com/i/0${normalizedIcon}/0${icon}.png`;
    },
    ...mapActions(['saveItemData']),
    handleItemClick(item) {
      this.saveItemData(item);
      this.$emit('item-clicked');
    },
  }
};
</script>

<style scoped>
ul {
  margin-bottom: 0;
}

.item-list {
  padding: 0;
  height: 100%;
  overflow-y: auto; /* スクロールバーを表示 */
}

.list-item {
  list-style-type: none !important;
}

.item-wrapper {
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;
}

.last-item .item-wrapper {
  margin-bottom: 0;
}

.item-wrapper img {
  margin-right: 10px;
  width: 40px;
  height: 40px;
}
</style>
