const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');
const blogController = require('../controllers/blogController');

// Routes
router.get('/', frontendController.index);
router.get('/about', frontendController.about);
router.get('/list', frontendController.doctors);
router.get('/list/:id', frontendController.doctorDetails);
router.get('/contact', frontendController.contact);
router.post('/search',frontendController.search);
router.post('/contact/send', frontendController.contactFormSubmit);
router.get('/blogs', blogController.index);

module.exports = router;
