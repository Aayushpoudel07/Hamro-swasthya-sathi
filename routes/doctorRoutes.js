const express = require('express');
const router = express.Router();
const doctorController= require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const doctorMiddleware = require('../middleware/doctorMiddleware');
const patientRecordController = require('../controllers/patientRecordController');
const blogController = require('../controllers/blogController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Routes
router.get('/dashboard', authMiddleware,doctorMiddleware,doctorController.dashboard);
router.get('/appointments', authMiddleware,doctorMiddleware,doctorController.viewAppointments);
router.get('/get-patient-report/:patientId', authMiddleware,doctorMiddleware,patientRecordController.getPatientRecords);

router.get('/settings', authMiddleware, doctorMiddleware,doctorController.settings);

router.get('/blogs', authMiddleware, blogController.doctorBlogs);
router.get('/create-blog', authMiddleware, blogController.doctorCreateBlog);
router.post('/create-blog', authMiddleware, uploadMiddleware.single('image'),blogController.doctorStoreBLog);


module.exports = router;
