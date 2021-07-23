exports.patternCheck = (pattern, room, server) => {
    if (typeof pattern != "undefined" || pattern) {
        console.log("送信パターン" + pattern);
        console.log("参加部屋名：" + room);
        server.emit("changeOrder", {
            changePattern: pattern,
        })
    } else {
        server.emit("gameEnd", {});
    }
}