const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');

// Routes
router.get('/', frontendController.index);
router.get('/about', frontendController.about);
router.get('/list', frontendController.doctors);
router.get('/list/:id', frontendController.doctorDetails);
router.get('/contact', frontendController.contact);
router.post('/search',frontendController.search);

module.exports = router;
