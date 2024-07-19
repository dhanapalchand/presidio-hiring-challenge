
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suprentify@gmail.com',
    pass: 'mfdt mbdx wutz oxse',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error setting up transporter', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

module.exports = transporter;

