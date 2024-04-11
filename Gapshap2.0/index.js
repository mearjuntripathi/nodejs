const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { WebSocketServer } = require('ws');
const { login, signup } = require('./models/login-signup');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, './html/assets')));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());

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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login-signup.html');
});

const restrictToLoggedInUser = require('./middleware/auth');

app.get('/chat', restrictToLoggedInUser, (req,res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.sendFile(__dirname + "/html/chat.html");
});

app.post('/login', login);
app.post('/signup', signup);

app.post('/logout', (req,res)=>{
    res.clearCookie('token');
    res.status(200).send({'message': "sucessfully logout"});
});

server.listen(port, () => {
    console.log(`Server Listening on: http://localhost:${port}`);
});
