const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

// REGISTER
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await createUser(email, hashedPassword);

        res.status(201).json({
            message: 'User created successfully! 🎉',
            user: { id: newUser.id, email: newUser.email }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful! 🐶',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login
};