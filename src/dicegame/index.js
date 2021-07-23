const { orderController } = require("./controller/orderController");
const { roomController } = require("./controller/roomController");
const { userController } = require("./controller/userController");

exports.diceGame = (socketIoServer) => {
    // 順番を保存する配列
    let orderArray = [];

    // namespaceがdiceGameServerで設定、接続
    const diceGameServer = socketIoServer.of("/dg");
    diceGameServer.on("connection", (socket) => {
        roomController(socket, diceGameServer);
        userController(socket, diceGameServer);
        orderController(socket, diceGameServer, orderArray);
    });
};
