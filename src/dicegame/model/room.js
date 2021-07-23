exports.room = {

    createRoom: async (mycon, roomData) => {

        // 部屋情報
        const roomNumber = roomData.roomNumber;
        const enterRoomName = roomData.enterRoomName;
        const limitPerRoom = roomData.limitPerRoom;

        // ルーム追加
        const param = [roomNumber, enterRoomName, limitPerRoom];
        const sql = 'INSERT INTO room VALUES(?, ?, ?)';
        const [addRoomError] = await mycon.query(sql, param);
        console.log(addRoomError);
    },

    getRoomId: async (mycon, roomNumber) => {

        // ルーム情報を取得
        const param = [roomNumber];
        const sql = 'SELECT id FROM room WHERE id = ?';
        const [roomInfo] = await mycon.query(sql, param);

        const roomId = roomInfo[0].id;
        return roomId;
    },

    isRoom: async (mycon, roomNumber) => {
        // ルーム情報を取得
        const param = [roomNumber];
        const sql = 'SELECT COUNT(id) AS cnt FROM room WHERE id = ?';
        const [roomInfo] = await mycon.query(sql, param);

        const roomCount = roomInfo[0].cnt;
        if (roomCount >= 1) {
            return true;
        }
        return false;
    }
}