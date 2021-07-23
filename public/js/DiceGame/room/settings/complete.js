import { dgClientIO } from "../../../../link.js";

// session取得
const roomIdFromSession = sessionStorage.getItem('roomId');
const countInRoomFromSession = sessionStorage.getItem('limitPerRoom');

// html要素取得
const roomNameElement = document.getElementById('room-name');
const countInRoomElement = document.getElementById('count-in-room');

// 部屋数などを表示
roomNameElement.textContent = "あなたの部屋IDは" + roomIdFromSession + "番です。";
countInRoomElement.textContent = "人数は" + countInRoomFromSession + "人です。";

// 順番をリクエストする
window.onload = () => {
    dgClientIO.emit('requestOrderPattern', {});
}

// 順番を受信して保存。
dgClientIO.on('sendOrderPattern', (data) => {
    console.log("順番情報を保存しました。");
    sessionStorage.setItem('orderPattern', data.orderPattern);
});

// 三秒後にゲーム画面に遷移
setTimeout(() => {
    console.log("ゲーム画面に遷移します。");
    location.href = "../game/taskComplete.html"
}, 3000);