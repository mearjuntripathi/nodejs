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

const users = {};
let waiting = "";

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
    socket.on('new-player', (name) => {
        users[socket.id] = name;
        console.log(waiting);
        if(waiting == "" || waiting == undefined){
            waiting = socket.id;
            io.to(socket.id).emit('waiting');
        }else{
            io.to(socket.id).emit('match',users[waiting], waiting, false);
            io.to(waiting).emit('match',users[socket.id], socket.id, true);
            waiting = "";
        }
        console.log(name + ' is joined');
    });

    socket.on('player-turn', (position, id)=>{
        io.to(id).emit('my-turn', position);
    })

    socket.on('disconnect', () => {
        if(users[socket.id] != undefined){
            console.log(users[socket.id] + ' gone');
            delete users[socket.id];
        }
    });
});

server.listen(port, console.log(`Server Listening on: http://localhost:${port}`));