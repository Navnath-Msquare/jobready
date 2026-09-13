const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// ⚠️ EMAIL CONFIGURATION (IMPORTANT) ⚠️
// ==========================================
// Replace with your real Gmail and your 16-digit App Password
const ADMIN_EMAIL = 'komalkhatake50@gmail.com'; 
const APP_PASSWORD = 'YOUR_16_DIGIT_APP_PASSWORD_HERE'; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ADMIN_EMAIL,
        pass: APP_PASSWORD
    }
});

app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, phone, role, education, password } = req.body;

        // 1. Email to User (Registration Success & Password)
        const userMailOptions = {
            from: `"Job Ready Team" <${ADMIN_EMAIL}>`,
            to: email,
            subject: 'Registration Successful! Welcome to Job Ready 🎉',
            text: `Hello ${name},\n\nCongratulations! Your registration with Job Ready is successful! 🚀\n\nYOUR LOGIN CREDENTIALS:\nEmail: ${email}\nPassword: ${password}\n\nLogin here: http://localhost:5500/login.html\n\nBest regards,\nJob Ready Team`
        };

        // 2. Email to Admin (User Details)
        const adminMailOptions = {
            from: `"Job Ready Alerts" <${ADMIN_EMAIL}>`,
            to: ADMIN_EMAIL,
            subject: `New Registration: ${name} (${role})`,
            text: `New user registered!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nRole: ${role}\nEducation: ${education}\nGenerated Password: ${password}`
        };

        // Send both emails
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        res.status(200).json({ success: true, message: 'Emails sent successfully!' });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend Server running at http://localhost:${PORT}`);
    console.log(`Ready to send emails! Please ensure you added your Gmail App Password.`);
});
