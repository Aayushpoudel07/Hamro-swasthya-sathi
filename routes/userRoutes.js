const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userMiddleware = require('../middleware/userMiddleware');

// Routes
router.get('/dashboard', authMiddleware,userMiddleware,userController.dashboard);
router.post('/answer',authMiddleware, userController.answer);

module.exports = router;