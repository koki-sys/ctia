const { group } = require("./group");
const { order } = require("./order");

exports.goodNew = (socketIoServer) => {
    const { groupInit } = require('./groupInit');

    // 部屋内の人数を管理するための配列の定義、初期化
    let goodNewRoomArray = Array(10);
    groupInit(goodNewRoomArray);

    // 順番を保存する配列
    let orderArray = [];

    // namespaceがGoodNewServerで設定、接続
    const goodNewServer = socketIoServer.of("/gn");
    goodNewServer.on("connection", (socket) => {
        group(socket, goodNewServer, goodNewRoomArray);
        order(socket, goodNewServer, orderArray);
    });
};
