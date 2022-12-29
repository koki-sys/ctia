const { requestOrderPattern } = require("../../component/order/requestOrderPattern");
const { illust } = require("../../model/illust");
const { order } = require("../../model/order");

exports.igController = (socket, IOserver) => {
    requestOrderPattern(socket, IOserver);

    socket.on("realtime-draw", (data) => {
        IOserver.emit("draw", {
            x: data.x,
            y: data.y,
            act: data.act,
            src: data.src,
        });
    });

    // 順番切り替えをする処理
    socket.on("order", async (data) => {
        const roomId = data.roomId;

        const first = await order.first(roomId);

        const orderId = first.id;
        const nextPattern = first.order_pattern;

        await order.flgUpdate(orderId);

        const sec = illust.getSec(data.roomId);
        if (sec <= 0) {
            IOserver.emit("gameEnd", {});
        } else {
            IOserver.emit("changeOrder", {
                changePattern: nextPattern,
            });
        }
    });

    socket.on("toReceiveReq", () => {
        IOserver.emit("toReceive", {});
    });

    socket.on("reqSec", async (data) => {
        let sec;
        const isSec = await illust.exists(data.roomId);

        if (!isSec) {
            await illust.add(300, data.roomId);
            sec = data.sec;
        } else {
            sec = await illust.getSec(data.roomId);
        }

        IOserver.emit("resSec", {
            sec: sec,
        });
    });

    socket.on("reqCalcTime", async (data) => {
        const gameTime = await illust.getSec(data.roomId);
        const time = parseInt(gameTime) - parseInt(data.sec);
        await illust.update(time, data.roomId);

        IOserver.emit("resCalcTime", {});
    });
};
