exports.igController = (socket, IOserver) => {
    socket.on("realtime-draw", (data) => {
        IOserver.emit("draw", {
            x: data.x,
            y: data.y,
            act: data.act,
            src: data.src
        });
    })

    // 順番切り替えをする処理
    socket.on("order", async (data) => {
        const roomId = data.roomId;

        // ランダムで覚えたやつか名前つけるかを出す。
        // 1 => 名前つける
        // 2 => 回答する
        let pageFlg = 1;

        // DBから取得して、flg0なのが0のやつも入れる
        const namedCount = await namegame.namedCount(roomId);
        const answeredCount = await namegame.answeredCount(roomId);

        if (namedCount > answeredCount) {
            pageFlg = 2;
        } else if (answeredCount === 14) {
            pageFlg = 0;
        } else if (namedCount != 0 && namedCount < answeredCount) {
            pageFlg = 2;
        } else if (namedCount === 0 && namedCount < answeredCount) {
            pageFlg = 1;
        }

        switch (pageFlg) {
            case 0:
                IOserver.emit('gameResult', {});
                break;
            case 1:
                const first = await order.first(roomId);

                const orderId = first.id;
                const nextPattern = first.order_pattern;

                await order.flgUpdate(orderId);

                console.log("次の人：" + nextPattern);
                IOserver.emit("changeOrder", {
                    changePattern: nextPattern,
                    pageFlg: pageFlg
                })
                break;

            case 2:
                IOserver.emit("changeOrder", {
                    pageFlg: pageFlg,
                })
                break;
        }
    })
}