<template>
  <div>
    <ul class="treeview">
      <li v-for="(material, index) in materials" :key="index">
        <div @click="toggleNode(material)" class="treeview-item">
          <span
            :class="{ 'treeview-folder': material.materials && material.materials.length > 0, 'treeview-file': !material.materials || material.materials.length === 0 }">
            <i
              :class="{ 'icon-plus': !material.expanded && material.materials && material.materials.length > 0, 'icon-minus': material.expanded && material.materials.length > 0, 'icon-blank': !material.materials || material.materials.length === 0 }"></i>
            <slot :material="material">
              <img :src="getImageUrl(material.materialIcon)" alt="Material Icon" class="material-icon">
              {{ material.materialName }} ({{ material.materialAmount }})
              <span v-if="material.price"> - {{ material.price }} gil</span>
            </slot>
          </span>
        </div>
        <ul v-show="material.expanded && material.materials && material.materials.length > 0" class="treeview">
          <tree-node :materials="material.materials" v-if="!loading">
            <template v-slot="{ material }">
              <span class="icon-blank">
                <img :src="getImageUrl(material.materialIcon)" alt="Material Icon" class="material-icon">
                {{ material.materialName }} ({{ material.materialAmount }})
                <span v-if="material.price"> - {{ material.price }} <i class="xiv e03c"></i></span>
              </span>
            </template>
          </tree-node>
          <div v-else>Loading...</div>
        </ul>
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
      required: true
    }
  },
  data() {
    return {
      loading: true // APIリクエストのローディング状態を追加
    };
  },
  methods: {
    toggleNode(material) {
      material.expanded = !material.expanded;
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
    chunkArray(arr, size) {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
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
}

.treeview-item {
  cursor: pointer;
  padding-left: 1rem;
}

.treeview-folder {
  color: #007bff;
}

.treeview-file {
  color: #6c757d;
}

.icon-plus,
.icon-minus,
.icon-blank {
  width: 20px;
  height: 20px;
}

.icon-plus::before {
  content: "+";
  margin-right: 0.5rem;
}

.icon-minus::before {
  content: "-";
  margin-right: 0.5rem;
}

.icon-blank::before {
  content: "";
  width: 0.5rem;
  margin-right: 0.5rem;
  display: inline-block;
}

.material-icon {
  width: 20px;
  height: auto;
  margin-right: 0.5rem;
}

.treeview-item:before {
  content: "";
  position: absolute;
  top: 0;
  left: -1rem;
  border-left: 1px solid #ced4da;
  height: 100%;
}
</style>
