const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/', blogController.index); // Get all blogs (public)
router.post('/', authMiddleware, blogController.store); // Create a blog (auth required)
router.put('/:id', authMiddleware, blogController.update); // Update a blog (auth required)
router.get('/delete/:id', authMiddleware, blogController.destroy); // Delete a blog (auth required)
router.get('/publish/:id', authMiddleware, blogController.publishBlog); // Publish blog
router.get('/:id', blogController.show);

module.exports = router;
