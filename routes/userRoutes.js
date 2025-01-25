const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/dashboard', authMiddleware,userController.dashboard);
router.post('/answer',authMiddleware, userController.answer);

module.exports = router;