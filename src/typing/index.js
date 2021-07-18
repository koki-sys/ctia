const { group } = require("./group");
const { order } = require("./order");

exports.typingGame = (socketIoServer) => {
    const { groupInit } = require('./groupInit');

    // 部屋内の人数を管理するための配列の定義、初期化
    let typingGameRoomArray = Array(10);
    groupInit(typingGameRoomArray);

    // namespaceがtypingGameServerで設定、接続
    const typingGameServer = socketIoServer.of("/tp");
    typingGameServer.on("connection", (socket) => {
        group(socket, typingGameServer, typingGameRoomArray);
        order(socket, typingGameServer);
    });
};
