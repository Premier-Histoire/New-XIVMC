<template>
  <div>
    <ul class="treeview">
      <li v-for="(material, index) in materials" :key="index">
        <div @click="toggleNode(material)" class="treeview-item">
          <span
            :class="{ 'treeview-folder': material.materials && material.materials.length > 0, 'treeview-file': !material.materials || material.materials.length === 0 }">
            <i
              :class="{ 'icon-plus': !material.expanded && material.materials && material.materials.length > 0, 'icon-minus': material.expanded && material.materials && material.materials.length > 0, 'icon-blank': !material.materials || material.materials.length === 0 }"></i>
            <slot :material="material">
              <img :src="getImageUrl(material.materialId)" alt="Material Icon" class="material-icon">
              {{ material.materialName }} ({{ material.materialAmount }})
            </slot>
          </span>
        </div>
        <ul v-show="material.expanded && material.materials && material.materials.length > 0" class="treeview">
          <tree-node :materials="material.materials">
            <!-- 再帰的にツリーノードを呼び出す -->
            <template v-slot="{ material }">
              <!-- ここで任意のツリーノードの内容を定義 -->
              <span class="icon-blank">
                <img :src="getImageUrl(material.materialId)" alt="Material Icon" class="material-icon">
                {{ material.materialName }} ({{ material.materialAmount }})
              </span>
            </template>
          </tree-node>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    materials: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleNode(material) {
      material.expanded = !material.expanded;
    },
    getImageUrl(icon) {
      const normalizedIcon = String(icon).slice(0, -3) + '000';
      return `https://xivapi.com/i/0${normalizedIcon}/0${icon}.png`;
    }
  },
  created() {
    // データから展開されたノードを設定
    this.materials.forEach(material => {
      material.expanded = false; // 初期状態ではすべてのノードを閉じた状態にする
    });
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
  position: relative; /* absolute positioning for treeview-item:before */
}

.treeview-folder {
  color: #007bff;
}

.treeview-file {
  color: #6c757d;
}

.icon-plus::before {
  content: "+";
  margin-right: 0.5rem;
  font-style: normal; /* 正常なフォントスタイルを設定 */
}

.icon-minus::before {
  content: "-";
  margin-right: 0.5rem;
  font-style: normal; /* 正常なフォントスタイルを設定 */
}

.icon-blank::before {
  content: "";
  width: 0.5rem;
  margin-right: 0.5rem;
  display: inline-block;
  font-style: normal; /* 正常なフォントスタイルを設定 */
}

.material-icon {
  width: 20px; /* 画像の幅を適切なサイズに調整 */
  height: auto; /* 高さは自動で調整 */
  margin-right: 0.5rem; /* 画像とテキストの間隔を設定 */
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
