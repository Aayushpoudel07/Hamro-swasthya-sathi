const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/dashboard', authMiddleware, adminController.dashboard);
router.get('/hospitals', authMiddleware, adminController.hospitals);
router.get('/users', authMiddleware, adminController.users);
router.get('/doctors', authMiddleware, adminController.doctors);
router.get('/create-hospital', authMiddleware, adminController.createHospital);
router.post('/create-hospital', authMiddleware, adminController.createHospitals);
router.get('/create-doctor', authMiddleware, adminController.createDoctor);
router.post('/create-doctor', authMiddleware, adminController.createDoctors);
module.exports = router;
