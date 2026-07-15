const pool = require('../config/database');

// Get today's missions
const getTodaysMissions = async () => {
    const result = await pool.query(
        'SELECT * FROM missions WHERE day = CURRENT_DATE'
    );
    return result.rows;
};

// Get mission by ID
const getMissionById = async (id) => {
    const result = await pool.query('SELECT * FROM missions WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = {
    getTodaysMissions,
    getMissionById
};