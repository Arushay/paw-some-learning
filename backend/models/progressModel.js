const pool = require('../config/database');

// Save completed mission
const saveProgress = async (userId, missionId, stars = 1) => {
    const result = await pool.query(
        `INSERT INTO progress (user_id, mission_id, completed, stars, completed_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id, mission_id) 
         DO UPDATE SET 
             completed = EXCLUDED.completed,
             stars = EXCLUDED.stars,
             completed_at = EXCLUDED.completed_at
         RETURNING *`,
        [userId, missionId, true, stars]
    );
    return result.rows[0];
};

// Get all progress for a user
const getUserProgress = async (userId) => {
    const result = await pool.query(
        `SELECT p.*, m.type, m.content 
         FROM progress p
         JOIN missions m ON p.mission_id = m.id
         WHERE p.user_id = $1
         ORDER BY p.completed_at DESC`,
        [userId]
    );
    return result.rows;
};

// Get total stars earned by a user
const getTotalStars = async (userId) => {
    const result = await pool.query(
        'SELECT SUM(stars) as total_stars FROM progress WHERE user_id = $1 AND completed = true',
        [userId]
    );
    return parseInt(result.rows[0].total_stars) || 0;
};

// Get today's progress
const getTodaysProgress = async (userId) => {
    const result = await pool.query(
        `SELECT p.*, m.type, m.content 
         FROM progress p
         JOIN missions m ON p.mission_id = m.id
         WHERE p.user_id = $1 AND DATE(p.completed_at) = CURRENT_DATE`,
        [userId]
    );
    return result.rows;
};

// Get current learning streak (consecutive days with completions)
const getStreak = async (userId) => {
    const result = await pool.query(
        `SELECT DISTINCT DATE(completed_at) as completion_date
         FROM progress
         WHERE user_id = $1 AND completed = true
         ORDER BY completion_date DESC`,
        [userId]
    );
    
    if (result.rows.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const row of result.rows) {
        const completionDate = new Date(row.completion_date);
        completionDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((currentDate - completionDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === streak) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    return streak;
};

const getRecentActivity = async (userId, limit = 5) => {
    const result = await pool.query(
        `SELECT p.*, m.type, m.content
         FROM progress p
         JOIN missions m ON p.mission_id = m.id
         WHERE p.user_id = $1 AND p.completed = true
         ORDER BY p.completed_at DESC
         LIMIT $2`,
        [userId, limit]
    );
    return result.rows;
};

module.exports = {
    saveProgress,
    getUserProgress,
    getTotalStars,
    getTodaysProgress,
    getStreak,
     getRecentActivity  
};