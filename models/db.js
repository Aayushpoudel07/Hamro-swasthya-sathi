const { Sequelize } = require ('sequelize');

// Create Sequelize instance
const sequelize = new sequelize('swasthyaSathi', 'root', '',{
    host: 'localhost',
    dialect: 'mysql', 
    logging: false,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to the MySQL database with Sequelize.'))
  .catch((err) => console.error('Error connecting to the database:', err.message));

module.exports = sequelize;
