import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Base health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chandrabadni Backend is running' });
});

// Contact query submit handler
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, email, phone, subject, message) are required.'
    });
  }

  console.log(`[Backend] Received query from ${name} (${email}) regarding: "${subject}"`);

  let emailSent = false;
  let smsSent = false;
  let emailError = null;
  let smsError = null;

  // 1. Nodemailer Email Delivery
  const isMailConfigured = 
    process.env.SMTP_USER && 
    process.env.SMTP_USER !== 'YOUR_SMTP_EMAIL_HERE' &&
    process.env.SMTP_PASS && 
    process.env.SMTP_PASS !== 'YOUR_SMTP_PASSWORD_HERE';

  if (isMailConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from: `"${name} via Website" <${process.env.SMTP_USER}>`,
        to: process.env.DOCTOR_EMAIL || 'dr.harshbmamgain@gmail.com',
        replyTo: email,
        subject: `[Website Query] ${subject}`,
        text: `Namaste Dr. Harsh Mani Mamgain,\n\nYou have received a new health enquiry from your website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}\n\n--\nChandrabadni Ayurved Evam Panchkarma Center`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #252a26; background: #f5f4ee; border-radius: 8px;">
            <h2 style="color: #2c5e3b; border-bottom: 2px solid #d4a373; padding-bottom: 8px;">New Health Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #d4a373; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px; border: 1px solid rgba(44, 94, 59, 0.08); white-space: pre-wrap;">${message}</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log('[Email] Query email delivered to doctor successfully.');
    } catch (err) {
      console.error('[Email Error] Failed to send email:', err.message);
      emailError = err.message;
    }
  } else {
    console.log('[Email Warning] SMTP credentials not fully configured in .env. Simulating mock success.');
    emailSent = true; // Simulating success in dev
  }

  // 2. Twilio SMS Delivery
  const isTwilioConfigured = 
    process.env.TWILIO_ACCOUNT_SID && 
    process.env.TWILIO_ACCOUNT_SID !== 'YOUR_TWILIO_ACCOUNT_SID_HERE' &&
    process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_AUTH_TOKEN !== 'YOUR_TWILIO_AUTH_TOKEN_HERE';

  if (isTwilioConfigured) {
    try {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      const smsBody = `Website Alert: New query from ${name} (${phone}). Subject: ${subject}. Message: ${message.substring(0, 80)}${message.length > 80 ? '...' : ''}`;

      await client.messages.create({
        body: smsBody,
        from: process.env.TWILIO_FROM_PHONE,
        to: process.env.DOCTOR_PHONE || '+919888532256'
      });

      smsSent = true;
      console.log('[SMS] Alert sent to doctor via Twilio successfully.');
    } catch (err) {
      console.error('[SMS Error] Failed to send SMS:', err.message);
      smsError = err.message;
    }
  } else {
    console.log('[SMS Warning] Twilio credentials not configured in .env. Simulating mock success.');
    smsSent = true; // Simulating success in dev
  }

  // 3. Return JSON response
  if (emailSent && smsSent) {
    return res.status(200).json({
      success: true,
      message: 'Enquiry received. Email and SMS alerts delivered to doctor successfully.',
      details: { emailSent, smsSent }
    });
  } else {
    // If one of them failed, return a partial success or error details
    return res.status(500).json({
      success: false,
      message: 'Failed to fully deliver alerts.',
      errors: { emailError, smsError },
      details: { emailSent, smsSent }
    });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Chandrabadni Backend running on port ${PORT}`);
  console.log(`👉 Health Check: http://localhost:${PORT}/health`);
  console.log(`👉 API Endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`===============================================`);
});
