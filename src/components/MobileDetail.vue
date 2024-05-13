<template>
    <div class="Detail">
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

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store'; // ストアをインポート

export default {
    computed: {
        ...mapState(['Itemdata']) // ストアのItemdataをコンポーネントのItemdataとしてマッピング
    },
    methods: {
        goBack() {
            store.state.rightContentVisible = true;
        },
        getImageUrl(icon) {
            const normalizedIcon = String(icon).slice(0, -3) + '000'; // 万と千の桁以下を捨てて020000の形式に変換
            return `https://xivapi.com/i/0${normalizedIcon}/0${icon}.png`; // XIVAPIから画像を取得
        },
    }
}
</script>

<style scoped>
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

.main {
    padding: 10px;
}

.item-header {
    display: block;
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
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
    background-color: red;
    height: 1000px;
    opacity: 0.3;
    width: 100%;
    flex-grow: 1;
}
</style>