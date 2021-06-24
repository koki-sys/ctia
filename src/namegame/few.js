exports.few = (socket, IOserver, room) => {
    /**
    * 少人数用の部屋参加関数(ニックネーム入力画面から送信)
    *
    * @emits {String} data.entryRoomName 部屋名
    * @emits {Number} data.limitPerRoom 部屋あたりの制限人数
    * @emits {Number} data.countInRoom 部屋内の人数
    */

    socket.on("few_group", (data) => {
        for (let roomNumber = 0; roomNumber < room.length; roomNumber++) {
            if (room[roomNumber] < 13) {
                room[roomNumber] += 1;
                console.log("現在部屋内の人数:" + room[roomNumber]);
                const entryRoomName = (data.roomName == null) ? "room" + (roomNumber + 1) : data.roomName;
                socket.join(entryRoomName);
                const countInRoom = room[roomNumber];

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

