import { ngClientIO, completeGroupingUrl } from '../../link.js';

// セッション取得
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
    ngClientIO.emit("set_nickname", {
        nickName: nickNameFromSession,
        roomCount: roomCountFromSession,
        limitPerRoom: limitPerRoomFromSession
    })
});

ngClientIO.on("waiting", (data) => {
    console.log("waiting");
    $('ul').append('<li class="list-group-item">' + data.nickName + 'さん</li>');
    const nickNameFromServer = data.nickName;
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
