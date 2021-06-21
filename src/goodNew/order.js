exports.order = (socket, IOserver) => {
    let orderSet = new Set();

    const shuffleOrderNumber = (roomInRoom) => {
        return Math.floor(Math.random() * roomInRoom);
    }

    socket.on("requestOrderNumber", (data) => {
        // Setの追加前の長さと追加後の長さを比較して、重複を確認する。
        const beforeAddsize = orderSet.size;
        let orderNumber = 0;
        for (let i = 0; i < 5; i++) {
            orderNumber = shuffleOrderNumber(data.roomInRoom);
            if (data.oyaNumber == 1) {
                orderSet.add(data.oyaNumber);
                break;
            } else if (orderSet.size > beforeAddsize) {
                orderSet.add(orderNumber);
                // Setのソート処理を挟む(エラーあり)
                orderSet.sort((a, b) => a - b);
                break;
            }
        }

        // 順番を送る。
        IOserver.to(data.entryRoomName).emit("sendOrderNumber", {
            orderNumber: orderNumber,
        });
    });

    socket.on("order", (data) => {
        const oyaNumber = parseInt(data.oyaNumber);
        if (oyaNumber == 1 && data.flg == "answered") {
            const nextNumber = orderSet.shift();
            IOserver.to(data.entryRoomName).emit("changeOrder", {
                changeNumber: nextNumber,
            })
        } else if (data.flg == "answered") {
            // どこかで一番目をshift()する
            const nextNumber = orderSet.shift();
            IOserver.to(data.entryRoomName).emit("changeOrder", {
                changeNumber: nextNumber,
            })
        }
    })
}