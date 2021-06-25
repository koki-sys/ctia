import { ngClientIO, frontendUrl } from '../../link.js';

console.log("displayQR");

window.onload = () => {
    console.log("ロードしました。");
    ngClientIO.emit("few_group", {});
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
ngClientIO.on("generate", (data) => {
    // sessionStorageに入っている部屋名を保存
    console.log("connecting generateQR");
    sessionStorage.setItem('entryRoomName', data.entryRoomName);
    const entryRoomName = data.entryRoomName;
    const countInRoom = parseInt(data.countInRoom);

    // QRを生成するときのURLを設定
    const qrUrl = frontendUrl + '/html/namegame/few/index_ko.html?';
    const entryRoomNameParam = "entry=" + entryRoomName + "&";
    const countInRoomParam = "countInRoom=" + countInRoom;
    const text = qrUrl + entryRoomNameParam + countInRoomParam;
    const utf8qrtext = unescape(encodeURIComponent(text));

    // QRを生成
    $("#qr").html("");
    $("#qr").qrcode({ width: 200, height: 200, text: utf8qrtext });
    console.log("qrコードを表示しました。");
});

// クリック時に発火
const toOyaGame = async () => {
    document.location.href = "../game/banme.html";
}

const oyaGamestart = document.getElementById("oya_gamestart");
oyaGamestart.onclick = async () => {
    await toOyaGame();
}