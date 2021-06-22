import { gnClientIO } from '../../link.js';

window.onload = () => {
    gnClientIO.emit('requestOrderPattern', {
        countInRoom: sessionStorage.getItem('countInRoom'),
        entryRoomName: sessionStorage.getItem('entryRoomName'),
    })
}

// 順番受け取り処理
gnClientIO.on("sendOrderPattern", (data) => {
    sessionStorage.setItem('orderPattern', data.orderPattern);
})

const toAnnounce = async () => {
    location.href = "./announce.html";
}

// 順番切り替え処理
gnClientIO.on("changeOrder", async (data) => {
    const orderPattern = sessionStorage.getItem('orderPattern');

    // 順番が来たら、発表画面に切り替える。
    if (data.changePattern == orderPattern) {
        await toAnnounce();
    }
})