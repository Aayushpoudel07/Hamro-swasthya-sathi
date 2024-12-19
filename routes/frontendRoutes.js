const express = require('express');
const router = express.Router();
const frontendController = require('../controllers/frontendController');

// Routes
router.get('/', frontendController.index);
router.get('/about', frontendController.about);


module.exports = router;
