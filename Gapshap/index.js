
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const io=require('socket.io')(4000,{cors: {
    origin: '*',
  }});



mongoose.connect("mongodb+srv://admin-aniket:Test123@cluster0.bikic.mongodb.net/userDB");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: String,
    pass: String

});
const user = mongoose.model('user', userSchema);

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.get("/main", function (req, res) {
    res.sendFile(__dirname + "/html/main.html");
    io.on('connection', (socket) => {
        console.log('connected');
    })
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html/login.html");
});

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/html/signup.html");
});

app.get("/chat", function (req, res) {
    res.sendFile(__dirname + "/html/main.html");
});


const users={};

io.on('connection',socket=>{
    console.log("New User Joined");
    socket.on('send',data=>{
        console.log(data);
        socket.broadcast.emit('receive',data);
    })
});


app.post("/login", function (req, res) {
    console.log(req.body.mail);
    console.log(req.body.password)
})

app.post("/signup", function (req, res) {
    let nam = req.body.fullname;
    let mail = req.body.mail;
    let date = req.body.date;
    let passw = req.body.password;
    const users = new user({ name: nam, email: mail, dob: date, pass: passw });
    users.save();
    res.redirect("/");
})



app.listen(3000, function () {
    console.log("server is running on port http://localhost:3000");
})