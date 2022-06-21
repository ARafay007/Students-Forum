const express = require('express');
// const multer = require('multer');
const AuthController = require('../controllers/authentication/authController');
const router = express.Router();
// const upload = multer();

router.post('/signUp', AuthController.SignUp);
router.post('/login', AuthController.login);

module.exports = router;