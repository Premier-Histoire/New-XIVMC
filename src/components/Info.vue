<template>
    <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">本サイトについて</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="nav nav-tabs" id="infoModalTabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="thanks-tab" data-bs-toggle="tab"
                                data-bs-target="#thanks" type="button" role="tab" aria-controls="thanks"
                                aria-selected="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pen" viewBox="0 0 16 16">
                                    <path
                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                </svg>作成者</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="copyright-tab" data-bs-toggle="tab" data-bs-target="#copyright"
                                type="button" role="tab" aria-controls="copyright" aria-selected="true"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-c-circle" viewBox="0 0 16 16">
                                    <path
                                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z" />
                                </svg>著作権</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="API-tab" data-bs-toggle="tab" data-bs-target="#API"
                                type="button" role="tab" aria-controls="API" aria-selected="false"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                    <path
                                        d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                </svg>API関連</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="infoModalTabContent">
                        <div class="tab-pane fade show active" id="thanks" role="tabpanel" aria-labelledby="thanks-tab">
                            <div class="tab-box">
                                <span class="pb-2">Powerd by エオルゼア経済大学</span>
                                <button class="btn btn-primary btn-discord" @click="openDiscordInvite">
                                    Discordに参加する
                                </button>
                            </div>
                        </div>
                        <div class="tab-pane fade tab-box" id="copyright" role="tabpanel"
                            aria-labelledby="copyright-tab">
                            <div class="tab-box">
                                <span>FINAL FANTASY XIV</span>
                                <span>(C) SQUARE ENIX CO., LTD. All Rights Reserved.</span>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="API" role="tabpanel" aria-labelledby="API-tab">
                            <div class="tab-box">
                                <a class="pb-1" href="https://xivapi.com/" target="_blank">XIVAPI</a>
                                <a href="https://universalis.app/" target="_blank">Universalis</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        openDiscordInvite() {
            // Discordの招待リンクを新しいタブで開く
            window.open('https://discord.com/invite/招待コード', '_blank');
        }
    }
};
</script>

<style scoped>
.btn-discord {
    background-color: #7289da;
    border-color: #7289da;
}

.btn-discord:hover {
    background-color: #677bc4;
    border-color: #677bc4;
}

.modal-content {
    background-color: #f8f9fa;
    /* モーダルの背景色を調整 */
}

.tab-box {
    display: flex;
    flex-flow: column;
    justify-content: center;
    /* 横方向の中央揃え */
    align-items: center;
    /* 縦方向の中央揃え */
    height: 100px;
}
</style>
