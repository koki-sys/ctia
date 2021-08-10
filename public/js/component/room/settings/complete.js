const complete = (url) => {
    // html要素取得
    const roomNameElement = document.getElementById('room-name');
    const countInRoomElement = document.getElementById('count-in-room');

    // 部屋数などを表示
    roomNameElement.textContent = "あなたの部屋IDは" + sessionStorage.getItem('roomId') + "番です。";
    countInRoomElement.textContent = "人数は" + sessionStorage.getItem('limitPerRoom') + "人です。";

    // 三秒後にゲーム画面に遷移
    setTimeout(() => {
        console.log("ゲーム画面に遷移します。");
        location.href = "../game/"+ url;
    }, 3000);
}

export { complete }