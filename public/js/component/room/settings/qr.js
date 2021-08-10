import { frontendUrl } from "../../../../link.js";

const qr = (client, gameUrl) => {

    window.onload = () => {
        client.emit('create_room', {
            roomCount: sessionStorage.getItem('roomCount'),
            limitPerRoom: sessionStorage.getItem('limitPerRoom')
        });
    }

    // sessionからQRを生成する
    const displayQR = async (roomData) => {
        if (sessionStorage.getItem('roomCount') == 1 && sessionStorage.getItem('limitPerRoom') == 1) {
            $("#qr").html("<strong class='text-primary'>一人だけなので<br>共有する必要はありません。</strong>");
        } else if (roomData.roomCount && roomData.limitPerRoom) {
            const ruleUrl = frontendUrl + "/html/" + gameUrl + "/group/rule.html?";
            const roomCountParam = "roomCount=" + roomData.roomCount + "&";
            const limitPerRoomParam = "limitPerRoom=" + roomData.limitPerRoom + "&";
            const roomIdParam = "roomId=" + roomData.roomId;
            const QRUrl = ruleUrl + roomCountParam + limitPerRoomParam + roomIdParam;
            const utf8qrtext = unescape(encodeURIComponent(QRUrl));
            $("#qr").html("");
            $("#qr").qrcode({ width: 200, height: 200, text: utf8qrtext });
        } else {
            $("#qr").html("<strong class='text-danger'>QRコードの表示に<br>失敗しました。<br>設定し直してください。</strong>");
        }
    }

    client.on('roomInfo', async (data) => {

        const room = {
            roomId: data.roomId,
            roomCount: data.roomCount,
            limitPerRoom: data.limitPerRoom
        }

        await sessionStorage.setItem('roomId', data.roomId);

        await displayQR(room);
    })
}

export { qr }