const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAXlF_KdNfmUp0NWf7Knoua1cf4QVLyh-c"); 


// admin dashboard
exports.dashboard = async (req, res) => {
    try {
        res.render('admin/dashboard');
    } catch (error) {
        res.status(500).send("Error");
    }
};

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
      res.render('admin/result', { question, answer });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error");
    }
  }