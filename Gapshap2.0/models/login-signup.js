const {setUser} = require('../services/auth');
const User = require('../models/user');


const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email , password });
        if (user) {
            const token = setUser(user);
            res.cookie("token", token);
            res.status(200).json({ 'message': 'sucessfully Login' });
        } else {
            res.status(401).json({ 'message': 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server error' });
    }
}

const signup = async(req,res) => {
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