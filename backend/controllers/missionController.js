const { getTodaysMissions, getMissionById } = require('../models/missionModel');

// Get today's missions
const getTodayMissions = async (req, res) => {
    try {
        const missions = await getTodaysMissions();
        res.json(missions);
    } catch (error) {
        console.error('Error fetching missions:', error);
        res.status(500).json({ error: 'Failed to fetch missions' });
    }
};

// Get mission by ID
const getMission = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const mission = await getMissionById(id);
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        res.json(mission);
    } catch (error) {
        console.error('Error fetching mission:', error);
        res.status(500).json({ error: 'Failed to fetch mission' });
    }
};

module.exports = {
    getTodayMissions,
    getMission
};