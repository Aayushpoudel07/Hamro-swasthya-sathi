const { Users } = require("../models");
// landing page
exports.index = async (req, res) => {
    try {
        res.render('frontend/index');
    } catch (error) {
        res.status(500).send("Error");
    }
};



// about page
exports.about = async (req, res) => {
    try {
        res.render('frontend/about');
    } catch (error) {
        console.log(error)
        res.status(500).send("Error");
    }
};

// doctors page
exports.doctors = async (req, res) => {
    try {
        const doctors = await Users.findAll({ where: { role: 'doctor' } });
        res.render('frontend/doctors', { doctors });
    } catch (error) {
        res.status(500).send("Error");
    }
};

// doctor details page
exports.doctorDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Users.findOne({ where: { id, role: 'doctor' } });

        if (!doctor) {
            return res.status(404).send("Doctor not found");
        }

        res.render('frontend/doctorDetails', { doctor });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching doctor details");
    }
};