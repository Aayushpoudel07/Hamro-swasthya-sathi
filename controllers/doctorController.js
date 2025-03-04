// doctor dashboard
exports.dashboard = async (req, res) => {
    try {
        res.render('doctor/dashboard');
    } catch (error) {
        res.status(500).send("Error");
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
                { model: Users, as: 'user', attributes: ['name', 'email'] }  // Include user's details
            ]
        });

        res.render('doctor/appointment', { appointments });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching appointments");
    }
};