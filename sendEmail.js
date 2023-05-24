const nodemailer = require("nodemailer");

const sendEmail = async (to) => {
   
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_user,
      pass: process.env.SMTP_PASS
    }
  });

  var mailOptions = {
    from: 'shivam0gupta1@gmail.com',
    to: 'shivamguptaa010@gmail.com',
    subject: 'Thank you for Registration',
    text: `Hey!
  
  Thank you for registering on our platform. We are excited to have you as a member of our community!
  
  If you have any questions or need assistance, feel free to reach out to us.
  
  Best regards,
  Shivam Gupta
  StackFusion`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
   
  };

  module.exports = { sendEmail }





