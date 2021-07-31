const checkAndChangeOrder = async (client, data) => {
    const roomId = data.roomId;
    const isAnswer = data.isAnswer;

    // 名前を変えた人が順番変え処理をリクエストする。
    if (isAnswer) {
        console.log("順番変更しています。。。。");
        // 順番変更処理を入れる。セッションでansweredを送信
        client.emit('order', {
            roomId: roomId,
        });

        // 回答したflgを削除
        sessionStorage.removeItem("flg");
        sessionStorage.removeItem('orderPattern');
    }
}

export { checkAndChangeOrder }