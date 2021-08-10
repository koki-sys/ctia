const { order } = require('../../model/order');
const { requestOrderPattern } = require('../../component/order/requestOrderPattern');

exports.gnController = (socket, IOserver) => {

    requestOrderPattern(socket, IOserver);

    socket.on("order", async (data) => {
        if (data.flg == "answered") {
            const result = await order.first(data.roomId);
            if (result != false && typeof result != "undefined") {
                const nextPattern = result.order_pattern;
                await order.flgUpdate(result.id);

                IOserver.emit("changeOrder", {
                    changePattern: nextPattern,
                })
            } else {
                IOserver.emit("gameEnd", {});
            }
        }
    })
}