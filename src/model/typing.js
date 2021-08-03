const mysql = require('mysql2/promise');
const { config } = require('../config/config');

exports.typing = {

    add: async (typingData) => {
        const score = typingData.score;
        const userId = typingData.userId;
        const roomId = typingData.roomId;

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const params = [score, userId, roomId];
            const sql = 'INSERT INTO typing (id, score, user_id, room_id) values (null, ?, ?, ?)';
            const [err] = await mycon.query(sql, params);

            mycon.end();
            return true;

        } catch (err) {
            mycon.end();
            return false;
        }
    },

    all: async () => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const sql = 'SELECT * FROM typing LEFT OUTER JOIN user ON typing.user_id = user.id ORDER BY score DESC';
            const [results, fields] = await mycon.query(sql);

            mycon.end();
            return results;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    count: async () => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const sql = 'SELECT count(id) as cnt FROM typing';
            const [results] = await mycon.query(sql);
            const count = parseInt(results[0].cnt);

            mycon.end();
            return count;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    delete: async () => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const deleteSQL = 'delete FROM typing';
            await mycon.execute(deleteSQL);

            mycon.end();
            return true;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    isScore: async (typingData) => {
        const userId = typingData.userId;
        const roomId = typingData.roomId;

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const params = [userId, roomId];
            const sql = 'SELECT COUNT(id) AS cnt FROM typing WHERE user_id = ? AND room_id = ?';
            const [doubleCheck] = await mycon.query(sql, params);
            const count = parseInt(doubleCheck[0].cnt);

            mycon.end();
            if (count === 0) {
                return false;
            }
            return true;
        } catch (err) {
            mycon.end();
            return "failed.";
        }
    }
}