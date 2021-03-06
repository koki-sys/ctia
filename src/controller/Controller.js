const { roomController } = require("./user/roomController");
const { userController } = require("./user/userController");
const { dgController } = require('./dicegame/dgController');
const { gnController } = require('./goodNew/gnController');
const { tpController } = require('./typing/tpController');
const { ngController } = require('./namegame/ngController');
const { igController } = require("./illustgame/igController");

exports.Controller = (socketIoServer) => {
    // 順番を保存する配列
    let waitCount;

    // サイコロ自己紹介
    const diceGameServer = socketIoServer.of("/dg");
    diceGameServer.on("connection", (socket) => {
        roomController(socket, diceGameServer);
        userController(socket, diceGameServer);
        dgController(socket, diceGameServer);
    });

    // Good&New
    const goodNewServer = socketIoServer.of("/gn");
    goodNewServer.on("connection", (socket) => {
        roomController(socket, goodNewServer);
        userController(socket, goodNewServer);
        gnController(socket, goodNewServer);
    });

    // タイピング
    const typingGameServer = socketIoServer.of("/tp");
    typingGameServer.on("connection", (socket) => {
        roomController(socket, typingGameServer);
        userController(socket, typingGameServer);
        tpController(socket, typingGameServer);
    });

    // 名前当てゲーム
    const nameGameServer = socketIoServer.of("/ng");
    nameGameServer.on("connection", (socket) => {
        roomController(socket, nameGameServer);
        userController(socket, nameGameServer);
        ngController(socket, nameGameServer, waitCount);
    });

    const illustGameServer = socketIoServer.of("/ig");
    illustGameServer.on("connection", (socket) => {
        roomController(socket, illustGameServer);
        userController(socket, illustGameServer);
        igController(socket, illustGameServer);
    })
}