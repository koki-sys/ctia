const mysql = require('mysql2/promise');
const { config } = require("../../src/config/config");

exports.score = {
    addNamegame: async (score, userId, roomId) => {

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const params = [score, userId, roomId];
            const sql = 'INSERT INTO score (id, score, game_id, user_id, room_id) values (null, ?, 1, ?, ?)';
            const [err] = await mycon.query(sql, params);

            mycon.end();
            return true;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    getNamegame: async (roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            // ルーム追加
            const params = [roomId];
            const sql = 'SELECT * FROM score LEFT OUTER JOIN user ON score.user_id = user.id WHERE game_id = 1 AND room_id = ? ORDER BY score DESC LIMIT 1';
            const [results] = await mycon.query(sql, params);

            const result = results[0];
            mycon.end();
            return result;
        } catch (err) {
            mycon.end();
            return false;
        }
    }
}