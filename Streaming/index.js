const express = require('express');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, './html/assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/video', (req,res) =>{
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Require Range header");

    }

    const videoPath = "chat2021.mp4";
    const videoSize = fs.statSync("chat2021.mp4").size;

    const chunk_size = 10**6;
    const start = Number(range.replace(/\D/g,""));
    const end = Math.min(start + chunk_size, videoSize-1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, console.log(`Server Listening on: http://localhost:port`));