import { completeGroupingUrl } from '../../../../link.js';
import { displayWaitUser } from './displayWaitUser.js';

const userListFromElement = document.getElementById('user-list');

const wait = (client) => {
    /**
     * ニックネームなどをサーバーに送信する関数
     * 
     * @emits {String} nickName ニックネーム
     * @emits {Number} roomCount 部屋数
     * @emits {Number} limitPerRoom 制限人数
    */
    window.addEventListener('DOMContentLoaded', () => {
        client.emit("join_game", {
            roomId: sessionStorage.getItem('roomId'),
            nickName: sessionStorage.getItem('nickName'),
            roomCount: sessionStorage.getItem('roomCount'),
            limitPerRoom: sessionStorage.getItem('limitPerRoom')
        })
    });

    client.on("waiting", (data) => {
        const userRow = data.userRow;

        displayWaitUser(userListFromElement, userRow);

        // 個人情報を受信する
        const nickNameFromServer = data.nickName;
        console.log(nickNameFromServer);
        const countInRoomFromServer = parseInt(data.countInRoom);
        const limitPerRoomFromServer = parseInt(data.limitPerRoom);

        // 自分が入力したニックネームと一致しているのを確認
        if (nickNameFromServer == nickNameFromSession) {
            sessionStorage.setItem('nickName', data.nickName);
        }

        // 人数が揃ったら自動遷移
        if (countInRoomFromServer == limitPerRoomFromServer) {
            // グループ割り振り完了画面に送信
            sessionStorage.setItem('countInRoom', countInRoomFromServer);
            location.href = completeGroupingUrl;
        }
    });

    gnClientIO.on("user_exists", (data) => {
        const errMsg = data.errmsg;
        let msg = "";
        userListFromElement.innerHTML = msg;

        // エラー
        msg += '<p class="text-danger text-center">' + errMsg + '</p>';
        msg += '<a class="btn btn-outline-secondary" href="name.html">名前をつけ直す</a>';
        userListFromElement.innerHTML = msg;
    })
}

export { wait }