<template>
    <div class="sales-history-table">
        <h2>出品履歴</h2>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>鯖名</th>
                        <th>HQ</th>
                        <th>金額</th>
                        <th>個数</th>
                        <th>税</th>
                        <th>合計額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(listings, index) in listings" :key="listings.id">
                        <td>{{ index + 1 }}</td> <!-- インデックスに1を加えて1から始まる番号を表示 -->
                        <td>{{ listings.worldName }}</td>
                        <td><i v-if="listings.hq" class="xiv hq"></i></td>
                        <td>{{ formatPrice(listings.pricePerUnit) }}</td>
                        <td>{{ listings.quantity }}</td>
                        <td>{{ formatPrice(listings.tax) }}</td>
                        <td>{{ formatPrice(listings.total) }}</td>
                    </tr>
                    <!-- 売上履歴がない場合の表示 -->
                    <tr v-if="listings.length === 0">
                        <td colspan="7">売上履歴はありません。</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['Itemdata']),
        ...mapState(['clickedbuy']),
    },
    data() {
        return {
            listings: [], // 売上履歴のデータを格納する配列
        };
    },
    methods: {
        async loadData() {
            // データを取得する処理をここに記述
            const itemId = this.Itemdata.ItemId; // この部分を実際のアイテムIDに置き換える
            const server = 'JAPAN';
            try {
                const response = await fetch(`https://universalis.app/api/v2/${server}/${itemId}/?listings=10&fields=listings`);
                const data = await response.json();
                this.listings = data.listings
            } catch (error) {
                console.error('売上履歴の取得に失敗しました:', error);
            }
        },
        formatPrice(price) {
            // 価格にコンマを挿入する
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    watch: {
        clickedbuy: {
            handler(newVal) {
                if (newVal) {
                    this.loadData();
                    this.$store.dispatch('setClickedbuy', false);
                } else {
                    // clicked が false になったときの処理を行う
                }
            },
            immediate: true // コンポーネントの初期化時にも監視対象の変数を評価する
        },
    }
};
</script>

<style scoped>
.sales-history-table {
  padding: 16px;
  padding-top: 0px;
}

.sales-history-table h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #dddddd;
}

.sales-history-table table {
  width: 100%;
  border-collapse: collapse;
}

.sales-history-table th, .sales-history-table td {
  padding: 8px;
  border: 1px solid #dddddd;
  text-align: center;
  white-space: nowrap; /* 文字を折り返さない */
}

.sales-history-table th {
  background-color: #f2f2f2;
}

.sales-history-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.sales-history-table tbody tr:hover {
  background-color: #e0e0e0;
}

.sales-history-table tbody td i.xiv.hq {
  font-size: 20px;
}

</style>
