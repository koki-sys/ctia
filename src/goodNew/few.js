exports.few = (socket, IOserver) => {
    const { groupInit } = require('./groupInit');

    // 少人数用の部屋を作製
    let fewGoodNewRoomArray = Array(50);
    groupInit(fewGoodNewRoomArray);

    /**
    * 少人数用の部屋参加関数(ニックネーム入力画面から送信)
    *
    * @emits {String} data.entryRoomName 部屋名
    * @emits {Number} data.roomCount 部屋数
    * @emits {Number} data.limitPerRoom 部屋あたりの制限人数
    * @emits {Number} data.countInRoom 部屋内の人数
    */

    socket.on("few_group", (data) => {
        console.log(socket);
        console.log(IOserver);
        for (let roomNumber = 0; roomNumber < fewGoodNewRoomArray.length; roomNumber++) {
            console.log(fewGoodNewRoomArray[roomNumber]);
            if (fewGoodNewRoomArray[roomNumber] < 13) {
                fewGoodNewRoomArray[roomNumber] += 1;
                console.log(fewGoodNewRoomArray[roomNumber]);
                const entryRoomName = (data.roomName == null) ? "部屋" + (roomNumber + 1) : data.roomName;
                socket.join(entryRoomName);
                const countInRoom = fewGoodNewRoomArray[roomNumber];

                    IOserver.to(entryRoomName).emit("generate", {
                        entryRoomName: entryRoomName,
                        limitPerRoom: 13,
                        countInRoom: countInRoom,
                    });
                    console.log("emitted.");
                break;
            }
        }
    });
}

