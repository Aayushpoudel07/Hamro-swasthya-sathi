const { Users, Sequelize } = require("../models");


// Landing Page
exports.index = async (req, res) => {
    try {
        // Fetch 4 random featured doctors
        const doctors = await Users.findAll({
            where: { featured: true, role: 'doctor' },
            order: Sequelize.literal('RAND()'), // MySQL way to get random records
            limit: 4
        });

        res.render('frontend/index', { doctors }); // Pass doctors to the view
    } catch (error) {
        console.error("Error fetching doctors:", error);
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

// search doctors
exports.search = async (req, res) => {
    try {
        const search = req.body.query;
        const doctors = await Users.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${search}%`
                },
                role: 'doctor'
            }
        });
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

// contact page
exports.contact = async (req, res) => {
    try {
        res.render('frontend/contact');
    } catch (error) {
        console.log(error)
        res.status(500).send("Error");
    }
};