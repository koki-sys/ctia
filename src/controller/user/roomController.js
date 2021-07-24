exports.roomController = async (socket, IOserver) => {

    const { mycon } = require('../../database/connectDB');
    const { room } = require('../../model/room');
    const { getUserCount } = require('../../controller/user/getUserCount');


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
        let roomNumber;

        // 型変換( int型へ ) 
        if (data.roomCount != null || data.limitPerRoom != null) {
            roomCount = parseInt(data.roomCount);
            limitPerRoom = parseInt(data.limitPerRoom);
        }

        while (true) {
            // 部屋番号をランダムに生成する変数（ランダムで部屋に割り振りするため）
            roomNumber = Math.floor(Math.random() * 100);
            const roomExists = await room.isRoom(mycon, roomNumber);
            if (roomExists === false) {
                break;
            }
        }

        while (true) {
            const personCountInRoom = await getUserCount(mycon, roomNumber);

            // 部屋内の人数内に収まっているとき
            if (personCountInRoom < limitPerRoom) {
                // ルームを追加してユーザ追加
                const enterRoomName = "room" + (roomNumber + 1);

                // 部屋情報を作製
                const roomData = {
                    roomNumber: roomNumber,
                    enterRoomName: enterRoomName,
                    limitPerRoom: limitPerRoom
                }


                // ルーム作製
                await room.createRoom(mycon, roomData);

                const roomId = await room.getRoomId(mycon, roomNumber);
                console.log("部屋ID" + roomId);

                // ルーム参加
                await socket.join(enterRoomName);

                IOserver.emit("roomInfo", {
                    roomId: roomId,
                    roomCount: roomCount,
                    limitPerRoom: limitPerRoom,
                });
                break;
            }
        }
    });

}
