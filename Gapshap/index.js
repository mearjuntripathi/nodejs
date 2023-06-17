const express=require('express')
const mongoose=require('mongoose');
const bodyparser=require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

app.use(express.static("public"));

const port = process.env.PORT || 3000; 

//handle different socket event
io.on('connection', (socket) => {
    socket.broadcast.emit('userAdded',socket.id);
    
    socket.on('send',data=>{
        console.log(data);
        io.to(data.id).emit('receive',data.msg);
    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

//connect to cloud database
// mongoose.connect("mongodb+srv://admin-aniket:Test123@cluster0.bikic.mongodb.net/userDB");

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
    res.sendFile(__dirname + "/html/main.html");
});

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/html/signup.html");
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


server.listen(port, function () {
    console.log(`Listening on port ${port}`);
});