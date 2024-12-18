import twilio from 'twilio';
import nodemailer from 'nodemailer';

class MessagingService {
    constructor() {
        // Initialize Twilio client
        this.twilioClient = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        // Initialize Nodemailer transporter
        this.emailTransporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendSMS(to, message) {
        try {
            const result = await this.twilioClient.messages.create({
                body: message,
                to,
                from: process.env.TWILIO_PHONE_NUMBER
            });
            return { success: true, messageId: result.sid };
        } catch (error) {
            console.error('SMS sending failed:', error);
            return { success: false, error: error.message };
        }
    }

    async sendEmail(to, subject, message) {
        try {
            const result = await this.emailTransporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject,
                text: message,
                html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Special Day Notification</h2>
                    <p>${message}</p>
                    <hr>
                    <p style="color: #666;">This is an automated message from your bank.</p>
                </div>`
            });
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, error: error.message };
        }
    }

    async broadcastMessage(client, message) {
        const results = {
            sms: null,
            email: null
        };

        if (client.phone) {
            results.sms = await this.sendSMS(client.phone, message);
        }

        if (client.email) {
            const subject = client.type === 'birthday' ? 
                'Happy Birthday!' : 
                'Happy Account Anniversary!';
            results.email = await this.sendEmail(client.email, subject, message);
        }

        return results;
    }
}

export default new MessagingService();
