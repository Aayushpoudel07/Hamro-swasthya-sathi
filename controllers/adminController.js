
const { Users, Appointment } = require('../models');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');

// admin dashboard
exports.dashboard = async (req, res) => {
  try {
    const userCount = await Users.count();
    const doctorCount = await Users.count({ where: { role: 'doctor' } });
    const hospitalCount = await Users.count({ where: { role: 'hospital' } });
    const appointmentCount = await Appointment.count(); 

    const userRegistrations = await Users.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [sequelize.fn('count', sequelize.col('id')), 'count']
      ],
      group: ['month'],
      order: [[sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%Y-%m'), 'ASC']]
    });
    
    // Check the full structure of the data to debug
    console.log(userRegistrations);
    
    // Access the labels and data from the result
    const labels = userRegistrations.map(reg => reg.get('month'));  // Use `get()` to retrieve the value
    const data = userRegistrations.map(reg => reg.get('count'));   // Same here
    
    
    res.render('admin/dashboard', {
      userCount,
      doctorCount,
      hospitalCount,
      appointmentCount,
      labels,
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

// Hospitals page
exports.hospitals = async (req, res) => {
  try {
    const hospitals = await Users.findAll({ where: { role: 'hospital' } });
    res.render('admin/hospitals', { hospitals });
  } catch (error) {
    res.status(500).send("Error loading hospitals page.");
  }
};

// Users page
exports.users = async (req, res) => {
  try {
    const users = await Users.findAll({ where: { role: 'user' } });
    res.render('admin/users', { users });
  } catch (error) {
    res.status(500).send("Error loading users page.");
  }
};
// Doctors page
exports.doctors = async (req, res) => {
  try {
    const doctors = await Users.findAll({ where: { role: 'doctor' } });
    res.render('admin/doctors', { doctors });
  } catch (error) {
    res.status(500).send("Error loading doctors page.");
  }
};

// Create hospital page
exports.createHospital = async (req, res) => {
  try {
    res.render('admin/create-hospital');
  } catch (error) {
    res.status(500).send("Error loading create hospital page.");
  }
};

// Create user page
exports.createUser = async (req, res) => {
  try {
    res.render('admin/create-user');
  } catch (error) {
    res.status(500).send("Error loading create user page.");
  }
};

// create hospitals
exports.createHospitals = async (req, res) => {
  try {
    const { name, email, contact, password, role, image, description, address } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Users.create({
      name,
      email,
      contact,
      password: hashedPassword,
      role,
      image,
      description,
      address,
    });

    res.redirect('/admin/hospitals');

  } catch (error) {
    console.error(error);
    return;
  }
};

// Create doctor page
exports.createDoctor = async (req, res) => {
  try {
    const hospitals = await Users.findAll({
      where: { role: 'hospital' }
    });
    res.render('admin/create-doctor', { hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading create doctor page.");
  }
};


// create doctors
exports.createDoctors = async (req, res) => {
  try {
    const { name, email, contact, password, speciality, role, image, description, address } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Users.create({
      name,
      email,
      contact,
      password: hashedPassword,
      role,
      image,
      description,
      address,
      speciality
    });

    res.redirect('/admin/doctors');

  } catch (error) {
    console.error(error);
    return;
  }
};


// View all appointments for admin
exports.viewAppointments = async (req, res) => {
  try {
      const appointments = await Appointment.findAll({
          include: [
              { model: Users, as: 'doctor', attributes: ['name'] }, // Include doctor's details
              { model: Users, as: 'user', attributes: ['name', 'email'] }  // Include user's details
          ]
      });

      res.render('admin/appointment', { appointments });
  } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching appointments");
  }
};

// settings
exports.settings = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.user.id } });
    res.render('admin/settings', { user });
  } catch (error) {
    res.status(500).send("Error loading settings page.");
  }
}