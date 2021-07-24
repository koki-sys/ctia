exports.user = {

    // ユーザ追加
    add: async (mycon, userData) => {
        // ユーザ追加
        const nickname = userData.nickname;
        const roomId = userData.roomId;

        const param = [nickname, roomId];
        const sql = 'INSERT INTO user(id, nickname, room_id) VALUES(null, ?, ?)';
        const [addUserError] = await mycon.query(sql, param);
        console.log(addUserError);
    },

    // 全ユーザ情報
    all: async (mycon, userData) => {
        const roomId = userData.roomId;

        const param = [roomId];
        const sql = 'SELECT nickname FROM user WHERE room_id = ?';
        const [userRow] = await mycon.query(sql, param);
        console.log(userRow);

        return userRow;
    },

    // ユーザ数
    count: async (mycon, userData) => {
        const roomId = userData.roomId;

        const param = [roomId];
        const sql = 'SELECT COUNT(nickname) AS cnt FROM user WHERE room_id = ?';
        const [userRow] = await mycon.query(sql, param);
        console.log(userRow);
        const userCount = userRow[0].cnt;

        return userCount;
    },

    // ユーザの詳細情報
    find: async (mycon, nickname) => {

        const param = [nickname];
        const sql = 'SELECT * FROM user WHERE nickname = ?';
        const [userRow] = await mycon.query(sql, param);

        const user = userRow[0];
        console.log("user:" + JSON.stringify(user));
        return user;
    }
}