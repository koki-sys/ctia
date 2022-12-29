exports.roomController = async (socket, IOserver) => {
    const { room } = require("../../model/room");
    const { user } = require("../../model/user");

    /**
     * 待機処理を行う関数(ニックネーム入力画面から送信)
     *
     * @param {String} data.nickName ニックネーム
     * @param {Number} data.roomCount 部屋数
     * @param {Number} data.limitPerRoom 部屋あたりの制限人数
     *
     * @emits {String} data.nickName ニックネーム
     * @emits {String} data.entryRoomName 部屋名
     * @emits {Number} data.roomCount 部屋数
     * @emits {Number} data.limitPerRoom 部屋あたりの制限人数
     * @emits {Number} data.countInRoom 部屋内の人数
     */
    // set_nickname -> create_room
    socket.on("create_room", async (data) => {
        // 部屋数と制限人数を定義
        let roomCount;
        let limitPerRoom;
        let roomId;

        // 型変換( int型へ )
        if (data.roomCount != null || data.limitPerRoom != null) {
            roomCount = parseInt(data.roomCount);
            limitPerRoom = parseInt(data.limitPerRoom);
        }

        while (true) {
            // 部屋番号をランダムに生成する変数（ランダムで部屋に割り振りするため）
            roomId = Math.floor(Math.random() * 100);
            const roomExists = await room.exists(roomId);
            if (roomExists === false) {
                break;
            }
        }

        while (true) {
            const personCountInRoom = await user.count(roomId);

            // 部屋内の人数内に収まっているとき
            if (personCountInRoom < limitPerRoom) {
                // ルームを追加してユーザ追加
                const enterRoomName = "room" + (roomId + 1);

                // 部屋情報を作製
                const roomData = {
                    roomId: roomId,
                    enterRoomName: enterRoomName,
                    limitPerRoom: limitPerRoom,
                };

                // ルーム作製
                await room.create(roomData);

                const id = await room.getRoomId(roomId);
                console.log("部屋ID" + id);

                // ルーム参加
                await socket.join(enterRoomName);

                IOserver.emit("roomInfo", {
                    roomId: id,
                    roomCount: roomCount,
                    limitPerRoom: limitPerRoom,
                });
                break;
            }
        }
    });
};
