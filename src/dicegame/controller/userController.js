exports.userController = (socket, serverIO) => {

    const { mycon } = require('../../connectDB');
    const { user } = require('../model/user');

    socket.on('join_game', async (data) => {
        const roomId = parseInt(data.roomId);
        const nickName = data.nickName;
        const roomCount = parseInt(data.roomCount);
        const limitPerRoom = parseInt(data.limitPerRoom);

        const userData = {
            roomId: roomId,
            nickName: nickName,
            roomCount: roomCount,
            limitPerRoom: limitPerRoom
        }
        console.log(userData);

        const count = await user.count(mycon, userData);
        if (count < limitPerRoom) {
            // ユーザーを追加
            await user.add(mycon, userData);
        }
        const nowCount = await user.count(mycon, userData);
        console.log("count:" + count)
        const name = await user.find(mycon, userData);
        const userRow = await user.all(mycon, userData);

        serverIO.emit("waiting", {
            userRow: userRow,
            nickName: name,
            countInRoom: nowCount,
            limitPerRoom: limitPerRoom
        })
    })
}