const express = require('express');
const { createServer } = require('http');
const path = require('path');
const {WebSocket, WebSocketServer } = require('ws');
const { login, signup } = require('./login-signup');

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, './html/assets')));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

wss.on('connection', (ws) => {
    ws.on('error', console.error);
    console.log('Someone Joining');
    ws.on('message', (message) => {
        try {
            console.log(message);            
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});

function findClientByUserId(userId) {
    return wss.clients.find((client) => client.userId === userId);
}

app.chat

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login-signup.html');
});

app.get('/chat',(req,res) => {
    res.sendFile(__dirname + "/html/chat.html")
})

app.post('/login', login);
app.post('/signup', signup);

server.listen(port, () => {
    console.log(`Server Listening on: http://localhost:${port}`);
});
