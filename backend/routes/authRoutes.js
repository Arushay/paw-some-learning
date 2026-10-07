const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin, checkValidation } = require('../middleware/validate');

const router = express.Router();

router.post('/register', validateRegister, checkValidation, register);
router.post('/login', validateLogin, checkValidation, login);

module.exports = router;