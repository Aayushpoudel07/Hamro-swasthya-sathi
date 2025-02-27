const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC6k2X_f7zwqUK28jMhLH1AwxhNUx8zC48");


// user dashboard
exports.dashboard = async (req, res) => {
    try {
        res.render('user/dashboard');
    } catch (error) {
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
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    // res.render('user/result', { question, answer });
    res.json({ answer });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
}