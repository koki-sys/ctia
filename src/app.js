const express = require('express');
const app = express();
const http = require('http').Server(app);
const socketIoServer = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', function (res) {
    res.render('index.html');
});

const { goodNew } = require("./goodNew/index.js");
const { diceGame } = require('./dicegame/index.js');
const { nameGame } = require('./namegame/index.js');

goodNew(socketIoServer);
diceGame(socketIoServer);
nameGame(socketIoServer);

// ポート番号3000でListening
http.listen(PORT, () => {
    console.log("server listening. Port: " + PORT);
    console.log("server running......");
    console.log("Please Access URL:http://localhost:"+ PORT + "/");
});