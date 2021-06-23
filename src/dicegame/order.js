exports.order = (socket, IOserver, orderArray) => {

    const randomPattern = (digit) => {
        const patterns = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let val = '';

        if (typeof digit === 'undefined') digit = 8;

        for (let i = 0; i < digit; i++) {
            val += patterns[Math.floor(Math.random() * patterns.length)] + '';
        }

        return val;
    };

    socket.on("requestOrderPattern", (data) => {
        // 順番作製のために
        const orderPattern = randomPattern(15);
        orderArray.push(orderPattern);

        // 順番を受け取りに来たユーザに順番を送る。
        IOserver.to(socket.id).emit("sendOrderPattern", {
            orderPattern: orderPattern,
        });
    });

    socket.on("order", (data) => {
        console.log("順番切り替え処理を行っています・・・");
        if (data.flg == "answered") {
            const nextPattern = orderArray.shift();
            console.log("送信パターン" + nextPattern);
            console.log("参加部屋名：" + data.entryRoomName);
            IOserver.emit("changeOrder", {
                changePattern: nextPattern,
            })
        }
    })
}