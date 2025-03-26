const { Users, Sequelize, Blog } = require("../models");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'hamroswasthyasathi@gmail.com', 
        pass: 'lyem gsdc kuxz mafp'   
    }
});



// Landing Page
exports.index = async (req, res) => {
    try {
        // Fetch 4 random featured doctors
        const doctors = await Users.findAll({
            where: { featured: true, role: 'doctor' },
            order: Sequelize.literal('RAND()'), // MySQL way to get random records
            limit: 4
        });
        const blogs = await Blog.findAll({
            where: { status: 'published' },
            limit: 3
        });

        res.render('frontend/index', { doctors, blogs }); // Pass doctors to the view
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

// Contact form route
exports.contactFormSubmit = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Send email to the admin
        const mailOptions = {
            from: email,
            to: 'poudelayush98@gmail.com', // Admin email address
            subject: 'New Contact Message from ' + name,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send confirmation email to user (optional)
        const userMailOptions = {
            from: 'hamroswasthyasathi@gmail.com',
            to: email,
            subject: 'Thank You for Contacting Us',
            text: `Hello ${name},\n\nThank you for contacting us. We have received your message and will get back to you as soon as possible.`,
            html: `
                <h2>Thank You for Contacting Us</h2>
                <p>Hello ${name},</p>
                <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
            `,
        };

        await transporter.sendMail(userMailOptions);

        // Redirect back to the contact page with a success message
        res.redirect('/contact?message=Your message has been sent successfully!');
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending message.");
    }
};