const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/', authMiddleware,appointmentController.index);
router.post('/',authMiddleware, appointmentController.store);
router.post('/change-status/:id',authMiddleware, appointmentController.changeStatus);
router.get('/cancel/:id', authMiddleware, appointmentController.cancelAppointment);
router.get('/delete/:id', authMiddleware, appointmentController.deleteAppointment);


module.exports = router;