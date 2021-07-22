exports.order = (socket, IOserver, orderArray) => {

    const { randomPattern } = require("./randomPattern");

    socket.on("requestOrderPattern", () => {
        // 順番作製のために
        const orderPattern = randomPattern();
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
            if (typeof nextPattern != "undefined") {
                console.log("送信パターン" + nextPattern);
                console.log("参加部屋名：" + data.entryRoomName);
                IOserver.emit("changeOrder", {
                    changePattern: nextPattern,
                })
            } else {
                IOserver.emit("gameEnd", {});
            }
        }
    })
}