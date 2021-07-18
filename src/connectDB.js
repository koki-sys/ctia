
const mysql = require('mysql2/promise');
const { config } = require('./config');

let mycon = null;

const connDB = async () => {
    try {
        mycon = await mysql.createConnection(config.database);
        mycon.connect(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const exportConnection = async () => {
    exports.mycon = mycon;
}

const execute = async () => {
    await connDB();
    await exportConnection();
}
execute();