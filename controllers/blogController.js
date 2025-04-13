const { Blog, Users } = require('../models'); 


// View All Blogs
exports.blogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: {
                model: Users,
                as: 'author',
                attributes: ['name'] 
            },
            order: [['createdAt', 'DESC']]
        });
        res.render('admin/blogs', { blogs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load blogs' });
    }
};

// Create Blog (GET)
exports.createBlog = (req, res) => {
    res.render('admin/create-blog'); 
};

// View All Blogs
exports.doctorBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({where: {authorId: req.user.id}});
        res.render('doctor/blogs', { blogs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load blogs' });
    }
};

// Create Blog (GET)
exports.doctorCreateBlog = (req, res) => {
    res.render('doctor/create-blog'); 
};



// Get all blogs (only published blogs)
exports.index = async (req, res) => {
    try {
        const blogs = await Blog.findAll({ where: { status: 'published' }});
        res.render('frontend/blogs', { blogs }); 
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Create a new blog (default: draft)
exports.store = async (req, res) => {
    try {
        const { title, content,  tags } = req.body;
        const image = req.file ? req.file.filename : null;
        const blog = await Blog.create({ title, content, image, tags,authorId: req.user.id });

        res.redirect('/admin/blogs');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog' });
    }
};


exports.doctorStoreBLog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const image = req.file ? req.file.filename : null;
        const blog = await Blog.create({ title, content, image, tags,authorId: req.user.id });

        res.redirect('/doctor/blogs');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog' });
    }
};


// Update blog
exports.update = async (req, res) => {
    try {
        const { title, content, image, tags } = req.body;
        const blog = await Blog.findByPk(req.params.id);

        await blog.update({ title, content, image, tags });
        res.redirect(`/admin/blogs/${blog.id}`); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog' });
    }
};

// Delete blog
exports.destroy = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        await blog.destroy();
        res.redirect('/admin/blogs'); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
};

// Publish blog
exports.publishBlog = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        await blog.update({ status: 'published' });
        res.redirect('/admin/blogs'); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to publish blog' });
    }
};

// single blog
exports.show = async (req, res) => {
    try {    
        const blog = await Blog.findByPk(req.params.id);
        res.render('frontend/blogDetails', { blog }); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to load blog' });
    }
};
