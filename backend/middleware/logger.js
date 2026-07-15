const logger = (req, res, next) => {
    console.log(`\n📝 [${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('   Body:', req.body);
    }
    next();
};

module.exports = logger;