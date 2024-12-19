const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes
router.get('/dashboard', adminController.dashboard);
router.post ('/answer' , adminController.answer);


module.exports = router;
