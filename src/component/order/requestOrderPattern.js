const { randomPattern } = require('./randomPattern');
const { user } = require('../../model/user');
const { order } = require('../../model/order');

exports.requestOrderPattern = (socket, IOserver) => {
    socket.on("requestOrderPattern", async (data) => {
        const nickname = data.nickname;
        const roomId = data.roomId;

        // 順番作製のために
        const orderPattern = randomPattern();

        const PersonInfo = await user.find(nickname);
        const userId = PersonInfo.id;

        const orderData = {
            roomId: roomId,
            userId: userId,
            random: orderPattern
        }

        await order.add(orderData);

        // 順番を受け取りに来たユーザに順番を送る。
        IOserver.to(socket.id).emit("sendOrderPattern", {
            orderPattern: orderPattern,
        });
    });
}
