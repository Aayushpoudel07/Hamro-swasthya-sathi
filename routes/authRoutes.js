const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { route } = require('./adminRoutes');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Routes
router.get('/login', authController.login);
router.post('/login', authController.loginNow);
router.get('/register', authController.register);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logout);
router.get('/forgot-password', authController.forgotPassword);
router.post('/forgot-password', authController.forgotPasswordSubmit);
router.post('/reset-password', authController.resetPassword);
router.post('/change-password',authMiddleware, authController.changePassword);
router.post('/update-user',authMiddleware, authController.updateUser);
module.exports = router;
