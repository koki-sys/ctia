exports.group = (socket, IOserver) => {
    const { groupInit } = require('./groupInit');

    // 部屋内の人数を管理するための配列の定義、初期化
    let goodNewRoomArray = Array(10);
    groupInit(goodNewRoomArray);

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

        for (let i = 0; i < goodNewRoomArray.length; i++) {

            // 部屋番号をランダムに生成する変数（ランダムで部屋に割り振りするため）
            const randomRoomNumber = Math.floor(Math.random() * roomCount);

            console.log(goodNewRoomArray[randomRoomNumber]);
            if (goodNewRoomArray[randomRoomNumber] < limitPerRoom) {
                goodNewRoomArray[randomRoomNumber]++;
                const enterRoomName = "部屋" + (randomRoomNumber + 1);
                socket.join(enterRoomName);
                const countInRoom = goodNewRoomArray[randomRoomNumber];
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
