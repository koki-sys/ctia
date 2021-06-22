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
        // Setの追加前の長さと追加後の長さを比較して、重複を確認する。
        const orderPattern = randomPattern(15);
        orderArray.push(orderPattern);

        // 順番を送る。
        IOserver.to(data.entryRoomName).emit("sendOrderPattern", {
            orderPattern: orderPattern,
        });
    });

    socket.on("order", (data) => {
        if (data.flg == "answered") {
            const nextPattern = orderArray.shift();
            IOserver.to(data.entryRoomName).emit("changeOrder", {
                changePattern: nextPattern,
            })
        }
    })
}