const mysql = require('mysql2/promise');
const { config } = require('../config/config');

exports.illust = {
    add: async (sec, roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [sec, roomId];
            const sql = 'INSERT INTO illust (id, sec, room_id) VALUES(null, ?, ?)';
            const [err] = await mycon.query(sql, param);

            mycon.end();
            return true;
        } catch (err) {
            console.log(err);
            mycon.end();
        }
    },

    getSec: async (roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [roomId];
            const sql = 'SELECT sec FROM illust WHERE room_id = ?';
            const [results, fields] = await mycon.query(sql, param);

            const result = results[0].sec;
            mycon.end();
            return result;
        } catch (err) {
            console.log(err);
            mycon.end();
        }
    },

    update: async (sec, roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [sec, roomId];
            const sql = 'UPDATE illust SET sec = ? WHERE room_id = ?';
            const [err] = await mycon.query(sql, param);

            mycon.end();
            return true;

        } catch (err) {
            console.log(err);
            mycon.end();
        }
    },

    exists: async (roomId) => {
        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [roomId];
            const sql = 'SELECT sec FROM illust WHERE room_id = ?';
            const [results, field] = await mycon.query(sql, param);

            mycon.end();
            const result = results[0];
            return (typeof result != "undefined");
        } catch (err) {
            console.log(err);
            mycon.end();
        }
    }
}