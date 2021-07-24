exports.getUserCount = async (mycon, random) => {

    // ルーム内のユーザ数をカウント
    const getUserCountParam = random;
    const getUserCountSQL = 'SELECT COUNT(id) AS cnt FROM user WHERE room_id = ?';
    const [userInRoom] = await mycon.query(getUserCountSQL, getUserCountParam);
    const countInRoom = userInRoom[0].cnt;

    return countInRoom;
}