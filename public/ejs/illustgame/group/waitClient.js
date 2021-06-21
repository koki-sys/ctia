import { url, completeGroupingUrl } from '../../../link.js';
const gnClient = io(url);

/**
 * ニックネームなどをサーバーに送信する関数
 * 
 * @emits {String} nickName ニックネーム
 * @emits {Number} roomCount 部屋数
 * @emits {Number} limitPerRoom 制限人数
*/
window.addEventListener('DOMContentLoaded', () => {
    console.log("loaded");
    console.log(sessionStorage.getItem('nickNameFromClient'));
    console.log(sessionStorage.getItem('client_room_count'));
    console.log(sessionStorage.getItem('client_room_limit'));
    gnClient.emit("set_nickname", {
        nickName: sessionStorage.getItem('nickNameFromClient'),
        roomCount: sessionStorage.getItem('client_room_count'),
        limitPerRoom: sessionStorage.getItem('client_room_limit')
    })
});

gnClient.on("waiting", (data) => {
    console.log("waiting");
    $('ul').append('<li class="list-group-item">' + data.nickName + 'さん</li>');
    const nickNameFromClient = sessionStorage.getItem('nickNameFromClient');
    const nickNameFromServer = data.nickName;
    const countInRoom = parseInt(data.countInRoom);
    const limitPerRoom = parseInt(data.limitPerRoom);
    console.log(countInRoom)
    console.log(limitPerRoom)
    // 自分が入力したニックネームと一致しているのを確認
    if (nickNameFromServer == nickNameFromClient) {
        sessionStorage.setItem('nickName', data.nickName);
    }

    // 人数が揃ったら自動遷移
    if (countInRoom == limitPerRoom) {
        // グループ割り振り完了画面に送信
        sessionStorage.setItem('countInRoom', countInRoom);
        sessionStorage.setItem('entryRoomName', data.entryRoomName);
        location.href = completeGroupingUrl;
    }
});
