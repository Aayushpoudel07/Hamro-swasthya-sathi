const { Appointment, Users } = require("../models");

// Doctor Dashboard
exports.dashboard = async (req, res) => {
    try {
        const doctorId = req.user.id;

        // Count Pending Appointments
        const pendingAppointment = await Appointment.count({
            where: {
                doctorId: doctorId,
                status: 'Pending',
            }
        });

        // Count Approved Appointments
        const approvedAppointment = await Appointment.count({
            where: {
                doctorId: doctorId,
                status: 'Approved',
            }
        });

        // Count Cancelled Appointments
        const cancelAppointment = await Appointment.count({
            where: {
                doctorId: doctorId,
                status: 'Cancelled',  // or your equivalent status for cancelled appointments
            }
        });

        // Count Total Appointments
        const totalAppointment = await Appointment.count({
            where: {
                doctorId: doctorId,
            }
        });

        // appointments
        const appointments = await Appointment.findAll({
            where: {
                doctorId: doctorId, // Filter by the authenticated user's ID
                status: 'Pending',
            },
            include: [
                { model: Users, as: 'user', attributes: ['name', 'email'] }  // Include user's details
            ]
        });

        res.render('doctor/dashboard', {
            pendingAppointment,
            approvedAppointment,
            cancelAppointment,
            totalAppointment,
            appointments
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading dashboard");
    }
};

// View all appointments for admin
exports.viewAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const appointments = await Appointment.findAll({
            where: {
                doctorId: doctorId, // Filter by the authenticated user's ID
            },
            include: [
                { model: Users, as: 'user', attributes: ['name', 'email','id'] }  // Include user's details
            ]
        });

        res.render('doctor/appointment', { appointments });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching appointments");
    }
};

// settings
exports.settings = async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: req.user.id } });
      res.render('doctor/settings', { user });
    } catch (error) {
      res.status(500).send("Error loading settings page.");
    }
  }