const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/dashboard', authMiddleware,hospitalController.dashboard);
router.get('/doctors', authMiddleware, hospitalController.doctors);
router.get('/create-doctor', authMiddleware, hospitalController.createDoctor);
router.post('/create-doctor', authMiddleware, hospitalController.createDoctors);
module.exports = router;