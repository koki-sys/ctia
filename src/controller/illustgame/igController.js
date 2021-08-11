exports.igController = (socket, IOserver) => {
    socket.on("realtime-draw", (data) => {
        IOserver.emit("draw", {
            x: data.x,
            y: data.y,
            act: data.act
        });
    })
}