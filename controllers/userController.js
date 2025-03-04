const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Appointment, Users, Sequelize } = require("../models");

const genAI = new GoogleGenerativeAI("AIzaSyBJxtMkZ6XmfFG46icktPfg3ceNeckIRUY");


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


    res.render('user/dashboard', { appointments });
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

    const getDoctorPrompt = `
    I need a list of doctors' specialties that can be helpful for the following health problem: ${question}.
    **Provide the top 5 specialties list just with commas separated nothing else**.
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