const { group } = require("./group");
const { few } = require("./few");
const { order } = require("./order");

exports.goodNew = (socketIoServer) => {
    // namespaceがGoodNewServerで設定、接続
    const goodNewServer = socketIoServer.of("/gn");
    goodNewServer.on("connection", (socket) => {
        group(socket, goodNewServer);
        few(socket, goodNewServer);
        order(socket, goodNewServer);
    });
};
