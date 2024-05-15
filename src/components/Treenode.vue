<template>
  <div>
    <ul class="treeview">
      <li v-for="(material, index) in materials" :key="index">
        <div @click="toggleNode(material)" class="treeview-item">
          <span class="treeview-folder">
            <i
              :class="{ 'icon-plus': !material.expanded && material.materials && material.materials.length > 0, 'icon-minus': material.expanded && material.materials.length > 0, 'icon-blank': !material.materials || material.materials.length === 0 }"></i>
            <img :src="getImageUrl(material.materialIcon)" alt="Material Icon" class="material-icon">
            <span class="material-info">
              <span class="material-name">{{ material.materialName }}</span>
              <span class="material-amount">{{ material.materialAmount }}個</span>
              <span v-if="material.totalPrice !== undefined && !isNaN(material.totalPrice)" class="material-price"
                :style="{ color: isCreatePriceCheaper(material) ? 'red' : 'inherit' }">
                {{ formatNumber(material.totalPrice) }} <i class="xiv gil"></i>
              </span>
              <span v-else class="loading-container">
                <span class="loading-spinner"></span>
              </span>
            </span>
          </span>
        </div>
        <!-- 再帰的に素材を表示 -->
        <ul v-show="material.expanded && material.materials && material.materials.length > 0" class="treeview-row">
          <li v-for="(subMaterial, subIndex) in material.materials" :key="subIndex">
            <div class="treeview-item">
              <span class="treeview-folder">
                <img :src="getImageUrl(subMaterial.materialIcon)" alt="Material Icon" class="material-icon">
                <span class="material-info">
                  <span class="material-name">{{ subMaterial.materialName }}</span>
                  <span class="material-amount">{{ subMaterial.materialAmount }}個</span>
                  <span v-if="subMaterial.totalPrice !== undefined && !isNaN(subMaterial.totalPrice)"
                    class="material-price" :style="{ color: isCreatePriceCheaper(subMaterial) ? 'red' : 'inherit' }">
                    {{ formatNumber(subMaterial.totalPrice) }} <i class="xiv gil"></i>
                  </span>
                  <span v-else class="loading-container">
                    <span class="loading-spinner"></span>
                  </span>
                </span>
              </span>
            </div>
          </li>
        </ul>
      </li>
      <li v-if="loading || totalPrice === undefined" class="treeview-price">
        <div class="treeview-item">
          <i class="icon-blank"></i>
          <i class="material-icon"></i>
          <span class="treeview-folder border-top border-dark">
            <span class="material-info">
              <span class="material-name"></span>
              <span class="material-amount">価格</span>
              <span class="loading-container">
                <span class="loading-spinner"></span>
              </span>
            </span>
          </span>
        </div>
      </li>
      <li v-else class="treeview-price">
        <div class="treeview-item">
          <i class="icon-blank"></i>
          <i class="material-icon"></i>
          <span class="treeview-folder border-top border-dark">
            <span style="width:48px;"></span>
            <span class="material-info">
              <span class="material-name"></span>
              <span class="material-amount">価格</span>
              <span class="material-price">{{ formatNumber(totalPrice) }} <i class="xiv gil"></i></span>
            </span>
          </span>
        </div>
      </li>
      <li v-if="loading || mainMaterialPrice === undefined || mainMaterialPrice === 0" class="treeview-price">
        <div class="treeview-item">
          <i class="icon-blank"></i>
          <i class="material-icon"></i>
          <span class="treeview-folder">
            <span class="material-info">
              <span class="material-name"></span>
              <span class="material-amount">相場</span>
              <span class="loading-container">
                <span class="loading-spinner"></span>
              </span>
            </span>
          </span>
        </div>
      </li>
      <li v-else class="treeview-price">
        <div class="treeview-item">
          <i class="icon-blank"></i>
          <i class="material-icon"></i>
          <span class="treeview-folder">
            <span class="material-info">
              <span class="material-name"></span>
              <span class="material-amount">相場</span>
              <span class="material-price">{{ formatNumber(mainMaterialPrice) }} <i class="xiv gil"></i></span>
            </span>
          </span>
        </div>
      </li>
      <li v-if="!loading && mainMaterialPrice !== undefined && mainMaterialPrice !== 0" class="treeview-price">
        <div class="treeview-item">
          <i class="icon-blank"></i>
          <i class="material-icon"></i>
          <span class="treeview-folder">
            <span class="material-info">
              <span class="material-name"></span>
              <span class="material-amount">利益率</span>
              <span class="material-price">{{ formatNumber((mainMaterialPrice / totalPrice * 100).toFixed(2)) }}%</span>
            </span>
          </span>
        </div>
      </li>
      <li v-else class="treeview-price">
        <div class="treeview-item">
          <i class="icon-blank"></i>
          <i class="material-icon"></i>
          <span class="treeview-folder">
            <span class="material-info">
              <span class="material-name"></span>
              <span class="material-amount">利益率</span>
              <span class="material-price">{{ formatNumber(mainMaterialPrice) }} %</span>
            </span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'TreeNode',
  props: {
    materials: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      loading: true,
      totalPrice: 0,
      mainMaterialPrice: 0,
    };
  },
  computed: {
    ...mapState(['Itemdata', 'clicked']),
  },
  methods: {
    async toggleNode(material) {
      material.expanded = !material.expanded;
    },
    getImageUrl(icon) {
      const normalizedIcon = String(icon).slice(0, -3) + '000';
      return `https://xivapi.com/i/0${normalizedIcon}/0${icon}.png`;
    },
    async limitRequests(requests, limit) {
      const chunks = this.chunkArray(requests, limit);
      for (const chunk of chunks) {
        await Promise.all(chunk);
        await this.sleep(1000);
      }
    },
    async fetchMarketPrices() {
      const requests = this.materials.map(async material => {
        if (material.materialIcon && material.price === undefined) {
          await this.fetchMarketPrice(material);
          await this.fetchSubMaterialsPrices(material);
        }
      });
      await this.limitRequests(requests, 25);
      this.loading = false;
      this.calculateTotalPrice();
    },
    async fetchSubMaterialsPrices(material) {
      const requests = material.materials.map(subMaterial => {
        if (subMaterial.materialIcon && subMaterial.price === undefined) {
          return this.fetchMarketPrice(subMaterial);
        }
      });
      await this.limitRequests(requests, 25);
      material.loaded = true;

      this.updateMaterialPrice(material);
      this.calculateTotalPrice();
    },
    async fetchMarketPrice(material, retryCount = 0) {
      const maxRetries = 3;
      const server = 'JAPAN';
      const url = `https://universalis.app/api/v2/${server}/${material.materialId}?fields=minPrice`;

      try {
        const response = await axios.get(url);
        material.marketPrice = response.data.minPrice || '価格情報なし';
        this.updateMaterialPrice(material);
      } catch (error) {
        console.error('価格情報の取得に失敗しました:', error);
        material.marketPrice = '取得失敗';
        this.updateMaterialPrice(material); // 取得失敗時も価格を更新する
        if (retryCount < maxRetries) {
          console.log(`再試行中 (${retryCount + 1}/${maxRetries})...`);
          await this.sleep(1000);
          await this.fetchMarketPrice(material, retryCount + 1);
        }
      }
    },
    async fetchMainMaterialPrice() { // ItemId を引数から削除
      const maxRetries = 3;
      const server = 'JAPAN';
      const ItemId = this.Itemdata.ItemId; // ItemId を Vuex から取得
      const url = `https://universalis.app/api/v2/${server}/${ItemId}?fields=minPrice`;

      try {
        const response = await axios.get(url);
        this.mainMaterialPrice = response.data.minPrice || '価格情報なし';
      } catch (error) {
        console.error('本体の価格情報の取得に失敗しました:', error);
        this.mainMaterialPrice = '取得失敗';
        if (retryCount < maxRetries) {
          console.log(`再試行中 (${retryCount + 1}/${maxRetries})...`);
          await this.sleep(1000);
          await this.fetchMarketPrice(material, retryCount + 1);
        }
      }
    },
    updateMaterialPrice(material) {
      if (material.materials && material.materials.length > 0) {
        const subMaterialsPrice = material.materials.reduce((sum, subMaterial) => {
          return sum + (subMaterial.marketPrice * subMaterial.materialAmount);
        }, 0);

        const createPrice = Math.ceil(subMaterialsPrice / (material.materialAmountResult || 1));

        material.CreatePrice = createPrice;
        material.totalPrice = createPrice * material.materialAmount;
      } else {
        material.CreatePrice = Math.ceil(material.marketPrice);
        material.totalPrice = material.marketPrice * material.materialAmount;
      }
    },
    calculateTotalPrice() {
      let totalPrice = 0;
      this.materials.forEach(material => {
        totalPrice += material.totalPrice;
      });
      this.totalPrice = totalPrice;
    },
    getUnitPrice(material) {
      console.log(material);
      if (material.marketPrice === '取得失敗' || material.marketPrice === '価格情報なし') {
        return material.marketPrice;
      }

      // CreatePriceが定義されている場合、より安い方を選択してmaterialAmountをかける
      if (material.CreatePrice !== undefined) {
        return Math.min(material.marketPrice, material.CreatePrice) * material.materialAmount;
      } else {
        return material.marketPrice * material.materialAmount;
      }
    },
    isCreatePriceCheaper(material) {
      if (material.CreatePrice !== undefined) {
        return material.CreatePrice < material.marketPrice;
      } else {
        return false; // CreatePriceが未定義の場合はmarketPriceが安いとみなす
      }
    },
    chunkArray(arr, size) {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    formatNumber(number) {
      if (number === '取得失敗' || number === '価格情報なし') {
        return number;
      }
      return number.toLocaleString();
    }
  },
  watch: {
    clicked: {
      handler(newVal) {
        if (newVal) {
          this.loading = true;
          this.fetchMarketPrices();
          this.fetchMainMaterialPrice();
          this.$store.dispatch('setClicked', false);
        } else {
          // clicked が false になったときの処理を行う
        }
      },
      immediate: true // コンポーネントの初期化時にも監視対象の変数を評価する
    },
  },
  created() {
    this.fetchMarketPrices();
  }
}
</script>

<style scoped>
/* モバイル用スタイル */
.treeview {
  list-style: none;
  padding-left: 0;
  color: black;
}

.treeview-row {
  list-style: none;
  padding-left: 2rem;
}

.treeview-row .treeview {
  margin-left: 1rem;
  color: grey;
}

.treeview-item {
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  min-height: 20px;
}

.treeview-folder {
  display: flex;
  flex-wrap: nowrap;
}

.treeview-file {
  color: #6c757d;
  display: flex;
}

.icon-plus,
.icon-minus,
.icon-blank {
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  flex-shrink: 0;
}

.icon-plus::before,
.icon-minus::before {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.icon-plus::before {
  content: "+";
}

.icon-minus::before {
  content: "-";
}

.icon-blank::before {
  content: "";
  display: inline-block;
  width: 100%;
}

.material-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.treeview-item:before {
  content: "";
  position: absolute;
  top: 0;
  left: -1rem;
  border-left: 1px solid #ced4da;
}

.material-info {
  display: flex;
  align-items: center;
}

.material-name {
  flex: 1;
  min-width: 150px;
}

.material-amount {
  min-width: 50px;
  text-align: right;
}

.material-price {
  min-width: 100px;
  text-align: right;
}

.loading-container {
  position: relative;
  width: 100px;
  height: 20px;
}

.loading-spinner {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* PC用スタイル */
@media (min-width: 768px) {
  .treeview {
    padding-left: 1rem;
  }

  .treeview-row {
    padding-left: 3rem;
  }

  .treeview-folder {
    height: 40px;
  }

  .treeview-item {
    padding-left: 0rem;
    padding-right: 1.5rem;
    padding-bottom: 10px;
  }

  .icon-plus,
  .icon-minus,
  .icon-blank {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    flex-shrink: 0;
  }

  .material-icon {
    width: 40px;
    height: 40px;
    margin-right: 1rem;
  }

  .material-name {
    min-width: 200px;
  }

  .material-amount {
    min-width: 70px;
    text-align: right;
  }

  .material-price {
    min-width: 120px;
    text-align: right;
  }

  .loading-container {
    width: 120px;
    height: 24px;
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
  }
}
</style>
