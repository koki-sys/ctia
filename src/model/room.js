const mysql = require('mysql2/promise');
const { config } = require('../config/config');

exports.room = {

    create: async (roomData) => {
        // 部屋情報
        const roomId = roomData.roomId;
        const enterRoomName = roomData.enterRoomName;
        const limitPerRoom = roomData.limitPerRoom;

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const param = [roomId, enterRoomName, limitPerRoom];
            const sql = 'INSERT INTO room VALUES(?, ?, ?)';
            const [addRoomError] = await mycon.query(sql, param);

            mycon.end();
            return true;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    getRoomId: async (roomId) => {

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム情報を取得
            const param = [roomId];
            const sql = 'SELECT id FROM room WHERE id = ?';
            const [roomInfo] = await mycon.query(sql, param);

            const resultRoomId = roomInfo[0].id;

            mycon.end();
            return resultRoomId;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    exists: async (roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();
            // ルーム情報を取得
            const param = [roomId];
            const sql = 'SELECT COUNT(id) AS cnt FROM room WHERE id = ?';
            const [roomInfo] = await mycon.query(sql, param);

            const roomCount = roomInfo[0].cnt;
            mycon.end();

            if (roomCount >= 1) {
                return true;
            }
            return false;
        } catch (err) {
            mycon.end();
            return false;
        }
    }
}