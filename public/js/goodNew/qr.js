import { frontendUrl } from "../../link.js";

// html要素
const errorDisplayQR = document.getElementById('goodnew-qr');

// session取得
const roomCount = sessionStorage.getItem('roomCount');
const limitPerRoom = sessionStorage.getItem('limitPerRoom');

window.onload = () => {

    console.log("QRコードを生成しました")
    // sessionからQRを生成
    // url生成
    if (limitPerRoom == 1 && roomCount == 1) {
        errorDisplayQR.innerHTML = "<strong class='text-primary'>一人だけなので<br>共有する必要はありません。</strong>";
    } else if (roomCount && limitPerRoom) {
        console.log("qr生成中")
        const ruleUrl = frontendUrl + "/html/goodnew/group/rule.html?";
        const roomCountParam = "roomCount=" + roomCount + "&";
        const limitPerRoomParam = "limitPerRoom=" + limitPerRoom;
        const QRUrl = ruleUrl + roomCountParam + limitPerRoomParam;
        const utf8qrtext = unescape(encodeURIComponent(QRUrl));
        $("#goodnew-qr").html("");
        $("#goodnew-qr").qrcode({ width: 200, height: 200, text: utf8qrtext });
    } else {
        errorDisplayQR.innerHTML = "<strong class='text-danger'>QRコードの表示に<br>失敗しました。<br>設定し直してください。</strong>";
    }
}