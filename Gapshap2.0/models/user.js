const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true }, // Make username unique
    password: String
});


const User = mongoose.model('users', userSchema);

module.exports = User;