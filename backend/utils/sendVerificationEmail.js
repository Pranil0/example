const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Please verify your email by clicking <a href="${verificationLink}">this link</a>.</p>`,
    });

   
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;  // Important: re-throw error so caller knows
  }
};

module.exports = sendVerificationEmail;
