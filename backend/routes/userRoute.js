const express = require('express');
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require('bcrypt');

// Sign up
router.post("/signup", async (req, res) => {
    const { name, phone, email, username, password, isAdmin } = req.body;

    try {
        if (!name || !phone || !email || !username || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existUser) {
            return res.status(400).json({ message: 'Username or Email already exists.' });
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const userAdded = await User.create({
            name,
            phone,
            email,
            username,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        // Respond with success
        res.status(201).json({ message: 'User registered successfully!', user: userAdded });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'User cannot be registered.', error: error.message });
    }
});

// Login after sign up
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username / password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username / password' });
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
        };

        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
