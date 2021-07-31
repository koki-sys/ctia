const mysql = require('mysql2/promise');
const { config } = require('../config/config');

exports.order = {
    add: async (data) => {

        const roomId = data.roomId;
        const userId = data.userId;
        const random = data.random;

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [random, userId, roomId];
            const sql = 'INSERT INTO order_pattern (id, order_pattern, flg, user_id, room_id) VALUES(null, ?, 0, ?, ?)';
            const [err] = await mycon.query(sql, param);

            mycon.end();
            return true;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    first: async (roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [roomId];
            const sql = 'SELECT * FROM order_pattern WHERE room_id = ? AND flg = 0 ORDER BY id ASC';
            const [result] = await mycon.query(sql, param);

            const firstOrder = result[0];

            mycon.end();
            return firstOrder;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    flgUpdate: async (orderId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [orderId];
            const sql = 'UPDATE order_pattern SET flg = 1 WHERE id = ?';
            const [err] = await mycon.query(sql, param);

            mycon.end();
            return true;
        } catch (err) {
            mycon.end();
            return false;
        }
    }
}