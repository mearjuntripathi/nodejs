const express = require('express');

const { createServer } = require('node:http');

const { Server } = require('socket.io');

const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

const server = createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "/html/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
})

app.get('/computer', (req, res) => {
    res.sendFile(__dirname + "/html/computer.html")
})

app.get('/game', (req, res) => {
    res.sendFile(__dirname + "/html/game.html")
})

app.get('/multiplayer', (req, res) => {
    res.sendFile(__dirname + "/html/multiplayer.html")
})

io.on('connection', (socket) => {
    socket.on('new-player', () => {
        console.log('play');
    })

    socket.on('disconnect', () => {
        console.log('gone');
    });
});

server.listen(port, console.log(`Server Listening on: http://localhost:${port}`));