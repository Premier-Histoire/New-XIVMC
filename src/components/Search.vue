<template>
    <div class="category">
        <div class="subtext">MAIN ARM/SUB ARM</div>
        <div class="button-container">
            <router-link :to="{ path: '/tag/10' }" title="片手剣" @click="close">
                <img src="../assets/img/10.png">
            </router-link>
            <router-link :to="{ path: '/tag/11' }" title="斧" @click="close">
                <img src="../assets/img/11.png">
            </router-link>
            <router-link :to="{ path: '/tag/76' }" title="両手剣" @click="close">
                <img src="../assets/img/76.png">
            </router-link>
            <router-link :to="{ path: '/tag/86' }" title="ガンブレード" @click="close">
                <img src="../assets/img/86.png">
            </router-link>
            <router-link :to="{ path: '/tag/13' }" title="槍" @click="close">
                <img src="../assets/img/13.png">
            </router-link>
            <router-link :to="{ path: '/tag/88' }" title="両手鎌" @click="close">
                <img src="../assets/img/88.png">
            </router-link>
            <router-link :to="{ path: '/tag/9' }" title="格闘武器" @click="close">
                <img src="../assets/img/9.png">
            </router-link>
            <router-link :to="{ path: '/tag/83' }" title="刀" @click="close">
                <img src="../assets/img/83.png">
            </router-link>
            <router-link :to="{ path: '/tag/73' }" title="双剣" @click="close">
                <img src="../assets/img/73.png">
            </router-link>
            <router-link :to="{ path: '/tag/12' }" title="弓" @click="close">
                <img src="../assets/img/12.png">
            </router-link>
            <router-link :to="{ path: '/tag/77' }" title="銃" @click="close">
                <img src="../assets/img/77.png">
            </router-link>
            <router-link :to="{ path: '/tag/87' }" title="投擲武器" @click="close">
                <img src="../assets/img/87.png">
            </router-link>
            <router-link :to="{ path: '/tag/14' }" title="呪具" @click="close">
                <img src="../assets/img/14.png">
            </router-link>
            <router-link :to="{ path: '/tag/16' }" title="魔導書">
                <img src="../assets/img/16.png">
            </router-link>
            <router-link :to="{ path: '/tag/84' }" title="細剣" @click="close">
                <img src="../assets/img/84.png">
            </router-link>
            <router-link :to="{ path: '/tag/15' }" title="幻具" @click="close">
                <img src="../assets/img/15.png">
            </router-link>
            <router-link :to="{ path: '/tag/85' }" title="魔導書(学者専用)" @click="close">
                <img src="../assets/img/85.png">
            </router-link>
            <router-link :to="{ path: '/tag/78' }" title="天球儀" @click="close">
                <img src="../assets/img/78.png">
            </router-link>
            <router-link :to="{ path: '/tag/89' }" title="賢具" @click="close">
                <img src="../assets/img/89.png">
            </router-link>
            <router-link :to="{ path: '/tag/19' }" title="木工道具" @click="close">
                <img src="../assets/img/19.png">
            </router-link>
            <router-link :to="{ path: '/tag/20' }" title="鍛冶道具" @click="close">
                <img src="../assets/img/20.png">
            </router-link>
            <router-link :to="{ path: '/tag/21' }" title="甲冑道具" @click="close">
                <img src="../assets/img/21.png">
            </router-link>
            <router-link :to="{ path: '/tag/22' }" title="彫金道具" @click="close">
                <img src="../assets/img/22.png">
            </router-link>
            <router-link :to="{ path: '/tag/23' }" title="革細工道具" @click="close">
                <img src="../assets/img/23.png">
            </router-link>
            <router-link :to="{ path: '/tag/24' }" title="裁縫道具" @click="close">
                <img src="../assets/img/24.png">
            </router-link>
            <router-link :to="{ path: '/tag/25' }" title="錬金道具" @click="close">
                <img src="../assets/img/25.png">
            </router-link>
            <router-link :to="{ path: '/tag/26' }" title="調理道具" @click="close">
                <img src="../assets/img/26.png">
            </router-link>
            <router-link :to="{ path: '/tag/27' }" title="採掘道具" @click="close">
                <img src="../assets/img/27.png">
            </router-link>
            <router-link :to="{ path: '/tag/28' }" title="園芸道具" @click="close">
                <img src="../assets/img/28.png">
            </router-link>
            <router-link :to="{ path: '/tag/29' }" title="漁道具" @click="close">
                <img src="../assets/img/29.png">
            </router-link>
            <router-link :to="{ path: '/tag/30' }" title="釣り餌" @click="close">
                <img src="../assets/img/30.png">
            </router-link>
        </div>
    </div>
    <div class="category">
        <div class="subtext">ARMOR/ACCESSORIES</div>
        <div class="button-container">
            <router-link :to="{ path: '/tag/17' }" title="盾" @click="close">
                <img src="../assets/img/17.png">
            </router-link>
            <router-link :to="{ path: '/tag/31' }" title="頭防具" @click="close">
                <img src="../assets/img/31.png">
            </router-link>
            <router-link :to="{ path: '/tag/33' }" title="胴防具" @click="close">
                <img src="../assets/img/33.png">
            </router-link>
            <router-link :to="{ path: '/tag/36' }" title="手防具" @click="close">
                <img src="../assets/img/36.png">
            </router-link>
            <router-link :to="{ path: '/tag/35' }" title="脚防具" @click="close">
                <img src="../assets/img/35.png">
            </router-link>
            <router-link :to="{ path: '/tag/37' }" title="足防具" @click="close">
                <img src="../assets/img/37.png">
            </router-link>
            <router-link :to="{ path: '/tag/40' }" title="耳飾り" @click="close">
                <img src="../assets/img/40.png">
            </router-link>
            <router-link :to="{ path: '/tag/39' }" title="首飾り" @click="close">
                <img src="../assets/img/39.png">
            </router-link>
            <router-link :to="{ path: '/tag/41' }" title="腕輪" @click="close">
                <img src="../assets/img/41.png">
            </router-link>
            <router-link :to="{ path: '/tag/42' }" title="指輪" @click="close">
                <img src="../assets/img/42.png">
            </router-link>
        </div>
    </div>
    <div class="category">
        <div class="subtext">OTHERS</div>
        <div class="button-container">
            <router-link :to="{ path: '/tag/43' }" title="薬品" @click="close">
                <img src="../assets/img/43.png">
            </router-link>
            <router-link :to="{ path: '/tag/44' }" title="食材" @click="close">
                <img src="../assets/img/44.png">
            </router-link>
            <router-link :to="{ path: '/tag/45' }" title="調理品" @click="close">
                <img src="../assets/img/45.png">
            </router-link>
            <router-link :to="{ path: '/tag/46' }" title="水産物" @click="close">
                <img src="../assets/img/46.png">
            </router-link>
            <router-link :to="{ path: '/tag/47' }" title="石材" @click="close">
                <img src="../assets/img/47.png">
            </router-link>
            <router-link :to="{ path: '/tag/48' }" title="金属材" @click="close">
                <img src="../assets/img/48.png">
            </router-link>
            <router-link :to="{ path: '/tag/49' }" title="木材" @click="close">
                <img src="../assets/img/49.png">
            </router-link>
            <router-link :to="{ path: '/tag/50' }" title="布材" @click="close">
                <img src="../assets/img/50.png">
            </router-link>
            <router-link :to="{ path: '/tag/51' }" title="皮革材" @click="close">
                <img src="../assets/img/51.png">
            </router-link>
            <router-link :to="{ path: '/tag/52' }" title="骨材" @click="close">
                <img src="../assets/img/52.png">
            </router-link>
            <router-link :to="{ path: '/tag/53' }" title="錬金術材" @click="close">
                <img src="../assets/img/53.png">
            </router-link>
            <router-link :to="{ path: '/tag/54' }" title="染料" @click="close">
                <img src="../assets/img/54.png">
            </router-link>
            <router-link :to="{ path: '/tag/55' }" title="部品" @click="close">
                <img src="../assets/img/55.png">
            </router-link>
            <router-link :to="{ path: '/tag/57' }" title="マテリア" @click="close">
                <img src="../assets/img/57.png">
            </router-link>
            <router-link :to="{ path: '/tag/58' }" title="クリスタル" @click="close">
                <img src="../assets/img/58.png">
            </router-link>
            <router-link :to="{ path: '/tag/59' }" title="触媒" @click="close">
                <img src="../assets/img/59.png">
            </router-link>
            <router-link :to="{ path: '/tag/60' }" title="雑貨" @click="close">
                <img src="../assets/img/60.png">
            </router-link>
            <router-link :to="{ path: '/tag/74' }" title="雑貨(シーズナル)" @click="close">
                <img src="../assets/img/74.png">
            </router-link>
            <router-link :to="{ path: '/tag/90' }" title="雑貨(習得/登録系)" @click="close">
                <img src="../assets/img/90.png">
            </router-link>
            <router-link :to="{ path: '/tag/75' }" title="ミニオン" @click="close">
                <img src="../assets/img/75.png">
            </router-link>
            <router-link :to="{ path: '/tag/79' }" title="飛空艇・潜水艦部品" @click="close">
                <img src="../assets/img/79.png">
            </router-link>
            <router-link :to="{ path: '/tag/80' }" title="オーケストリオン関連品" @click="close">
                <img src="../assets/img/80.png">
            </router-link>
        </div>
    </div>
    <div class="category">
        <div class="subtext">HOUSING</div>
        <div class="button-container">
            <router-link :to="{ path: '/tag/65' }" title="外装建材" @click="close">
                <img src="../assets/img/65.png">
            </router-link>
            <router-link :to="{ path: '/tag/66' }" title="内装建材" @click="close">
                <img src="../assets/img/66.png">
            </router-link>
            <router-link :to="{ path: '/tag/67' }" title="庭具" @click="close">
                <img src="../assets/img/67.png">
            </router-link>
            <router-link :to="{ path: '/tag/56' }" title="調度品(一般)" @click="close">
                <img src="../assets/img/56.png">
            </router-link>
            <router-link :to="{ path: '/tag/68' }" title="調度品(椅子・寝台)" @click="close">
                <img src="../assets/img/68.png">
            </router-link>
            <router-link :to="{ path: '/tag/69' }" title="'調度品(台座)" @click="close">
                <img src="../assets/img/69.png">
            </router-link>
            <router-link :to="{ path: '/tag/70' }" title="調度品(卓上)" @click="close">
                <img src="../assets/img/70.png">
            </router-link>
            <router-link :to="{ path: '/tag/71' }" title="調度品(壁掛)" @click="close">
                <img src="../assets/img/71.png">
            </router-link>
            <router-link :to="{ path: '/tag/72' }" title="調度品(敷物)" @click="close">
                <img src="../assets/img/72.png">
            </router-link>
            <router-link :to="{ path: '/tag/81' }" title="栽培用品" @click="close">
                <img src="../assets/img/81.png">
            </router-link>
            <router-link :to="{ path: '/tag/82' }" title="絵画" @click="close">
                <img src="../assets/img/82.png">
            </router-link>
        </div>
    </div>
</template>
<script>
import store from '@/store'; // ストアをインポート
export default {
    emits: ['closeSidebar'],
    methods: {
        redirectToTag(tagId) {
            window.location.href = `/tag/${tagId}`;
        },
        close() {
            store.commit('closeSidebar');
        }
    }
}
</script>

<style scoped>
.button {
    width: 20px;
    height: 20px;
    padding: 0;
    font-size: 0;
    background-color: initial;
    border: none;
    cursor: pointer;
}

.button-container {
    display: grid;
    grid-template-columns: repeat(10, 20px);
    padding: 8px;
    gap: 5.5px;
}
</style>
