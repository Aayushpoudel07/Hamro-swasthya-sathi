const sequelize = require('./db');
const Sequelize = require('sequelize');

const db = {};

// Add Sequelize instance
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Users = require('./user')(sequelize, Sequelize);

// Function to sync all models
db.syncModels = async () => {
  try {
    await db.sequelize.sync({ force: false}); // Use `{ force: true }` to drop and recreate tables
    console.log('All models synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error.message);
  }
};

module.exports = db;
