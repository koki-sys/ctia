const { group } = require("./group");
const { few } = require("./few");
const { order } = require("./order");

exports.nameGame = (socketIoServer) => {
    const { groupInit } = require('./groupInit');

    // 少人数用の部屋を作製
    let fewDiceGameRoomArray = Array(50);
    groupInit(fewDiceGameRoomArray);

    // 部屋内の人数を管理するための配列の定義、初期化
    let diceGameRoomArray = Array(10);
    groupInit(diceGameRoomArray);

    // 順番を保存する配列
    let orderArray = [];

    // namespaceがnameGameServerで設定、接続
    const nameGameServer = socketIoServer.of("/ng");
    nameGameServer.on("connection", (socket) => {
        group(socket, nameGameServer, diceGameRoomArray);
        few(socket, nameGameServer, fewDiceGameRoomArray);
        order(socket, nameGameServer, orderArray);
    });
};
