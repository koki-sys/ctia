var express = require('express');
var app = express();
var http = require('http').Server(app);
const socketIoServer = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../public/index.html');
});
console.log(__dirname);

const { goodNew } = require("./goodNew/index.js");

goodNew(socketIoServer);

// ポート番号3000でListening
http.listen(PORT, () => {
    console.log("server listening. Port: 3000");
    console.log("server running......");
    console.log("Please Access to http://localhost:3000/goodnew");
});