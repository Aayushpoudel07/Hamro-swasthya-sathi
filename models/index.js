const sequelize = require('./db');
const Sequelize = require('sequelize');

const db = {};

// Add Sequelize instance
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Users = require('./user')(sequelize, Sequelize);
db.Appointment = require('./appointment')(sequelize, Sequelize);
db.Blog = require('./blog')(sequelize, Sequelize);
db.PatientRecord = require('./patientRecords')(sequelize, Sequelize);

// Define relations
db.Users.hasMany(db.Appointment, { foreignKey: 'userId', as: 'appointments' });
db.Users.hasMany(db.Appointment, { foreignKey: 'doctorId', as: 'appointmentsAsDoctor' });
db.Appointment.belongsTo(db.Users, { foreignKey: 'userId', as: 'user' });
db.Appointment.belongsTo(db.Users, { foreignKey: 'doctorId', as: 'doctor' });

db.Users.hasMany(db.PatientRecord, { foreignKey: 'patientId', as: 'patientRecords' });
db.PatientRecord.belongsTo(db.Users, { foreignKey: 'patientId', as: 'patient' });
db.Users.hasMany(db.PatientRecord, { foreignKey: 'doctorId', as: 'doctorRecords' });
db.PatientRecord.belongsTo(db.Users, { foreignKey: 'doctorId', as: 'doctor' });

//  Define syncModels 
const syncModels = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('All models synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error.message);
  }
};

module.exports = { ...db, syncModels };
