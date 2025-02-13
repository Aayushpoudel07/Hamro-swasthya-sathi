const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/', authMiddleware,appointmentController.index);
router.post('/',authMiddleware, appointmentController.store);

module.exports = router;