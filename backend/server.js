const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const missionRoutes = require('./routes/missionRoutes');
const progressRoutes = require('./routes/progressRoutes');
const logger = require('./middleware/logger');
const dashboardRoutes = require('./routes/dashboardRoutes');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/dashboard', dashboardRoutes);

// Health check
app.get('/ping', (req, res) => {
    res.json({ message: 'pong', time: new Date().toISOString() });
});

// Routes
app.use('/auth', authRoutes);
app.use('/missions', missionRoutes);
app.use('/progress', progressRoutes); 

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Public routes:`);
    console.log(`   POST /auth/register`);
    console.log(`   POST /auth/login`);
    console.log(`   GET  /ping`);
    console.log(`\n🔒 Protected routes:`);
    console.log(`   GET  /missions/today`);
    console.log(`   GET  /missions/:id`);
});