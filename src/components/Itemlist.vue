<template>
  <div v-if="filteredItems.length > 0">
    <ul ref="itemList" class="item-list">
      <li v-for="(item, index) in filteredItems" :key="item.ItemId"
        :class="{ 'last-item': index === filteredItems.length - 1 }" class="list-item" @click="handleItemClick(item)">
        <div class="item-wrapper">
          <img :src="getImageUrl(item.Icon)" alt="Item Icon">
          <span>{{ item.Name }}</span>
          <img v-if="isCraftable(item.ItemId)" src="../assets/img/craft.png" alt="Craftable" class="craft">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Itemlist from "@/assets/json/Item.json";
import RecipeData from '@/assets/json/Recipe.json';


export default {
  props: ['tagNumber', 'ItemName'],
  data() {
    return {
      items: Itemlist,
      filteredItems: [],
      recipeData: RecipeData,
      materials: {}
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
    ...mapState(['saveItemData']),
    handleItemClick(item) {
      this.extractMaterials(item);
      this.$store.dispatch('saveItemData', item);
      this.$emit('item-clicked');
    },
    ...mapState(['saveMaterials']),
    extractMaterials(item) {
      const extractedMaterials = []; // 素材を一時的に格納する配列
      const processedItems = new Set(); // 処理済みのアイテムを追跡するためのセット

      const extractSubMaterials = (itemId) => {
        const subMaterials = [];

        // Item.jsonから素材の素材を再帰的に取得する
        this.recipeData.forEach(recipe => {
          if (recipe.ItemResult === itemId && !processedItems.has(itemId)) { // 処理されていないアイテムのみ処理する
            for (let i = 0; i < 10; i++) {
              const ingredientKey = `ItemIngredient[${i}]`;
              const amountKey = `AmountIngredient[${i}]`;

              if (recipe[ingredientKey] !== "0" && recipe[amountKey] !== "0") {
                const subMaterialId = recipe[ingredientKey];
                const subMaterialAmount = recipe[amountKey];

                // Item.jsonから素材の名前を取得
                const subMaterial = this.items.find(item => item.ItemId === subMaterialId);
                const subMaterialIconId = subMaterial ? subMaterial.Icon : "Unknown";
                const subMaterialName = subMaterial ? subMaterial.Name : "Unknown";

                // 素材の素材を再帰的に取得する
                const subSubMaterials = extractSubMaterials(subMaterialId);

                subMaterials.push({
                  materialId: subMaterialId,
                  materialIcon: subMaterialIconId,
                  materialName: subMaterialName,
                  materialAmount: subMaterialAmount,
                  materials: subSubMaterials
                });
              }
            }
            // 処理済みのアイテムを追加
            processedItems.add(itemId);
          }
        });

        return subMaterials;
      };

      // Recipe.jsonから素材を抽出する
      this.recipeData.forEach(recipe => {
        if (recipe.ItemResult === item.ItemId) {
          for (let i = 0; i < 10; i++) {
            const ingredientKey = `ItemIngredient[${i}]`;
            const amountKey = `AmountIngredient[${i}]`;

            if (recipe[ingredientKey] !== "0" && recipe[amountKey] !== "0") {
              const materialId = recipe[ingredientKey];
              const amount = recipe[amountKey];

              // Item.jsonから素材の名前を取得
              const material = this.items.find(item => item.ItemId === materialId);
              const materialIcon = material ? material.Icon : "Unknown";
              const materialName = material ? material.Name : "Unknown";

              // 素材の素材を再帰的に取得する
              const subMaterials = extractSubMaterials(materialId);

              extractedMaterials.push({
                materialId: materialId,
                materialIcon: materialIcon,
                materialName: materialName,
                materialAmount: amount,
                materials: subMaterials // 素材のリストは再帰的に取得した素材のリスト
              });
            }
          }
        }
      });

      // 抽出された素材をthis.materialsに代入
      this.materials = extractedMaterials;
      this.$store.dispatch('saveMaterials', this.materials);
    },
    isCraftable(itemId) {
      return RecipeData.some(recipe => recipe.ItemResult.includes(itemId));
    }
  }
};

</script>

<style scoped>
.item-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 5px;
}

.item-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.item-wrapper img:first-child {
  margin-right: 10px;
}

.item-wrapper span {
  flex-grow: 1;
}

.craft {
  margin-left: auto;
  /* この行でcraftを右端に移動 */
  width: 20px;
  /* craft画像の幅を20pxに設定 */
  height: 20px;
  /* craft画像の高さを20pxに設定 */
}

.last-item {
  border-bottom: none;
}
</style>
