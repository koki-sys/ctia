const mysql = require('mysql2/promise');
const { config } = require('../config/config');

exports.user = {

    // ユーザ追加
    add: async (userData) => {

        // ユーザ追加
        const nickname = userData.nickname;
        const roomId = userData.roomId;

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [nickname, roomId];
            const sql = 'INSERT INTO user(id, nickname, room_id) VALUES(null, ?, ?)';
            const [addUserError] = await mycon.query(sql, param);

            mycon.end();

            return true;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    // 全ユーザ情報
    all: async (roomId) => {

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [roomId];
            const sql = 'SELECT nickname FROM user WHERE room_id = ?';
            const [userRow] = await mycon.query(sql, param);

            mycon.end();
            return userRow;
        } catch (err) {
            mycon.end();
            return false;
        }
    },

    // ユーザ数
    count: async (roomId) => {

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [roomId];
            const sql = 'SELECT COUNT(nickname) AS cnt FROM user WHERE room_id = ?';
            const [userRow] = await mycon.query(sql, param);
            const userCount = userRow[0].cnt;
            
            mycon.end();
            return userCount;
        } catch (err) {
            mycon.end();
            return false;
        }

    },

    // ユーザの詳細情報
    find: async (nickname) => {

        try {
            mycon = await mysql.createConnection(config.database);
            mycon.connect();

            const param = [nickname];
            const sql = 'SELECT * FROM user WHERE nickname = ?';
            const [userRow] = await mycon.query(sql, param);

            const user = userRow[0];

            mycon.end();
            return user;
        } catch (err) {
            mycon.end();
            return false;
        }
    }
}