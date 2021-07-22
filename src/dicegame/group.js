exports.group = (socket, IOserver) => {

    const { createRoom } = require('./createRoom');
    const { getUserCount} = require('./getUserCount')

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
    socket.on("set_nickname", async (data) => {

        // 部屋数と制限人数を定義
        let roomCount;
        let limitPerRoom;

        // クライアントから送られてくるモノ（Doc Comment参照してください）
        const nickName = data.nickName != null ? data.nickName : "ニックネームが送信されていません";

        // 型変換( int型へ ) 
        if (data.roomCount != null || data.limitPerRoom != null) {
            roomCount = parseInt(data.roomCount);
            limitPerRoom = parseInt(data.limitPerRoom);
        }

        for (let i = 0; i < room.length; i++) {

            // 部屋番号をランダムに生成する変数（ランダムで部屋に割り振りするため）
            const roomNumber = Math.floor(Math.random() * roomCount);

            const personCountInRoom = await getUserCount(roomNumber);

            // room-> user
            // 部屋内の人数内に収まっているとき
            if (personCountInRoom < limitPerRoom) {
                // ルームを追加してユーザ追加
                const enterRoomName = "部屋" + (roomNumber + 1);

                // 部屋情報を作製
                const roomData = {
                    nickName: nickName,
                    roomNumber: roomNumber,
                    enterRoomName: enterRoomName,
                    limitPerRoom: limitPerRoom
                }

                // ルーム作製
                createRoom(roomData);

                // ルーム参加
                socket.join(enterRoomName);

                // ルーム内の人数を取得 countInRoom
                const countInRoom = await getUserCount(roomNumber);

                IOserver.to(enterRoomName).emit("waiting", {
                    nickName: nickName,
                    entryRoomName: enterRoomName,
                    roomCount: roomCount,
                    limitPerRoom: limitPerRoom,
                    countInRoom: countInRoom,
                });
                break;
            }
        }
    });
}
