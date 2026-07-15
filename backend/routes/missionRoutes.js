const express = require('express');
const { getTodayMissions, getMission } = require('../controllers/missionController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get today's missions (protected)
router.get('/today', authMiddleware, getTodayMissions);
// Get mission by ID (protected)
router.get('/:id', authMiddleware, getMission);

module.exports = router;