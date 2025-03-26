module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
        
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true  
        },
        tags: {
            type: Sequelize.STRING,
            allowNull: true  // Comma-separated tags (e.g., "health, wellness, fitness")
        },
        status: {
            type: Sequelize.ENUM('draft', 'published'),
            allowNull: false,
            defaultValue: 'draft'
        },
    });

    return Blog;
};
