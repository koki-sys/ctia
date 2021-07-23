exports.user = {

    // ユーザ追加
    add: async (mycon, userData) => {
        // ユーザ追加
        const nickName = userData.nickName;
        const roomId = userData.roomId;

        const param = [nickName, roomId];
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
    find: async(mycon, userData) => {
        const nickName = userData.nickName;
        const roomId = userData.roomId;

        const param = [nickName, roomId];
        const sql = 'SELECT * FROM user WHERE nickname = ? AND room_id = ?';
        const [userRow] = await mycon.query(sql, param);
        console.log(userRow);

        const name = userRow[0].nickname;
        return name;
    }
}