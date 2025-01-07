const express = require('express');
const router = express.Router();
const doctorController= require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/dashboard', authMiddleware,doctorController.dashboard);

module.exports = router;
