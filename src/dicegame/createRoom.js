exports.createRoom = async (roomData) => {

    const { mycon } = require('../connectDB');

    // 部屋情報
    const nickName = roomData.nickName;
    const roomNumber = roomData.roomNumber;
    const enterRoomName = roomData.enterRoomName;
    const limitPerRoom = roomData.limitPerRoom;

    // ルーム追加
    const addRoomParam = [roomNumber, enterRoomName, limitPerRoom];
    const addRoomSQL = 'INSERT INTO room VALUES(?, ?, ?)';
    const [addRoomError] = await mycon.query(addRoomSQL, addRoomParam);
    console.log(addRoomError);

    // ユーザ追加
    const addUserParam = [nickName, roomNumber];
    const addUserSQL = 'INSERT INTO user(id, nickname, room_id) VALUES(null, ?, ?)';
    const [addUserError] = await mycon.query(addUserSQL, addUserParam);
    console.log(addUserError);
}
