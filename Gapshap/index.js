const express = require('express')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.static("public"));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

//handle different socket event
io.on('connection', (socket) => {

    socket.broadcast.emit('userAdded', socket.id);

    socket.on('send', data => {
        console.log(data);
        io.to(data.id).emit('receive', data.msg);
    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

// connect to cloud database
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

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/signup", function (req, res) {
    res.render("signup");
});



app.post("/login", function (req, res) {
    let isvalidUser = false
    let mail = req.body.mail;
    let password = req.body.password
    user.find().then((data) => {
        data.forEach(element => {
            if (mail === element.email && password === element.pass) {
                res.render('main', { name: element.name, email: element.email });
            }
        });
    });

});

app.get("/main", (req, res) => {
    res.render('main', { name: "Aniket", email: "ka344057@gmail.com" });
});

app.post("/signup", function (req, res) {
    let nam = req.body.fullname;
    let mail = req.body.mail;
    let date = req.body.date;
    let passw = req.body.password;
    const users = new user({ name: nam, email: mail, dob: date, pass: passw });
    users.save();
    res.redirect("/");
});

app.get("/users", (req, res) => {
    user.find().then((data) => {
        res.send(data);
    });
    
});

server.listen(port, function () {
    console.log(`Listening on port ${port}`);
});