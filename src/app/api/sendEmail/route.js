// /api/sendEmail/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email, type } = await req.json(); 

  // Create a reusable transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP host
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  // Email content based on type
  const emailContent = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: type === "confirmation" ? "Account Confirmation" : "Payment Receipt",
    text: type === "confirmation"
      ? "Thank you for registering! Please confirm your account."
      : "Your payment has been received successfully.",
    html: type === "confirmation"
      ? "<h1>Account Confirmation</h1><p>Thank you for registering!</p>"
      : "<h1>Payment Receipt</h1><p>Your payment has been received successfully.</p>",
  };

  try {
    await transporter.sendMail(emailContent);
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
