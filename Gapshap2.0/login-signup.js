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


const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && password === user.password) {
            res.status(200).json({ 'message': 'User created successfully'});
        } else {
            res.status(401).json({ 'message': 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server error' });
    }
}

const signup = async(req,res) => {
    console.log(req.body);

    try {
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 'message': 'Email already exists. Please choose a different email.' });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save(); // Save the user without a callback

        res.status(200).send({ 'message': 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ 'message': 'Error creating user' });
    }
}

module.exports = {login,signup};