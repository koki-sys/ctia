import { dgClientIO, completeGroupingUrl } from '../../../../link.js';
import { displayWaitUser } from './displayWaitUser.js';

const userListFromElement = document.getElementById('user-list');

// セッション取得
const roomIdFromSession = sessionStorage.getItem('roomId');
const nickNameFromSession = sessionStorage.getItem('nickName');
const roomCountFromSession = sessionStorage.getItem('roomCount');
const limitPerRoomFromSession = sessionStorage.getItem('limitPerRoom');

/**
 * ニックネームなどをサーバーに送信する関数
 * 
 * @emits {String} nickName ニックネーム
 * @emits {Number} roomCount 部屋数
 * @emits {Number} limitPerRoom 制限人数
*/
window.addEventListener('DOMContentLoaded', () => {
    console.log("loaded");
    console.log("ニックネームは、" + nickNameFromSession);
    console.log("部屋数は、" + roomCountFromSession);
    console.log("制限人数は、" + limitPerRoomFromSession);
    dgClientIO.emit("join_game", {
        roomId: roomIdFromSession,
        nickName: nickNameFromSession,
        roomCount: roomCountFromSession,
        limitPerRoom: limitPerRoomFromSession
    })
});

dgClientIO.on("waiting", (data) => {
    const userRow = data.userRow;

    displayWaitUser(userListFromElement, userRow);

    // 個人情報を受信する
    const nickNameFromServer = data.nickName;
    console.log(nickNameFromServer);
    const countInRoomFromServer = parseInt(data.countInRoom);
    const limitPerRoomFromServer = parseInt(data.limitPerRoom);
    console.log("受信した部屋数：" + countInRoomFromServer);
    console.log("受信した制限人数:" + limitPerRoomFromServer);
    // 自分が入力したニックネームと一致しているのを確認
    if (nickNameFromServer == nickNameFromSession) {
        sessionStorage.setItem('nickName', data.nickName);
    }

    // 人数が揃ったら自動遷移
    if (countInRoomFromServer == limitPerRoomFromServer) {
        // グループ割り振り完了画面に送信
        sessionStorage.setItem('countInRoom', countInRoomFromServer);
        sessionStorage.setItem('entryRoomName', data.entryRoomName);
        location.href = completeGroupingUrl;
    }
});

gnClientIO.on("user_exists", (data) => {
    console.log("ユーザ存在確認");
    const errMsg = data.errmsg;
    let msg = "";
    userListFromElement.innerHTML = msg;

    // エラー
    msg += '<p class="text-danger text-center">' + errMsg + '</p>';
    msg += '<a class="btn btn-outline-secondary" href="name.html">名前をつけ直す</a>';
    userListFromElement.innerHTML = msg;
})