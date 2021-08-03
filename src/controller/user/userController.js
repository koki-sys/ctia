exports.userController = (socket, serverIO) => {

    const { user } = require('../../model/user');

    const userExists = async (isAddError, userData) => {
        if (!isAddError) {
            serverIO.to(socket.id).emit("user_exists", {
                errmsg: "すでにユーザが存在します。<br>前の画面で名前を変更してください。"
            })
        } else {
            const nowCount = await user.count(userData.roomId);

            const PersonalInfo = await user.find(userData.nickname);

            const name = PersonalInfo.nickname;
            console.log("ユーザ設定ニックネーム:" + name);

            const userRow = await user.all(userData.roomId);

            serverIO.emit("waiting", {
                userRow: userRow,
                nickName: name,
                countInRoom: nowCount,
                limitPerRoom: userData.limitPerRoom
            })
        }
    }

    socket.on('join_game', async (data) => {
        const roomId = parseInt(data.roomId);
        const nickName = data.nickName;
        const roomCount = parseInt(data.roomCount);
        const limitPerRoom = parseInt(data.limitPerRoom);

        const userData = {
            roomId: roomId,
            nickname: nickName,
            roomCount: roomCount,
            limitPerRoom: limitPerRoom
        }
        console.log("保存オブジェクト：" + JSON.stringify(userData));

        const count = await user.count(userData.roomId);
        if (count < limitPerRoom) {
            // ユーザーを追加
            const isAddError = await user.add(userData);

            await userExists(isAddError, userData);
        }
    });
}
