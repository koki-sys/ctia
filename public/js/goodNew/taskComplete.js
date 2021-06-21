import { gnClientIO } from '../../link.js';

window.onload = () => {
    gnClientIO.emit('requestOrderNumber', {
        countInRoom: sessionStorage.getItem('countInRoom'),
        entryRoomName: sessionStorage.getItem('entryRoomName'),
    })
}

// 順番受け取り処理
gnClientIO.on("sendOrderNumber", (data) => {
    sessionStorage.setItem('orderNumber', data.orderNumber);
})

const toAnnounce = async () => {
    location.href = "./announce.html";
}

// 順番切り替え処理
gnClientIO.on("changeOrder", async (data) => {
    const orderNumber = sessionStorage.getItem('orderNumber');

    // 順番が来たら、発表画面に切り替える。
    if (data.changeNumber == orderNumber) {
        await toAnnounce();
    }
})