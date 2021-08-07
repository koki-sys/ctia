import { tpClientIO, frontendUrl } from "../../../../link.js";

// html要素
const errorDisplayQR = document.getElementById('typing-qr');

// session取得
const roomCount = sessionStorage.getItem('roomCount');
const limitPerRoom = sessionStorage.getItem('limitPerRoom');

window.onload = () => {
    tpClientIO.emit('create_room', {
        roomCount: roomCount,
        limitPerRoom: limitPerRoom
    });
}

// sessionからQRを生成する
const displayQR = async (roomData) => {
    if (limitPerRoom == 1 && roomCount == 1) {
        errorDisplayQR.innerHTML = "<strong class='text-primary'>一人だけなので<br>共有する必要はありません。</strong>";
    } else if (roomData.roomCount && roomData.limitPerRoom) {
        console.log("qr生成中")
        const ruleUrl = frontendUrl + "/html/typing/group/rule.html?";
        const roomCountParam = "roomCount=" + roomData.roomCount + "&";
        const limitPerRoomParam = "limitPerRoom=" + roomData.limitPerRoom + "&";
        const roomIdParam = "roomId=" + roomData.roomId;
        const QRUrl = ruleUrl + roomCountParam + limitPerRoomParam + roomIdParam;
        navigator.clipboard.writeText(QRUrl);
        const new_element = document.createElement('strong');
        new_element.setAttribute("class", "text-primary mt-3");
        new_element.textContent = 'URL情報をコピーしました。チャットなどに貼り付けてください。';
        errorDisplayQR.appendChild(new_element);
    } else {
        errorDisplayQR.innerHTML = "<strong class='text-danger'>QRコードの表示に<br>失敗しました。<br>設定し直してください。</strong>";
    }
}

tpClientIO.on('roomInfo', async (data) => {
    const roomIdFromServer = data.roomId;
    const roomCountFromServer = data.roomCount;
    const limitPerRoomFromServer = data.limitPerRoom;

    const room = {
        roomId: roomIdFromServer,
        roomCount: roomCountFromServer,
        limitPerRoom: limitPerRoomFromServer
    }

    await sessionStorage.setItem('roomId', roomIdFromServer);

    await displayQR(room);
})