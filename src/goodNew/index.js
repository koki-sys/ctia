const { group } = require("./group");
const { few } = require("./few");
const { order } = require("./order");

exports.goodNew = (socketIoServer) => {
    const { groupInit } = require('./groupInit');

    // 少人数用の部屋を作製
    let fewGoodNewRoomArray = Array(50);
    groupInit(fewGoodNewRoomArray);

    // 部屋内の人数を管理するための配列の定義、初期化
    let goodNewRoomArray = Array(10);
    groupInit(goodNewRoomArray);

    // namespaceがGoodNewServerで設定、接続
    const goodNewServer = socketIoServer.of("/gn");
    goodNewServer.on("connection", (socket) => {
        group(socket, goodNewServer, goodNewRoomArray);
        few(socket, goodNewServer, fewGoodNewRoomArray);
        order(socket, goodNewServer);
    });
};
