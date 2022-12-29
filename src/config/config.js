const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

const setConfig = {
    database: {
        host: env.DB_HOST,
        database: env.DB_DATABASE,
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
    },
};

exports.config = setConfig;
