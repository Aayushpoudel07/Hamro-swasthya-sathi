const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

// Routes
router.get('/dashboard', authMiddleware,hospitalController.dashboard);

module.exports = router;