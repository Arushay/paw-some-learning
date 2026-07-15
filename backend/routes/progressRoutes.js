const express = require('express');
const {
    saveMissionProgress,
    getProgress,
    getStars,
    getTodayProgress,
    getStreak
} = require('../controllers/progressController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All progress routes are protected
router.post('/', authMiddleware, saveMissionProgress);
router.get('/', authMiddleware, getProgress);
router.get('/stars', authMiddleware, getStars);
router.get('/today', authMiddleware, getTodayProgress);
router.get('/streak', authMiddleware, getStreak);

module.exports = router;