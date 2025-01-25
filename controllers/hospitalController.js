
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');

// hospital dashboard
exports.dashboard = async (req, res) => {
    try {
        res.render('hospital/dashboard');
    } catch (error) {
        res.status(500).send("Error");
    }
};

// Doctors page
exports.doctors = async (req, res) => {
    try {
        const doctors = await Users.findAll({ where: { role: 'doctor', hospitalId: req.user.id } });
        res.render('hospital/doctors', { doctors });
    } catch (error) {
        res.status(500).send("Error loading doctors page.");
    }
};
// Create doctor page
exports.createDoctor = async (req, res) => {
    try {
        const hospitals = await Users.findAll({
            where: { role: 'hospital', hospitalId: req.user.id }
        });
        res.render('hospital/create-doctor', { hospitals });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading create doctor page.");
    }
};
// create doctors
exports.createDoctors = async (req, res) => {
    try {
        const { name, email, contact, password, role, image, description, address } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const hospitalId = req.user.id;
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
            hospitalId
        });

        res.redirect('/hospital/doctors');

    } catch (error) {
        console.error(error);
        return;
    }
};