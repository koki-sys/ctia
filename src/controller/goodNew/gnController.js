const { order } = require("../../model/order");
const { user } = require("../../model/user");
const { randomPattern } = require("../../component/order/randomPattern");

exports.gnController = (socket, IOserver) => {
    socket.on("requestOrderPattern", async (data) => {
        if (data.flg != "answered") {
            const roomId = data.roomId;
            const nickname = data.nickname;

            // 順番作製のために
            const orderPattern = randomPattern();

            const PersonInfo = await user.find(nickname);
            const userId = PersonInfo.id;

            const orderData = {
                roomId: roomId,
                userId: userId,
                random: orderPattern,
            };

            await order.add(orderData);

            // 順番を受け取りに来たユーザに順番を送る。
            IOserver.to(socket.id).emit("sendOrderPattern", {
                orderPattern: orderPattern,
            });
        }
    });

    socket.on("order", async (data) => {
        if (data.flg == "answered") {
            const result = await order.first(data.roomId);
            if (result != false && typeof result != "undefined") {
                const nextPattern = result.order_pattern;
                await order.flgUpdate(result.id);

                IOserver.emit("changeOrder", {
                    changePattern: nextPattern,
                });
            } else {
                IOserver.emit("gameEnd", {});
            }
        }
    });
};
