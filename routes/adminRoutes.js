const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const blogController = require('../controllers/blogController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Routes
router.get('/dashboard', authMiddleware,adminMiddleware, adminController.dashboard);
router.get('/hospitals', authMiddleware, adminMiddleware,adminController.hospitals);
router.get('/users', authMiddleware, adminMiddleware,adminController.users);
router.get('/doctors', authMiddleware,adminMiddleware, adminController.doctors);

router.get('/create-doctor', authMiddleware, adminMiddleware,adminController.createDoctor);
router.post('/create-doctor', authMiddleware, adminMiddleware,adminController.createDoctors);
router.get('/appointments', authMiddleware, adminMiddleware,adminController.viewAppointments);

router.get('/blogs', authMiddleware,adminMiddleware, blogController.blogs);
router.get('/create-blog', authMiddleware, adminMiddleware,blogController.createBlog);
router.post('/create-blog', authMiddleware, adminMiddleware,blogController.store);

router.get('/settings', authMiddleware, adminMiddleware,adminController.settings);
module.exports = router;
