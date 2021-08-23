const mysql = require('mysql2/promise');
const { config } = require("../../../src/config/config");
const { user } = require('../../../src/model/user');
const { room } = require('../../../src/model/room');

exports.afterInit = async () => {
    mycon = await mysql.createConnection(config.database);
    mycon.connect();
    await mycon.query("DELETE FROM typing");
    await mycon.query("DELETE FROM user");
    await mycon.query("DELETE FROM room");
    mycon.end();
}

exports.beforeInit = async () => {

    const sampleData = {
        roomId: 48,
        enterRoomName: "部屋48",
        nickname: "testUser",
        limitPerRoom: 2
    }

    await room.create(sampleData);
    await user.add(sampleData);
    const result = await user.find(sampleData.nickname);
    const id = result.id;

    return id;
}