const { group } = require("./group");
const { order } = require("./order");

exports.diceGame = (socketIoServer) => {
    // 順番を保存する配列
    let orderArray = [];

    // namespaceがdiceGameServerで設定、接続
    const diceGameServer = socketIoServer.of("/dg");
    diceGameServer.on("connection", (socket) => {
        group(socket, diceGameServer);
        order(socket, diceGameServer, orderArray);
    });
};
