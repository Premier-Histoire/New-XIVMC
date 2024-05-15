<template>
    <div class="modal fade" id="serverModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">サーバー設定</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="physicalServer" class="form-label">物理サーバー：</label>
                        <select v-model="selectedPhysicalServer" @change="onPhysicalServerChange" class="form-select">
                            <option value="" disabled selected>選択してください</option>
                            <option v-for="physicalServer in physicalDataCenters" :key="physicalServer"
                                :value="physicalServer">{{ physicalServer }}</option>
                        </select>
                    </div>
                    <div class="mb-3" v-if="selectedPhysicalServer">
                        <label for="logicalServer" class="form-label">論理サーバー：</label>
                        <select v-model="selectedLogicalServer" @change="onLogicalServerChange" class="form-select">
                            <option value="" selected>選択してください</option>
                            <option v-for="logicalServer in logicalDataCenters[selectedPhysicalServer]"
                                :key="logicalServer" :value="logicalServer">{{ logicalServer }}</option>
                        </select>
                    </div>
                    <div class="mb-3" v-if="selectedLogicalServer">
                        <label for="server" class="form-label">サーバー：</label>
                        <select v-model="selectedServer" class="form-select">
                            <option value="" selected>選択してください</option>
                            <option v-for="server in servers[selectedLogicalServer]" :key="server" :value="server">{{ server }}</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="saveServerSettings">保存</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            physicalDataCenters: ['Europe', 'Japan', 'America', 'Oceania'],
            logicalDataCenters: {
                'Europe': ['Chaos', 'Light'],
                'Japan': ['Elemental', 'Gaia', 'Mana', 'Meteor'],
                'America': ['Aether', 'Primal', 'Crystal', 'Dynamis'],
                'Oceania': ['Materia']
            },
            servers: {
                'Chaos': ['Cerberus', 'Louisoix', 'Moogle', 'Omega', 'Phantom', 'Ragnarok', 'Sagittarius', 'Spriggan'],
                'Light': ['Alpha', 'Lich', 'Odin', 'Phoenix', 'Raiden', 'Shiva', 'Twintania', 'Zodiark'],
                'Elemental': ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Tonberry', 'Typhon'],
                'Gaia': ['Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima'],
                'Mana': ['Anima', 'Asura', 'Chocobo', 'Hades', 'Ixion', 'Masamune', 'Pandaemonium', 'Titan'],
                'Meteor': ['Belias', 'Mandragora', 'Ramuh', 'Shinryu', 'Unicorn', 'Valefor', 'Yojimbo', 'Zeromus'],
                'Aether': ['Adamantoise', 'Cactuar', 'Faerie', 'Gilgamesh', 'Jenova', 'Midgardsormr', 'Sargatanas', 'Siren'],
                'Primal': ['Behemoth', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Ultros'],
                'Crystal': ['Balmung', 'Brynhildr', 'Coeurl', 'Diabolos', 'Goblin', 'Malboro', 'Mateus', 'Zalera'],
                'Dynamis': ['Halicarnassus', 'Maduin', 'Marilith', 'Seraph'],
                'Materia': ['Bismarck', 'Ravana', 'Sephirot', 'Sophia', 'Zurvan']
            },
            selectedPhysicalServer: '',
            selectedLogicalServer: '',
            selectedServer: ''
        }
    },
    methods: {
        onPhysicalServerChange() {
            this.selectedLogicalServer = '';
            this.selectedServer = '';
        },
        onLogicalServerChange() {
            this.selectedServer = '';
        },
        saveServerSettings() {
            // サーバー設定を保存する処理を追加
            // 例えば、選択された物理サーバー、論理サーバー、およびサーバー名を保存する
        }
    }
}
</script>
