const { Appointment } = require("../models");
const nodemailer = require('nodemailer');


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
      const { doctorId, name, email, contact, date, time, description } =
        req.body;
      //Send Mail
      await Appointment.create({
        doctorId,
        userId: req.user.id,
        description,
        date,
        time,
        status: "Pending",
        name,
        email,
        contact,
      });

      // Set up nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hamroswasthyasathi@gmail.com", // Your Gmail email (use environment variable)
          pass: "lyem gsdc kuxz mafp", // Your Gmail app password (use environment variable)
        },
      });

      

      // Email details
      const mailOptions = {
        from:"hamroswasthyasathi@gmail.com",
        to: email,
        subject: "Appointment Confirmation",
        html: `<p>Dear ${name},</p>
                   <p>Your appointment has been successfully booked.</p>
                   <p><strong>Doctor ID:</strong> ${doctorId}</p>
                   <p><strong>Date:</strong> ${date}</p>
                   <p><strong>Time:</strong> ${time}</p>
                   <p><strong>Description:</strong> ${description}</p>
                   <p>We appreciate your trust in our service and look forward to assisting you. If you have any questions or need to reschedule, feel free to contact us.</p>
                   <p>Best regards,</p>
                   <p><strong>Your Healthcare Team</strong></p>`,
                   
                   
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      // res.send("Appointment booked successfully!");
      res.render("frontend/appointmentConfirmation");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error booking appointment");
    }
  } catch (error) {
    res.status(500).send("Error loading users page.");
  }
};
