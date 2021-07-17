
const mysql = require('mysql2/promise');
const { config } = require('./config');

let mycon = null;

const initDB = async () => {
    try {
        mycon = await mysql.createConnection(config.database);
        mycon.connect();
    } catch (e) {
        console.log(e);
    }
};

const isConnect = async () => {
    if (mycon != null) {
        exports.mycon = mycon;
    };
}

const connectDB = async () => {
    await initDB();
    await isConnect();
}

connectDB();