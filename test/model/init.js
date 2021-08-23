const mysql = require('mysql2/promise');
const { config } = require("../../src/config/config");

exports.beforeInit = async () => {
    mycon = await mysql.createConnection(config.database);
    mycon.connect();
    await mycon.query("DELETE FROM illust");
    await mycon.query("DELETE FROM namegame");
    await mycon.query("DELETE FROM order_pattern");
    await mycon.query("DELETE FROM score");
    await mycon.query("DELETE FROM user");
    await mycon.query("DELETE FROM room");
    mycon.end();
}