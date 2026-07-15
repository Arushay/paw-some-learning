// Custom error handler (can be expanded later)
const handleError = (res, error, message = 'Internal server error') => {
    console.error(error);
    res.status(500).json({ error: message });
};

module.exports = {
    handleError
};