exports.group = (socket, IOserver, room) => {

    // 部屋数と制限人数を定義
    let roomCount;
    let limitPerRoom;

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

    socket.on("set_nickname", (data) => {

        // クライアントから送られてくるモノ（Doc Comment参照してください）
        const nickName = data.nickName != null ? data.nickName : "ニックネームが送信されていません";
        if (data.roomCount != null || data.limitPerRoom != null) {
            roomCount = parseInt(data.roomCount);
            limitPerRoom = parseInt(data.limitPerRoom);
        }

        for (let i = 0; i < room.length; i++) {

            // 部屋番号をランダムに生成する変数（ランダムで部屋に割り振りするため）
            const randomRoomNumber = Math.floor(Math.random() * roomCount);

            console.log(room[randomRoomNumber]);
            if (room[randomRoomNumber] < limitPerRoom) {
                room[randomRoomNumber]++;
                const enterRoomName = "部屋" + (randomRoomNumber + 1);
                socket.join(enterRoomName);
                const countInRoom = room[randomRoomNumber];
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
