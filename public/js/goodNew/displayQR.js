import { gnClientIO, frontendUrl } from '../../link.js';

console.log("displayQR");

window.onload = () => {
    console.log("ロードしました。");
    gnClientIO.emit("few_group", {});
}

/**
 * QRを生成するためのurlに必要な情報を取得し、QRを表示するメソッド
 * （参加している部屋名、参加人数など）
 * 
 * @param {String} data.entryRoomName   参加している部屋名
 * @param {Number} data.roomCount       部屋数
 * @param {Number} data.countInRoom     部屋内の人数
 * 
 */
gnClientIO.on("generate", (data) => {
    // sessionStorageに入っている部屋名を保存
    console.log("connecting generateQR");
    sessionStorage.setItem('entryRoomName', data.entryRoomName);

    // QRを生成するときのURLを設定
    const qrUrl = frontendUrl + '/goodnew/few/index_ko.html?';
    const entryRoomName = "entry=" + data.entryRoomName + "&";
    const roomCount = "roomCount=" + data.roomCount + "&";
    const countInRoom = "countInRoom=" + data.countInRoom;
    const text = qrUrl + entryRoomName + roomCount + countInRoom;
    const utf8qrtext = unescape(encodeURIComponent(text));

    // QRを生成
    $("#qr").html("");
    $("#qr").qrcode({ width: 200, height: 200, text: utf8qrtext });
    console.log("qrコードを表示しました。");
});

// クリック時に発火
const toOyaGame = async () => {
    document.location.href = "../game/announce.html";
}

const oyaGamestart = document.getElementById("oya_gamestart");
oyaGamestart.onclick = async () => {
    await sessionStorage.setItem('oyaNumber', 1);
    await gnClientIO.emit("requestOrderNumber", {
        oyaNumber: sessionStorage.getItem('oyaNumber'),
    })
    await toOyaGame();
}