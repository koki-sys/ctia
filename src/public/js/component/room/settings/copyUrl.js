

import { frontendUrl } from "../../../../link.js";

const copyUrl = (client, gameUrl) => {

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
            navigator.clipboard.writeText(QRUrl);
            const new_element = document.createElement('strong');
            new_element.setAttribute("class", "text-primary mt-3");
            new_element.textContent = 'URL情報をコピーしました。チャットなどに貼り付けてください。';
            $("#qr").appendChild(new_element);
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

export { copyUrl }