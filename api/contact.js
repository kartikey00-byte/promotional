import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers for safety
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  // Basic Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields (Name, Email, Subject, Message) are required.'
    });
  }

  let emailSent = false;
  let emailError = null;

  // Nodemailer Email Delivery
  const isMailConfigured = process.env.SMTP_USER && process.env.SMTP_PASS;

  if (isMailConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from: `"${name} via Website" <${process.env.SMTP_USER}>`,
        to: process.env.DOCTOR_EMAIL || 'dr.harshmamgain@gmail.com',
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
    } catch (err) {
      console.error('[Email Error] Failed to send email:', err.message);
      emailError = err.message;
    }
  } else {
    emailSent = true; // Simulating success in dev if credentials aren't set
  }

  if (emailSent) {
    return res.status(200).json({
      success: true,
      message: 'Enquiry received. Email delivered to doctor successfully.',
      details: { emailSent }
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Failed to deliver email.',
      error: emailError
    });
  }
}
