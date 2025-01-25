const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes
router.get('/login', authController.login);
router.post('/login', authController.loginNow);
router.get('/register', authController.register);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logout);

module.exports = router;
