const mysql = require('mysql2/promise');
const { config } = require("../../../src/config/config");

exports.beforeInit = async () => {
    mycon = await mysql.createConnection(config.database);
    mycon.connect();
    await mycon.query("DELETE FROM room");
    mycon.end();
}

exports.afterInit = async () => {
    mycon = await mysql.createConnection(config.database);
    mycon.connect();
    await mycon.query("DELETE FROM room");
    mycon.end();
}