const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const patientRecordController = require('../controllers/patientRecordController');
// Get all patient records for a specific patient
router.get('/patient/:patientId', authMiddleware, patientRecordController.getPatientRecords);

// Create a new patient record (only authenticated doctors can create records)
router.post('/', authMiddleware, patientRecordController.createPatientRecord);

// Update an existing patient record
router.put('/:id', authMiddleware, patientRecordController.updatePatientRecord);

// Delete a patient record
router.delete('/:id', authMiddleware, patientRecordController.deletePatientRecord);

// Get all patient records for a specific doctor
router.get('/doctor/:doctorId', authMiddleware, patientRecordController.getDoctorRecords);


module.exports = router;
