const { user } = require('../../model/user');
const { order } = require('../../model/order');

exports.gnController = (socket, IOserver) => {

    const { randomPattern } = require("../../component/randomPattern");

    socket.on("requestOrderPattern", async (data) => {
        if (data.flg != "answered") {
            const roomId = data.roomId;
            const nickname = data.nickname;

            // 順番作製のために
            const orderPattern = randomPattern();

            const PersonInfo = await user.find(nickname);
            console.log(PersonInfo);
            const userId = PersonInfo.id;

            const orderData = {
                roomId: roomId,
                userId: userId,
                random: orderPattern
            }

            console.log(orderData);
            await order.add(orderData);

            // 順番を受け取りに来たユーザに順番を送る。
            IOserver.to(socket.id).emit("sendOrderPattern", {
                orderPattern: orderPattern,
            });
        }
    });

    socket.on("order", async (data) => {
        console.log("順番切り替え処理を行っています・・・");
        if (data.flg == "answered") {
            const result = await order.first(data.roomId);
            console.log("処理結果:" + JSON.stringify(result));
            if (result != false && typeof result != "undefined") {
                const nextPattern = result.order_pattern;
                await order.flgUpdate(result.id);


                console.log("送信パターン" + nextPattern);
                IOserver.emit("changeOrder", {
                    changePattern: nextPattern,
                })
            } else {
                IOserver.emit("gameEnd", {});
            }
        }
    })
}