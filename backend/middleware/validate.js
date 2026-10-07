const { body, validationResult } = require('express-validator');

// Validation rules for registration
const validateRegister = [
    body('email')
        .trim()
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail()
        .notEmpty().withMessage('Email is required'),
    
    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .notEmpty().withMessage('Password is required'),
];

// Validation rules for login
const validateLogin = [
    body('email')
        .trim()
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail()
        .notEmpty().withMessage('Email is required'),
    
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required'),
];

// Check for validation errors
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    checkValidation
};