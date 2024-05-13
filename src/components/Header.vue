<template>
    <div>
        <!-- ヘッダーコンポーネント -->
        <header class="AppHeader">
            <div class="Header-bar d-flex align-items-center">
                <div class="AppHeader-Bar-start">
                    <!-- サイドバーオープンボタン -->
                    <button class="AppHeader-button" @click="toggleSidebar">
                        <!-- ハンバーガーアイコン -->
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                            data-view-component="true" class="octicon octicon-three-bars Button-visual">
                            <path
                                d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z">
                            </path>
                        </svg>
                    </button>
                    <!-- タイトル -->
                    <span class="AppHeader-text">
                        <img src="../assets/img/logo.png">
                    </span>
                </div>
                <!-- デスクトップビューでのアクションボタン群 -->
                <div class="AppHeader-Bar-end" v-if="!isMobile">
                    <!-- 検索ボックス -->
                    <div class="AppHeader-search">
                        <!-- 検索アイコン -->
                        <div class="input-group align-items-center" style="height: 32px;">
                            <span class="input-group-text" id="basic-addon1" style="height: 32px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                    class="bi bi-search" viewBox="0 0 16 16">
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
                    <!-- アクションボタン群 -->
                    <div class="AppHeader-actions">
                        <button class="btn btn-actions" style="width:32px; height:32px" data-bs-toggle="modal"
                            data-bs-target="#serverModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                class="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                        </button>
                        <button class="btn btn-actions" style="width:32px; height:32px" data-bs-toggle="modal"
                            data-bs-target="#infoModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                class="bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- モバイルビューでのアクションボタン -->
                <div class="AppHeader-Bar-end-mobile" v-if="isMobile">
                    <div class="AppHeader-actions-mobile">
                        <!-- モバイル用アクションボタン -->
                        <button class="btn btn-actions" style="width:32px; height:32px" data-bs-toggle="modal"
                            data-bs-target="#serverModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                class="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                        </button>
                        <button class="btn btn-actions" style="width:32px; height:32px" data-bs-toggle="modal"
                            data-bs-target="#infoModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                class="bi bi-info" viewBox="0 0 16 16">
                                <path
                                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Modal -->
            <Info />
            <Server />
        </header>
        <!-- サイドバーコンポーネント -->
        <Sidebar :isOpen="sidebarOpen" @close="closeSidebar" />
        <!-- サイドバーオーバーレイ -->
        <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>
    </div>
</template>

<script>
import { ref } from 'vue'; // refをインポート
import { useRouter } from 'vue-router'; // useRouterをインポート
import { mapState, mapMutations } from 'vuex';
import Sidebar from './Sidebar.vue';
import Info from './Info.vue';
import Server from './Server.vue'

export default {
    name: 'Header',
    components: {
        Sidebar,
        Info,
        Server
    },
    data() {
        return {
            isMobile: false,
        };
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
            }
        };

        return {
            searchQuery,
            search,
        };
    },
    mounted() {
        // ウィンドウの幅が指定のサイズ以下の場合、isMobileをtrueに設定
        window.addEventListener('resize', this.checkIsMobile);
        this.checkIsMobile();
    },
    destroyed() {
        // イベントリスナーを削除
        window.removeEventListener('resize', this.checkIsMobile);
    },
    computed: {
        // Vuexストアのstateをコンポーネントのcomputedプロパティにマッピング
        ...mapState(['sidebarOpen']),
    },
    methods: {
        ...mapMutations(['toggleSidebar', 'closeSidebar']),
        handleBtnClick(event) {
            event.preventDefault(); // デフォルトのクリック動作を無効化
        },
        checkIsMobile() {
            this.isMobile = window.innerWidth <= 768; // 768px以下の場合をスマートフォンと見なす
        },
    },
};
</script>

<style scoped>
.AppHeader {
    background-color: #f6f8fa;
    border-bottom: 1px solid #d0d7de;
}

.AppHeader .AppHeader-button {
    position: relative;
    display: flex;
    /* 追加 */
    justify-content: center;
    /* 追加 */
    align-items: center;
    /* 追加 */
    grid-auto-columns: max-content;
    width: var(--base-size-32, 32px);
    height: var(--base-size-32, 32px);
    background-color: #f6f8fa;
    border: #d0d7de solid 1px;
    border-radius: 6px;
}

.AppHeader .AppHeader-text {
    display: flex;
    justify-content: center;
    /* 中央揃え */
    align-items: center;
    /* 中央揃え */
}

.AppHeader-Bar-start {
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-start;
    gap: 8px;
}

.AppHeader-Bar-end {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.AppHeader-Bar-end-mobile {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.input-group {
    height: 32px;
}

.AppHeader-actions {
    display: grid;
    grid-auto-flow: column;
    gap: 8px;
}

.AppHeader-actions::before {
    display: block;
    width: 1px;
    height: 20px;
    height: 20px;
    content: "";
    background: #d0d7de;
    margin-block: 6px;
}

.AppHeader-actions-mobile {
    display: grid;
    grid-auto-flow: column;
    gap: 8px;
}

.btn-actions {
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 8px;
    justify-content: center;
    display: flex;
    --bs-btn-color: #f6f8fa;
    --bs-btn-bg: #f6f8fa;
    --bs-btn-border-color: #d0d7de;
    --bs-btn-hover-color: #EFF1F4;
    --bs-btn-hover-bg: #EFF1F4;
    --bs-btn-hover-border-color: #d0d7de;
    --bs-btn-active-color: #EFF1F4;
    --bs-btn-active-bg: #EFF1F4;
    --bs-btn-active-border-color: #d0d7de;
}

.Header-bar {
    padding: 16px;
}

.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 灰色の透過 */
    z-index: 999;
    /* サイドバーより手前に表示 */
}
</style>
