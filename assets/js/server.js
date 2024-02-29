// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Use environment variable for email address
    pass: process.env.GMAIL_PASS   // Use environment variable for password
  }
});

// Route for handling form submission
app.post('/submit-form', (req, res) => {
  // Get form data from request body
  const formData = req.body;

  // Send email notification
  sendEmail(formData);

  // Respond with success message
  res.status(200).json({ message: 'Reservation submitted successfully! We will contact you shortly.' });
});

// Function to send email notification
function sendEmail(formData) {
  // Get the client's email address from the form data
  const clientEmail = formData.email;

  // Construct email message
  let mailOptions = {
    from: process.env.GMAIL_USER,   // Sender address
    to: clientEmail,                // Recipient address (client's email address)
    subject: 'New Reservation',     // Subject line
    text: `New reservation details:\n\nName: ${formData.name}\nPhone: ${formData.phone}\n...`  // Email body
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
