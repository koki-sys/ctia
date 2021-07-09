const { group } = require("./group");
const { order } = require("./order");

exports.nameGame = (socketIoServer) => {
    const { groupInit } = require('./groupInit');

    // 部屋内の人数を管理するための配列の定義、初期化
    let diceGameRoomArray = Array(10);
    groupInit(diceGameRoomArray);

    // 順番を保存する配列
    let orderArray = [];

    let waitCount;

    let namedImgNumberArray = [];
    let tempCharaName;

    // namespaceがnameGameServerで設定、接続
    const nameGameServer = socketIoServer.of("/ng");
    nameGameServer.on("connection", (socket) => {
        group(socket, nameGameServer, diceGameRoomArray);
        order(socket, nameGameServer, orderArray, waitCount, namedImgNumberArray, tempCharaName);
    });
};
