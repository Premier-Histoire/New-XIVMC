<template>
  <div>
    <!-- サイドバー -->
    <div class="sidebar" :class="{ active: isOpen }">
      <div class="Side-header d-flex">
        <div class="titleWrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-tag"
            viewBox="0 0 16 16">
            <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
            <path
              d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
          </svg>
          <span class="titleWrap-text">タグ検索</span>
        </div>
        <div class="actionWrap">
          <button @click="close">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
              class="octicon octicon-x">
              <path
                d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <div class="sidebar-menu">
        <div class="menu">
          <div class="Sidebar-search">
            <!-- 検索アイコン -->
            <div class="input-group align-items-center" style="height: 32px;">
              <span class="input-group-text" id="basic-addon1" style="height: 32px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-search"
                  viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
                  </path>
                </svg>
              </span>
              <!-- 検索入力フィールド -->
              <input v-model="searchQuery" type="text" class="form-control" placeholder="検索..."
                aria-label="Input group example" aria-describedby="basic-addon1" style="height: 32px;"
                @keyup.enter="search">
            </div>
          </div>
          <Search @close-sidebar="close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'; // ストアをインポート
import Search from "./Search.vue";
import { ref } from 'vue'; // refをインポート
import { useRouter } from 'vue-router'; // useRouterをインポート

export default {
  name: 'Sidebar',
  components: {
    Search,
  },
  props: {
    isOpen: Boolean,
  },
  setup() {
    const router = useRouter(); // useRouterを使用してルーターを取得

    // 検索クエリを管理するためのリアクティブな変数
    const searchQuery = ref('');

    // 検索処理
    const search = () => {
      // 検索クエリが空でない場合のみ遷移
      if (searchQuery.value.trim() !== '') {
        // ルーターで検索結果ページに遷移
        router.push({ path: `/name/${encodeURIComponent(searchQuery.value)}` });
        // サイドバーを閉じる
        close();
      }
    };

    const close = () => {
      store.commit('closeSidebar'); // ストアのミューテーションを呼び出してサイドバーを閉じる
    };

    return {
      searchQuery,
      search,
      close,
    };
  },
};
</script>

<style scoped>
/* サイドバーのスタイル */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background-color: #fff;
  border-right: 1px solid #d0d7de;
  border-radius: 0 10px 10px 0;
  transition: transform 0.3s ease;
  transform: translateX(-300px);
  /* サイドバーが非表示の初期位置 */
  z-index: 9999;
}

.sidebar.active {
  transform: translateX(0);
  /* サイドバーが表示された際の位置 */
}

.Side-header {
  height: 64px;
  padding: 0.5rem;
  border-bottom: #d0d7de 1px solid;
}

.titleWrap {
  display: flex;
  align-items: center;
  width: 255px;
  height: 100%;
  padding: 8px;
}

.titleWrap-text {
  padding-left: 10px;
  font-weight: bold;
  font-size: 18px;
}

.actionWrap {
  width: 48px;
  height: 48px;
  padding: 8px;
}

.Sidebar-search {
  margin-bottom: 15px;
}

.sidebar-menu {
  padding: 1rem;
  padding-top: 0;
  width: 100%;
  height: calc(100vh - 64px);
}

.menu {
  padding-top: 15px;
  height: 100%;
}

.actionWrap button {
  background-color: initial;
  border: initial;
  display: flex;
  align-self: flex-start;
  width: 32px;
  height: 32px;
  padding: 8px;
  cursor: pointer;
}

.actionWrap button:hover {
  background-color: #F6F8FA;
  border-radius: 5px;
}
</style>
