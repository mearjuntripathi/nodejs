const express = require('express');

const { createServer } = require('node:http');

const { Server } = require('socket.io');

const path = require('path');
const { log } = require('node:console');

const port = process.env.PORT || 3000;

const app = express();

const server = createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "/html/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
})

app.get('/users', (req, res) => {
    
})

const users = {};

io.on('connection', (socket) => {
    socket.on('new_user_joined', name => {
        users[socket.id] = name;
        console.log(`${name} is connected`);
        socket.broadcast.emit('user_joined', name, socket.id);
    })

    socket.on('send', message => {
        socket.broadcast.emit('message', {message: message, name : users[socket.id]});
    })

    socket.on('target_send', data => {
        const {message, id} = data;
        if(io.sockets.sockets.has(id)){
            io.to(id).emit('personal_message', {message, id : socket.id});
        }else{
            console.log('user not found');
        }
    })

    socket.on('disconnect', () => {
        const disconnectedUserName = users[socket.id];
        delete users[socket.id]; // Remove the user from the users object
        socket.broadcast.emit('user_removed', disconnectedUserName, socket.id);
        console.log(disconnectedUserName+ ' is disconnected');
    });
});

server.listen(port, console.log(`Server Start on http://localhost:${port}`));

