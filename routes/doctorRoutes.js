const express = require('express');
const router = express.Router();
const doctorController= require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const doctorMiddleware = require('../middleware/doctorMiddleware');
const patientRecordController = require('../controllers/patientRecordController');

// Routes
router.get('/dashboard', authMiddleware,doctorMiddleware,doctorController.dashboard);
router.get('/appointments', authMiddleware,doctorMiddleware,doctorController.viewAppointments);
router.get('/get-patient-report/:patientId', authMiddleware,doctorMiddleware,patientRecordController.getPatientRecords);

router.get('/settings', authMiddleware, doctorMiddleware,doctorController.settings);

module.exports = router;
