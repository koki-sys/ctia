const express = require("express");
const { Controller } = require("./controller/Controller");
const app = express();
const http = require("http").Server(app);
const path = require('path');
const socketIoServer = require("socket.io")(http);
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
});

Controller(socketIoServer);

// ポート番号3000でListening
http.listen(PORT, () => {
    console.log("server listening. Port: " + PORT);
    console.log("server running......");
    console.log("Please Access URL:http://localhost:" + PORT + "/");
});
