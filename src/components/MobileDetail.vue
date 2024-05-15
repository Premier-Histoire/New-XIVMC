<template>
    <div class="Detail" ref="detail" @scroll="checkScroll">
        <div class="Detail-header" @click="goBack">
            <button class="btn btn-actions">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                    class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                </svg>
            </button>
        </div>
        <div class="main">
            <div class="item-header">
                <div class="item-icon">
                    <img :src="getImageUrl(Itemdata.Icon)" alt="Item Icon">
                </div>
                <div class="item-name">
                    <h1><span>{{ Itemdata.LevelItem }}</span> {{ Itemdata.Name }}</h1>
                    <svg xmlns=" http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-clipboard" viewBox="0 0 16 16" @click="copyItemName">
                        <path
                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path
                            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                </div>
            </div>
            <div class="item-data">
                <Treenode :materials="materials" />
                <Buyhistory />
                <Salehistory />
            </div>
        </div>
        <!-- トップに戻るボタン -->
        <div class="scroll-top-btn btn btn-primary rounded-circle" v-show="!isTop" @click="scrollToTop">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chevron-up"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store'; // ストアをインポート
import Treenode from './Treenode.vue';
import Salehistory from './Salehistory.vue';
import Buyhistory from './Buyhistory.vue';

export default {
    components: {
        Treenode,
        Salehistory,
        Buyhistory
    },
    computed: {
        ...mapState(['Itemdata']), // ストアのItemdataをコンポーネントのItemdataとしてマッピング
        ...mapState(['materials']),
    },
    data() {
        return {
            isTop: true, // スクロール位置がトップにあるかどうかのフラグ
        };
    },
    methods: {
        goBack() {
            store.state.rightContentVisible = true;
        },
        getImageUrl(icon) {
            const normalizedIcon = String(icon).slice(0, -3) + '000'; // 万と千の桁以下を捨てて020000の形式に変換
            return `https://xivapi.com/i/0${normalizedIcon}/0${icon}_hr1.png`; // XIVAPIから画像を取得
        },
        // スクロール位置がトップかどうかをチェックするメソッド
        checkScroll() {
            const detail = this.$refs.detail;
            if (detail.scrollTop > 0) {
                this.isTop = false;
            } else {
                this.isTop = true;
            }
        },
        // トップにスクロールするメソッド
        scrollToTop() {
            const detail = this.$refs.detail;
            const scrollStep = -detail.scrollTop / 15; // スクロールステップの計算
            const scrollInterval = setInterval(() => {
                if (detail.scrollTop !== 0) {
                    detail.scrollBy(0, scrollStep); // スクロールを実行
                } else {
                    clearInterval(scrollInterval); // スクロールがトップに達したらインターバルをクリア
                    this.isTop = true; // スクロール位置がトップになったことを示す
                }
            }, 15); // 15ミリ秒ごとにスクロール
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
        },
    },
};
</script>

<style scoped>
.Detail {
    overflow-y: scroll;
    height: calc(100vh - 64px);
    position: relative;
}

.Detail-header {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #d0d7de;
}

.btn-actions {
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 8px;
    justify-content: center;
    display: flex;
    color: black;
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

.item-header {
    display: block;
    text-align: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.item-icon {
    margin-bottom: 10px;
}

.item-icon img {
    width: 80px;
    height: 80px;
}

.item-name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    /* クリック可能であることを示すカーソル */
}

.item-name span {
    color: #f0c91b;
}

.item-name svg {
    margin-bottom: .5rem;
}

.item-data {
    width: 100%;
    flex-grow: 1;
}

/* トップに戻るボタンのスタイル */
.scroll-top-btn {
    position: fixed;
    width: 50px;
    height: 50px;
    padding: 9px;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 1000;
    transition: opacity 0.3s;
}
</style>