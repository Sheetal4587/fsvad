import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendTestSMS() {
    try {
        const message = await client.messages.create({
            body: 'Hello! This is a test message from your banking app. 🎉',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.TEST_PHONE_NUMBER
        });

        console.log('Message sent successfully!');
        console.log('Message SID:', message.sid);
    } catch (error) {
        console.error('Error sending message:', error.message);
        if (error.code) {
            console.error('Error code:', error.code);
        }
    }
}

// Run the test
sendTestSMS();
