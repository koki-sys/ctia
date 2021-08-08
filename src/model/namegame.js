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
            const sql = 'insert into namegame (id, chara_number, chara_name, user_id, room_id, flg) values (null, ?, ?, ?, ?, 0)';
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
    },

    random: async (roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const params = [roomId];
            const sql = 'SELECT * FROM namegame WHERE room_id = ? AND flg = 0 ORDER BY RAND() LIMIT 1;';
            const [results, fields] = await mycon.query(sql, params);

            const result = results[0];
            mycon.end();
            return result;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    flgUpdate: async (id) => {

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const params = [id];
            const sql = 'UPDATE namegame SET flg = 1 WHERE id = ?';
            const [err] = await mycon.query(sql, params);

            mycon.end();
            return true;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    unansweredCount: async (roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const params = [roomId];
            const sql = 'SELECT COUNT(id) AS cnt FROM namegame WHERE flg = 0 AND room_id = ?';
            const [result] = await mycon.query(sql, params);

            const count = result[0].cnt;
            mycon.end();
            return count;
        } catch (err) {
            mycon.end();
            return false;
        }
    }
}