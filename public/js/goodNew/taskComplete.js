import { gnClientIO } from '../../link.js';

window.onload = () => {
    console.log("参加部屋名：" + sessionStorage.getItem('entryRoomName'));
    gnClientIO.emit('requestOrderPattern', {
        entryRoomName: sessionStorage.getItem('entryRoomName'),
    })
}

// 順番受け取り処理
gnClientIO.on("sendOrderPattern", (data) => {
    sessionStorage.setItem('orderPattern', data.orderPattern);
    console.log("パータン：" + data.orderPattern);
})

// 順番切り替え処理
gnClientIO.on("changeOrder", (data) => {
    const orderPattern = sessionStorage.getItem('orderPattern');
    console.log("切り替えます。");

    console.log("チェンジパターン:" + data.changePattern);
    const isOrdered = sessionStorage.getItem('isOrdered');
    // 順番が来たら、発表画面に切り替える。
    if (isOrdered) {
        console.log("発表しました。");
        gnClientIO.emit("order", {
            flg: "answered",
            entryRoomName: sessionStorage.getItem('entryRoomName'),
            name: name,
        });

        // sessionStorageを切る
    } else if (data.changePattern == orderPattern) {
        location.href = "./announce.html";
    }
})