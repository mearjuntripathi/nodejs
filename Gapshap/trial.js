const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin-aniket:Test123@cluster0.bikic.mongodb.net/userDB");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: String,
    pass: String

});

const user = mongoose.model('user', userSchema);
user.find().then((data) => {
    console.log(data);
})