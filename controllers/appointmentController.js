const { Appointment } = require("../models");

// Appointment page
exports.index = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send("Error loading users page.");
    }
};

// Appointment store
exports.store = async (req, res) => {
    try {
        try {
            const { doctorId, name, email, date, time, description } = req.body;

            await Appointment.create({
                doctorId,
                userId: req.user.id, 
                description,
                date,
                time,
                status: "Pending",
            });

            res.send("Appointment booked successfully!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error booking appointment");
        }
    } catch (error) {
        res.status(500).send("Error loading users page.");
    }
};