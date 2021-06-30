const { group } = require("./group");
const { order } = require("./order");

exports.diceGame = (socketIoServer) => {
    const { groupInit } = require('./groupInit');

    // 部屋内の人数を管理するための配列の定義、初期化
    let diceGameRoomArray = Array(10);
    groupInit(diceGameRoomArray);

    // 順番を保存する配列
    let orderArray = [];

    // namespaceがdiceGameServerで設定、接続
    const diceGameServer = socketIoServer.of("/dg");
    diceGameServer.on("connection", (socket) => {
        group(socket, diceGameServer, diceGameRoomArray);
        order(socket, diceGameServer, orderArray);
    });
};
