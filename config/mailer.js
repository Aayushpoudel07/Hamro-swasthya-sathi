const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'hamroswasthyasathi@gmail.com', 
        pass: 'lyem gsdc kuxz mafp'   
    }
});





// Function to send an email
const sendEmail = (to, subject, text, html) => {
    const mailOptions = {
        from: 'hamroswasthyasathi@gmail.com', 
        to: to,                       
        subject: subject,           
        text: text,                   
        html: html                    
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Email sent: ' + info.response);
        })
        .catch(error => {
            console.error('Error sending email: ' + error);
        });
};

module.exports = { sendEmail, transporter };