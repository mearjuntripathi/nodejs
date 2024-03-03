const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { WebSocketServer } = require('ws');

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, './html/assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (message) => {
        try {
            const { to, content } = JSON.parse(message);
            const targetClient = findClientByUserId(to);

            if (targetClient) {
                targetClient.send(JSON.stringify({ from: ws.userId, content }));
            } else {
                ws.send(JSON.stringify({ error: `User ${to} not found.` }));
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});

function findClientByUserId(userId) {
    return wss.clients.find((client) => client.userId === userId);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/login', login());

app.get('/signup', signup());

server.listen(port, () => {
    console.log(`Server Listening on: http://localhost:${port}`);
});
