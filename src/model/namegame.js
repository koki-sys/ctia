const mysql = require('mysql2/promise');
const { config } = require("../../src/config/config");

exports.namegame = {

    add: async (gameData) => {

        // 部屋情報
        const charaId = gameData.charaId;
        const charaName = gameData.charaName;
        const userId = gameData.userId;
        const roomId = gameData.roomId;

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const params = [charaId, charaName, userId, roomId];
            const sql = 'insert into namegame (id, chara_number, chara_name, user_id, room_id) values (null, ?, ?, ?, ?)';
            const [err] = await mycon.query(sql, params);

            mycon.end();
            return true;
        } catch (err) {
            mycon.end();
            return false;
        }

    },

    find: async (gameData) => {

        // 部屋情報
        const charaId = gameData.charaId;
        const charaName = gameData.charaName;
        const roomId = gameData.roomId;

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const params = [charaId, charaName, roomId];
            const sql = 'select * from namegame where chara_number = ? and chara_name = ? and room_id = ?';
            const [results, fields] = await mycon.query(sql, params);

            const result = results[0];

            mycon.end();
            return result;
        } catch (err) {
            mycon.end();
            return false;
        }
    }
}