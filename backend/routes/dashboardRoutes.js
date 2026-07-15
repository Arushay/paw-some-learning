const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
    getTotalStars,
    getStreak,
    getTodaysProgress,
    getRecentActivity
} = require('../models/progressModel');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        const [totalStars, streak, todayProgress, recentActivity] = await Promise.all([
            getTotalStars(userId),
            getStreak(userId),
            getTodaysProgress(userId),
            getRecentActivity(userId, 5)
        ]);

        res.json({
            totalStars,
            streak,
            todayProgress,
            recentActivity
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Failed to load dashboard' });
    }
});

module.exports = router;