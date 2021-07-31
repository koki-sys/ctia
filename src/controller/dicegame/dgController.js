
exports.dgController = (socket, IOserver, orderArray) => {

    const { randomPattern } = require("../../component/randomPattern");

    socket.on("requestOrderPattern", (data) => {
        if (data.flg != "answered") {
            // 順番作製のために
            const orderPattern = randomPattern();
            orderArray.push(orderPattern);

            // 順番を受け取りに来たユーザに順番を送る。
            IOserver.to(socket.id).emit("sendOrderPattern", {
                orderPattern: orderPattern,
            });
        }
    });

    socket.on("order", (data) => {
        console.log("順番切り替え処理を行っています・・・");
        if (data.flg == "answered") {
            const nextPattern = orderArray.shift();
            patternCheck(nextPattern, data.entryRoomName, IOserver);
        }
    })
}