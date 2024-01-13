const express = require('express');

const { createServer } = require('node:http');

const { Server } = require('socket.io');

const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

const server = createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "./html/assets")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const players = {};
let waiting = "";

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
})

app.get('/computer', (req, res) => {
    res.sendFile(__dirname + "/html/computer.html")
})

app.get('/game', (req, res) => {
    res.sendFile(__dirname + "/html/twoPlayer.html")
})

app.get('/multiplayer', (req, res) => {
    res.sendFile(__dirname + "/html/multiplayer.html")
})

io.on('connection', (socket) => {
    socket.on('new-player', (name) => {
        players[socket.id] = { name: name, opponent: "" };
        console.log(waiting);
        if(waiting == "" || waiting == undefined){
            waiting = socket.id;
            players[socket.id].opponent = "";
            io.to(socket.id).emit('waiting');
        }else{
            io.to(socket.id).emit('match',players[waiting].name, waiting, false);
            io.to(waiting).emit('match',players[socket.id].name, socket.id, true);
            players[socket.id].opponent = waiting;
            players[waiting].opponent = socket.id;
            waiting = "";
        }
        console.log(name + ' is joined');
    });

    socket.on('player-turn', (position, id)=>{
        io.to(id).emit('my-turn', position);
    })

    socket.on('player-move',(position, toid)=>{
        io.to(toid).emit('opponent-move',position);
    })

    socket.on('disconnect', () => {
        if(players[socket.id] != undefined){
            if(players[socket.id].opponent !== ""){
                io.to(players[socket.id].opponent).emit('leave');
            }else waiting = "";
            console.log(players[socket.id].name + ' gone');
            delete players[socket.id];
        }
    });
});

server.listen(port, console.log(`Server Listening on: http://localhost:${port}`));