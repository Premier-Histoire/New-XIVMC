<template>
    <div>
      <ul>
        <li v-for="(material, index) in materials" :key="index">
          <div @click="toggleNode(material)">
            <span v-if="material.materials && material.materials.length > 0">
              <i :class="{'icon-chevron-down': material.expanded, 'icon-chevron-right': !material.expanded}"></i>
            </span>
            <span>{{ material.materialName }} ({{ material.materialAmount }})</span>
          </div>
          <ul v-show="material.expanded && material.materials && material.materials.length > 0">
            <tree-node :materials="material.materials"></tree-node>
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
    data() {
      return {
        expandedNodes: [] // 展開されたノードのインデックスを格納する配列
      };
    },
    methods: {
      toggleNode(material) {
        material.expanded = !material.expanded;
        if (material.expanded) {
          this.expandedNodes.push(material.materialName); // 展開されたノードを配列に追加
        } else {
          const index = this.expandedNodes.indexOf(material.materialName);
          if (index !== -1) {
            this.expandedNodes.splice(index, 1); // 展開を収束したノードを配列から削除
          }
        }
      }
    },
    created() {
      // データから展開されたノードを設定
      this.materials.forEach(material => {
        material.expanded = this.expandedNodes.includes(material.materialName);
      });
    }
  }
  </script>
  
  <style scoped>
  .icon-chevron-right:before {
    content: '\25B8';
    margin-right: 5px;
  }
  
  .icon-chevron-down:before {
    content: '\25BE';
    margin-right: 5px;
  }

  ul {
    list-style-type: none;
    padding-left: 10px;
  }
  </style>
  