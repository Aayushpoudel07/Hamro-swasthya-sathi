const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Appointment, Users, Sequelize } = require("../models");

const genAI = new GoogleGenerativeAI("AIzaSyDb6g9vBPiNs-ea3XbNrV_ERZ7UAu_C0uM");


// user dashboard
exports.dashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.findAll({
      where: {
        userId: userId, // Filter by the authenticated user's ID
      },
      include: [

        { model: Users, as: 'doctor', attributes: ['name', 'email'] }  // Include user's details
      ]
    });

    

        // Count Pending Appointments
        const pendingAppointment = await Appointment.count({
            where: {
                userId: userId,
                status: 'Pending',
            }
        });

        // Count Approved Appointments
        const approvedAppointment = await Appointment.count({
            where: {
                userId: userId,
                status: 'Approved',
            }
        });

        // Count Cancelled Appointments
        const cancelAppointment = await Appointment.count({
            where: {
                userId: userId,
                status: 'Cancelled',  // or your equivalent status for cancelled appointments
            }
        });

        // Count Total Appointments
        const totalAppointment = await Appointment.count({
            where: {
                userId: userId,
            }
        });


    res.render('user/dashboard', { appointments, pendingAppointment,cancelAppointment, totalAppointment,approvedAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

// ai answer
exports.answer = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send("Please enter a question.");
  }

  try {
    const prompt = `
        I need the precautions for the following health problem: ${question}. 
        Just tell me the basic precautions I need to follow before visiting the doctor.
        **Provide your response in valid HTML format. as a text not as code** 
      `;


     // Fetch all available specialties from the database
    const allSpecialties = await Users.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('speciality')), 'speciality']],
      where: { role: 'doctor' }
    });

    // Extract and clean up database specialties
    let dbSpecialties = allSpecialties.map(row => row.speciality.trim());

    const getDoctorPrompt = `
    I need a list of doctors' specialties that can be helpful for the following health problem: ${question}.
    **Provide the top 5 specialties list just with commas separated nothing else that matches the ${dbSpecialties}**.
    `;
    
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const doctors = await model.generateContent(getDoctorPrompt);
    const answer = result.response.text();
    const specialtiesText = doctors.response.text();

    // Parse specialties
    const specialties = specialtiesText.split(",").map(spec => spec.trim()).slice(0, 5); // Get top 5 specialties

    console.log(specialties);
    // Query the database for doctors based on specialties
    const doctorsList = await Users.findAll({
      where: {
        role: 'doctor',
        speciality: {
          [Sequelize.Op.in]: specialties // Match any of the specialties
        }
      },
      limit: 5 // Get the top 5 doctors
    });

    // Prepare the response to send back
    res.json({
      answer,
      doctors: doctorsList.map(doctor => ({
        name: doctor.name,
        speciality: doctor.speciality,
        contact: doctor.contact,
        image: doctor.image,
        email: doctor.email,
        id: doctor.id,
        address: doctor.address
      }))
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};