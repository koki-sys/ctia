
const mysql = require('mysql2/promise');
const { config } = require('./config');

let mycon = null;

(async () => {
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
})();
exports.mycon = mycon;
