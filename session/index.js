const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const port = process.env.PORT || 3000;

const app = express();

// MongoDB connection
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
    password: String,
    profile_pic: String
});


const User = mongoose.model('User', userSchema);

// Express middlewares
app.use(express.static(path.join(__dirname, './html/public')));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: './html/public/images/',
    filename: (req, file, cb) => {
        cb(null, req.body.email + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


app.get('/', (req, res) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.sendFile(__dirname + '/html/index.html');
});

app.post('/signup', upload.single('profile_pic'), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 'message': 'Email already exists. Please choose a different email.' });
        }

        const profile_pic = req.file ? req.file.filename : ''; // Get the filename if the file was uploaded

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profile_pic
        });

        await newUser.save(); // Save the user without a callback

        res.status(200).send({ 'message': 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ 'message': 'Error creating user' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.user = user;
            res.status(200).json({ 'message': 'User created successfully'});
        } else {
            res.status(401).json({ 'message': 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal Server error' });
    }
});



app.get('/logout', (req,res) => {
    req.session.destroy();
    res.sendFile(__dirname + '/html/index.html');
})

const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        if (req.session) {
            req.session.destroy();
        }
        return res.redirect('/'); // Redirect to the home page if not authenticated
    }
};

app.get('/home', requireAuth, async (req, res) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    try {
        const userId = req.session.user._id;
        const user = await User.findById(userId);
        if (user) {
            // Read the HTML file
            let html = fs.readFileSync(__dirname + '/html/home.html', 'utf8');

            // Replace placeholders with actual data
            html = html.replace(/{{name}}/g, user.name);
            html = html.replace(/{{email}}/g, user.email);
            html = html.replace(/{{profile_pic}}/g, user.profile_pic);

            // Send the modified HTML to the client
            res.send(html);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// for update data

app.post('/edit', upload.single('profile_pic'), requireAuth, async (req, res) => {
    try {
        const { name, password } = req.body;

        // Assume you have the user's ID, either from session or some other means
        const userId = req.session.user._id;
        const user = await User.findById(userId);
        const profile_pic = req.file ? req.file.filename : user.profile_pic;

        // Hash the new password before updating
        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        // Create an object with the fields you want to update
        const updateFields = {
            name,
            password: hashedPassword, // Use the hashed password here
            profile_pic
        };

        // Use findByIdAndUpdate to update the user's information based on their ID
        const result = await User.findByIdAndUpdate(userId, { $set: updateFields });

        if (result) {
            console.log('User information updated successfully');
            res.redirect('/home');
        } else {
            console.log('User information update failed');
            res.status(500).json({ error: 'Failed to update user information' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

app.listen(port, console.log(`Server Listening on: http://localhost:${port}`));
