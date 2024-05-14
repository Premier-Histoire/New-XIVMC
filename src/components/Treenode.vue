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
              <span v-if="material.price" class="material-price">{{ formatNumber(material.price *
                material.materialAmount) }} <i class="xiv gil"></i></span>
              <span v-else class="loading-container"><span class="loading-spinner"></span></span> <!-- ローディング画像 -->
            </span>
          </span>
        </div>
        <ul v-show="material.expanded && material.materials && material.materials.length > 0" class="treeview-row">
          <tree-node :materials="material.materials" :key="material.id"></tree-node>
        </ul>
      </li>
      <li v-if="!loading" class="treeview-price">
        <div class="treeview-item">
          <span class="treeview-folder">
            <span style="width:48px;"></span>
            <span class="material-info">
              <span class="material-name"></span>
              <span class="material-amount">価格</span>
              <span v-if="!loading" class="material-price">{{ formatNumber(totalPrice) }} <i class="xiv gil"></i></span>
            </span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
      loading: true, // APIリクエストのローディング状態を追加
      totalPrice: 0
    };
  },
  methods: {
    async toggleNode(material) {
      material.expanded = !material.expanded;
      if (material.expanded && !material.loaded) {
        await this.fetchSubMaterialsPrices(material);
      }
    },
    getImageUrl(icon) {
      const normalizedIcon = String(icon).slice(0, -3) + '000';
      return `https://xivapi.com/i/0${normalizedIcon}/0${icon}.png`;
    },
    async fetchMarketPrices() {
      const requests = this.materials.map(material => {
        if (material.materialIcon && !material.price) {
          return this.fetchMarketPrice(material);
        }
      });
      await this.limitRequests(requests, 25); // APIリクエストのレート制限を尊重
      this.loading = false; // ローディング状態を終了
      this.calculateTotalPrice();
    },
    async fetchSubMaterialsPrices(material) {
      const requests = material.materials.map(subMaterial => {
        if (subMaterial.materialIcon && !subMaterial.price) {
          return this.fetchMarketPrice(subMaterial);
        }
      });
      await this.limitRequests(requests, 25); // APIリクエストのレート制限を尊重
      material.loaded = true; // サブ素材の価格取得が完了したらloadedフラグを設定
    },
    async limitRequests(requests, limit) {
      const chunks = this.chunkArray(requests, limit);
      for (const chunk of chunks) {
        await Promise.all(chunk);
        await this.sleep(1000); // 1秒ごとにリクエストを送信することでレート制限を尊重
      }
    },
    fetchMarketPrice(material) {
      const server = 'JAPAN';
      const url = `https://universalis.app/api/v2/${server}/${material.materialId}?fields=minPrice`;
      return axios.get(url)
        .then(response => {
          material.price = response.data.minPrice || '価格情報なし';
        })
        .catch(error => {
          console.error('価格情報の取得に失敗しました:', error);
          material.price = '取得失敗';
        });
    },
    calculateTotalPrice() {
      let totalPrice = 0;
      this.materials.forEach(material => {
        if (material.price) {
          totalPrice += material.price * material.materialAmount;
        }
      });
      this.totalPrice = totalPrice;
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
      return number.toLocaleString(); // 数値をフォーマットする
    }
  },
  watch: {
    materials: {
      handler() {
        this.loading = true; // データの変更が検出されたらローディング状態を再度セット
        this.fetchMarketPrices(); // マーケット価格を再度取得
      },
      deep: true // materials内のプロパティの変更も監視する
    }
  },
  created() {
    this.fetchMarketPrices();
  }
}
</script>

<style scoped>
.treeview {
  list-style: none;
  padding-left: 0;
  color: black;
}

.treeview-row {
  list-style: none;
  padding-left: 0;
}

.treeview-row .treeview {
  margin-left: 1rem;
  color: grey;
}

.treeview-item {
  cursor: pointer;
  padding-left: 1rem;
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
  width: 100px;
  height: 20px;
}

.loading-spinner {
  display: flex;
  align-items: center;
}

.loading-spinner i {
  animation: spin 1s linear infinite;
  /* スピンアニメーション */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  animation: spin 1s linear infinite;
}

</style>
