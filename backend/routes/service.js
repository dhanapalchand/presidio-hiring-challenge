const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const transporter = require('../mailer');  // Assuming mailer.js exports transporter

// POST send email to customer
router.post('/sendEmail', async (req, res) => {
  const {customerEmail,landbuyer} = req.body;

  try {
    let subject, text;

    
      subject = 'Service Update';
      text = `
        Your service request is accepted:
        Here are your details:
       
      `;
   

    const mailOptions = {
    //   from: landbuyer,
      to: customerEmail,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
