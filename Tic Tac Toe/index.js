const express = require('express');
const path = require('path')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/HTML/public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/HTML/index.html")
})

app.get('/computer', (req, res) => {
    res.sendFile(__dirname + "/HTML/computer.html")
})

app.get('/game', (req, res) => {
    res.sendFile(__dirname + "/HTML/game.html")
})

app.listen(port, console.log(`Server Listening on: http://localhost:${port}`));
