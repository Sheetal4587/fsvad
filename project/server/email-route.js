import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Verify transporter connection
transporter.verify(function(error, success) {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to send messages');
    }
});

// Send test email endpoint
router.post('/send-test-email', async (req, res) => {
    console.log('Received email request:', req.body);

    try {
        // Validate email configuration
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error('Missing email configuration');
            return res.status(500).json({
                status: 'error',
                message: 'Email configuration is missing'
            });
        }

        const { 
            to,
            subject = 'Test Email from Finance App',
            message = 'This is a test email from your banking app.'
        } = req.body;

        // Validate recipient email
        if (!to) {
            return res.status(400).json({
                status: 'error',
                message: 'Recipient email address is required'
            });
        }

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: subject,
            text: message,
        };

        console.log('Sending email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        // Wait for email to be sent
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', {
            messageId: info.messageId,
            response: info.response
        });
        
        // Set proper headers
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'application/json');

        // Send success response
        return res.status(200).json({ 
            status: 'success',
            message: 'Email sent successfully',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Failed to send test email:', {
            error: error.message,
            stack: error.stack,
            code: error.code
        });
        
        // Send detailed error response
        return res.status(500).json({
            status: 'error',
            message: 'Failed to send email',
            error: error.message,
            code: error.code || 'UNKNOWN_ERROR'
        });
    }
});

export default router;
