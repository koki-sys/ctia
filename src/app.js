const express = require('express');
const { Controller } = require('./controller/Controller');
const app = express();
const http = require('http').Server(app);
const socketIoServer = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', function (res) {
    res.render('index.html');
});

Controller(socketIoServer);

// ポート番号3000でListening
http.listen(PORT, () => {
    console.log("server listening. Port: " + PORT);
    console.log("server running......");
    console.log("Please Access URL:http://localhost:"+ PORT + "/");
});