const pool = require('../config/database');
const {
    saveProgress,
    getUserProgress,
    getTotalStars,
    getTodaysProgress,
    getStreak: getStreakFromModel
} = require('../models/progressModel');

// Save progress for a mission
const saveMissionProgress = async (req, res) => {
    try {
        const { missionId, stars = 1 } = req.body;
        const userId = req.userId;

        if (!missionId) {
            return res.status(400).json({ error: 'Mission ID is required' });
        }

        // Check if mission exists
        const missionCheck = await pool.query('SELECT id FROM missions WHERE id = $1', [missionId]);
        if (missionCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        const progress = await saveProgress(userId, missionId, stars);
        res.status(201).json({
            message: 'Progress saved! 🌟',
            progress
        });
    } catch (error) {
        console.error('Save progress error:', error);
        res.status(500).json({ error: 'Failed to save progress' });
    }
};

// Get all progress for the user
const getProgress = async (req, res) => {
    try {
        const userId = req.userId;
        const progress = await getUserProgress(userId);
        res.json(progress);
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ error: 'Failed to get progress' });
    }
};

// Get total stars
const getStars = async (req, res) => {
    try {
        const userId = req.userId;
        const totalStars = await getTotalStars(userId);
        res.json({ totalStars });
    } catch (error) {
        console.error('Get stars error:', error);
        res.status(500).json({ error: 'Failed to get stars' });
    }
};

// Get today's progress
const getTodayProgress = async (req, res) => {
    try {
        const userId = req.userId;
        const progress = await getTodaysProgress(userId);
        res.json(progress);
    } catch (error) {
        console.error('Get today progress error:', error);
        res.status(500).json({ error: 'Failed to get today\'s progress' });
    }
};

// Get learning streak
const getStreak = async (req, res) => {
    try {
        const userId = req.userId;
        const streak = await getStreakFromModel(userId);
        res.json({ streak });
    } catch (error) {
        console.error('Get streak error:', error);
        res.status(500).json({ error: 'Failed to get streak' });
    }
};

module.exports = {
    saveMissionProgress,
    getProgress,
    getStars,
    getTodayProgress,
    getStreak
};