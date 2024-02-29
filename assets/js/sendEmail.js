const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Use environment variable for email address
    pass: process.env.GMAIL_PASS   // Use environment variable for password
  }
});

// Function to send email notification
function sendEmail(formData) {
    // Get the client's email address from the form data
    const clientEmail = formData.get('email');

    // Construct email message
    let mailOptions = {
      from: process.env.GMAIL_USER,   // Sender address
      to: clientEmail,                // Recipient address (client's email address)
      subject: 'New Reservation',     // Subject line
      text: `New reservation details:\n\nName: ${formData.get('name')}\nPhone: ${formData.get('phone')}\n...`  // Email body
    };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Export the sendEmail function
module.exports = sendEmail;
