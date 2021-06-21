const express = require('express');
const app = express();
const http = require('http').Server(app);
const socketIoServer = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', function (res) {
    res.render('index.html');
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