const {sendEmail} = require("../config/mailer");
const { Appointment, Users } = require("../models");

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
        const { doctorId, name, email, contact, date, time, description } = req.body;

        // Create the appointment
        const newAppointment = await Appointment.create({
            doctorId,
            userId: req.user.id,
            description,
            date,
            time,
            status: "Pending",
            name,
            email,
            contact
        });

        // Email details
        const subjectForAdmin = 'New Appointment Created';
        const textForAdmin = `A new appointment has been booked by ${name}. Details: ${description}`;
        const htmlForAdmin = `
            <h2>New Appointment Created</h2>
            <p>A new appointment has been booked by ${name}.</p>
            <p><strong>Details:</strong> ${description}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;

        const subjectForUser = 'Appointment Confirmation';
        const textForUser = `Your appointment has been booked successfully. Details: ${description}`;
        const htmlForUser = `
            <h2>Appointment Confirmation</h2>
            <p>Your appointment has been successfully booked.</p>
            <p><strong>Details:</strong> ${description}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;

        // Send email to admin
        try {
            const adminEmail = "hamroswasthyasathi@gmail.com"; // Replace with admin email
            await sendEmail(adminEmail, subjectForAdmin, textForAdmin, htmlForAdmin);
        } catch (error) {
            console.error("Error sending email to admin:", error);
        }

        // Send email to the user
        try {
            await sendEmail(email, subjectForUser, textForUser, htmlForUser);
        } catch (error) {
            console.error("Error sending email to user:", error);
        }

        // Respond with success
        res.render('frontend/appointmentConfirmation');
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).send("Error booking appointment");
    }
};

// change status 
exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Fetch the appointment details
        const appointment = await Appointment.findByPk(id);
        const { name, email, doctorId, date, time, description } = appointment;

        // Update the appointment status
        await Appointment.update({ status }, { where: { id } });

        // Email content for admin
        const subjectForAdmin = `Appointment ${status}`;
        const textForAdmin = `The appointment with ${name} has been ${status}.`;
        const htmlForAdmin = `
            <h2>Appointment ${status}</h2>
            <p>The appointment with ${name} has been ${status}.</p>
            <p><strong>Details:</strong> ${description}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;

        // Email content for user
        const subjectForUser = `Your Appointment ${status}`;
        const textForUser = `Your appointment has been ${status}. Details: ${description}`;
        const htmlForUser = `
            <h2>Your Appointment ${status}</h2>
            <p>Your appointment has been ${status}.</p>
            <p><strong>Details:</strong> ${description}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;

        // Send email to admin
        try {
            const adminEmail = "hamroswasthyasathi@gmail.com"; 
            await sendEmail(adminEmail, subjectForAdmin, textForAdmin, htmlForAdmin);
        } catch (error) {
            console.error("Error sending email to admin:", error);
        }

        // Send email to the user
        try {
            await sendEmail(email, subjectForUser, textForUser, htmlForUser);
        } catch (error) {
            console.error("Error sending email to user:", error);
        }

        // Redirect back after sending email
        req.flash('success', 'Status updated successfully!');
        const backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send("Error updating status");
    }
};

// Cancel Appointment API
exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the appointment and check if its status is 'Pending'
        const appointment = await Appointment.findOne({ where: { id } });

        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }

        if (appointment.status !== 'Pending') {
            return res.status(400).send('Only pending appointments can be cancelled');
        }

        // Update the status to 'Cancelled'
        await Appointment.update({ status: 'Cancelled' }, { where: { id } });

        // Get the appointment details and user's email
        const user = await Users.findByPk(appointment.userId);

        // Send cancellation email to user
        const subject = 'Your Appointment Has Been Cancelled';
        const text = `Your appointment scheduled for ${appointment.date} at ${appointment.time} has been cancelled.`;
        const html = `<h2>Your Appointment Has Been Cancelled</h2><p>Your appointment scheduled for ${appointment.date} at ${appointment.time} has been cancelled.</p>`;
        
        await sendEmail(user.email, subject, text, html);

        // Send email to admin notifying about cancellation
        const adminEmail = 'admin@example.com'; // replace with actual admin email
        const adminSubject = 'Appointment Cancelled';
        const adminText = `The following appointment has been cancelled:\n\nDate: ${appointment.date}\nTime: ${appointment.time}\nPatient: ${user.name}\nStatus: Cancelled`;
        const adminHtml = `<h2>Appointment Cancelled</h2><p>The following appointment has been cancelled:</p><p><strong>Date:</strong> ${appointment.date}<br><strong>Time:</strong> ${appointment.time}<br><strong>Patient:</strong> ${user.name}</p>`;

        await sendEmail(adminEmail, adminSubject, adminText, adminHtml);

        // Return response
        req.flash('success', 'Appointment cancelled successfully!');
        const backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).send('Error cancelling appointment');
    }
};

// delete
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        await Appointment.destroy({ where: { id } });
        req.flash('success', 'Appointment deleted successfully!');
        const backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting appointment");
    }
};
