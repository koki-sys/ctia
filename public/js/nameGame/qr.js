import { frontendUrl } from "../../link.js";

// html要素
const errorDisplayQR = document.getElementById('namegame-qr');

// session取得
const roomCount = sessionStorage.getItem('roomCount');
const limitPerRoom = sessionStorage.getItem('limitPerRoom');

window.onload = () => {

    console.log("QRコードを生成しました")
    // sessionからQRを生成
    // url生成
    if (limitPerRoom == 1) {
        errorDisplayQR.innerHTML = "<strong class='text-primary'>一人だけなので<br>共有する必要はありません。</strong>";
    } else if (roomCount && limitPerRoom) {
        const ruleUrl = frontendUrl + "/html/namegame/group/rule.html?";
        const roomCountParam = "roomCount=" + roomCount + "&";
        const limitPerRoomParam = "limitPerRoom=" + limitPerRoom;
        const QRUrl = ruleUrl + roomCountParam + limitPerRoomParam;
        const utf8qrtext = unescape(encodeURIComponent(QRUrl));
        $("#namegame-qr").html("");
        $("#namegame-qr").qrcode({ width: 200, height: 200, text: utf8qrtext });
    } else {
        errorDisplayQR.innerHTML = "<strong class='text-danger'>QRコードの表示に<br>失敗しました。<br>設定し直してください。</strong>";
    }
}