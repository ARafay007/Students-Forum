const express = require('express');
const AuthController = require('../controllers/authentication/authController');
const router = express.Router();

router.post('/signUp', AuthController.SignUp);
router.post('/login', AuthController.login);

module.exports = router;