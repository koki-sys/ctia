const mysql = require('mysql2/promise');
const { config } = require("../../../src/config/config");
const { room } = require('../../../src/model/room');

exports.beforeInit = async (data) => {
    await room.create(data);
}

exports.afterInit = async () => {
    mycon = await mysql.createConnection(config.database);
    mycon.connect();
    await mycon.query("DELETE FROM illust");
    await mycon.query("DELETE FROM room");
    mycon.end();
}