const { requestOrderPattern } = require("../../component/order/requestOrderPattern");
const { order } = require("../../model/order");

exports.igController = (socket, IOserver) => {

    requestOrderPattern(socket, IOserver);

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

        const first = await order.first(roomId);

        const orderId = first.id;
        const nextPattern = first.order_pattern;

        await order.flgUpdate(orderId);

        IOserver.emit("changeOrder", {
            changePattern: nextPattern,
        })
    })

    socket.on("toReceiveReq", () => {
        IOserver.emit("toReceive", {});
    })
}