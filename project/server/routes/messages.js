import express from 'express';
import { sendSMS, generateSpecialDayMessage } from '../controllers/messageController.js';
import twilioClient from '../config/twilio.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Mock data for messages
const messages = [
    {
        id: '1',
        clientId: 'C001',
        clientName: 'Ramesh Kumar',
        isRural: true,
        type: 'birthday',
        language: 'hindi',
        content: {
            hindi: 'जन्मदिन की हार्दिक शुभकामनाएं रमेश जी! 🎉 आपके जीवन में खुशियाँ और समृद्धि बनी रहे। हमारी सेवाओं पर विश्वास करने के लिए धन्यवाद। आपके लिए विशेष कृषि योजनाएं और ग्रामीण बैंकिंग सुविधाएं उपलब्ध हैं।',
            english: 'Happy Birthday Ramesh Ji! 🎉 May your life be filled with happiness and prosperity. Thank you for trusting our services. Special agricultural schemes and rural banking facilities are available for you.',
            regional: 'शुभ जन्मदिवस रमेश जी! 🎉 तुमच्या आयुष्यात आनंद आणि समृद्धी नांदो. आमच्या सेवांवर विश्वास ठेवल्याबद्दल धन्यवाद. तुमच्यासाठी विशेष कृषी योजना आणि ग्रामीण बँकिंग सुविधा उपलब्ध आहेत.'
        },
        status: 'pending',
        scheduledDate: '2024-12-15'
    },
    {
        id: '2',
        clientId: 'C002',
        clientName: 'Priya Sharma',
        isRural: false,
        type: 'anniversary',
        language: 'english',
        content: {
            hindi: 'प्रिया जी, आपके खाते की वर्षगांठ की हार्दिक शुभकामनाएं! 🎊 आपके साथ व्यवसायिक संबंधों के एक साल पूरे होने पर हम गौरवान्वित हैं। आपके लिए विशेष निवेश योजनाएं और प्रीमियम बैंकिंग सेवाएं उपलब्ध हैं।',
            english: 'Dear Priya, Happy Account Anniversary! 🎊 We are proud to complete one year of business relationship with you. Special investment plans and premium banking services are available for you.',
            regional: 'प्रिय प्रिया, खात्याच्या वर्धापन दिनाच्या हार्दिक शुभेच्छा! 🎊 तुमच्याशी व्यावसायिक संबंध एक वर्ष पूर्ण झाल्याबद्दल आम्हाला अभिमान आहे. तुमच्यासाठी विशेष गुंतवणूक योजना आणि प्रीमियम बँकिंग सेवा उपलब्ध आहेत.'
        },
        status: 'pending',
        scheduledDate: '2024-12-20'
    },
    {
        id: '3',
        clientId: 'C003',
        clientName: 'Mohan Singh',
        isRural: true,
        type: 'birthday',
        language: 'regional',
        content: {
            hindi: 'मोहन जी, जन्मदिन की ढेर सारी शुभकामनाएं! 🎂 आपके कृषि व्यवसाय में उन्नति हो और फसल अच्छी हो। हमारी ग्रामीण बैंकिंग सेवाओं का लाभ उठाएं और विशेष किसान क्रेडिट कार्ड योजना का हिस्सा बनें।',
            english: 'Mohan Ji, Many Happy Returns of the Day! 🎂 May your agricultural business prosper and crops flourish. Take advantage of our rural banking services and be part of our special Kisan Credit Card scheme.',
            regional: 'मोहन जी, वाढदिवसाच्या हार्दिक शुभेच्छा! 🎂 तुमचा शेती व्यवसाय भरभराटीस येवो आणि पीक चांगले येवो. आमच्या ग्रामीण बँकिंग सेवांचा लाभ घ्या आणि विशेष किसान क्रेडिट कार्ड योजनेचा भाग व्हा.'
        },
        status: 'pending',
        scheduledDate: '2024-12-14'
    },
    {
        id: '4',
        clientId: 'C004',
        clientName: 'Anjali Mehta',
        isRural: false,
        type: 'anniversary',
        language: 'english',
        content: {
            hindi: 'अंजलि जी, खाता वर्षगांठ की शुभकामनाएं! ✨ आपके व्यवसाय की सफलता में हमारा योगदान रहे, यही कामना है। आपके लिए विशेष कॉर्पोरेट बैंकिंग सुविधाएं और प्रीमियम क्रेडिट कार्ड ऑफर उपलब्ध हैं।',
            english: 'Dear Anjali, Happy Account Anniversary! ✨ We wish to continue contributing to your business success. Special corporate banking facilities and premium credit card offers are available for you.',
            regional: 'प्रिय अंजली, खात्याच्या वर्धापन दिनाच्या शुभेच्छा! ✨ तुमच्या व्यवसायाच्या यशात आमचा सहभाग राहो ही इच्छा. तुमच्यासाठी विशेष कॉर्पोरेट बँकिंग सुविधा आणि प्रीमियम क्रेडिट कार्ड ऑफर उपलब्ध आहेत.'
        },
        status: 'pending',
        scheduledDate: '2024-12-16'
    }
];

// Get all messages
router.get('/', (req, res) => {
    res.json(messages);
});

// Get message by client ID
router.get('/:clientId', (req, res) => {
    const { clientId } = req.params;
    const message = messages.find(msg => msg.clientId === clientId);
    
    if (message) {
        // Return existing message
        res.json(message);
    } else {
        // Return null if no message found - frontend will generate a new one
        res.json(null);
    }
});

// Send message
router.post('/send', (req, res) => {
    const { clientId, messageId, language } = req.body;
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
        messages[messageIndex].status = 'sent';
        res.json(messages[messageIndex]);
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});

// Create a new message
router.post('/', (req, res) => {
    const { clientId, content, type, scheduledDate } = req.body;
    const newMessage = {
        id: `msg_${Date.now()}`,
        clientId,
        content,
        status: 'pending',
        scheduledDate,
        type
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

// Send SMS for special day
router.post('/send-sms', async (req, res) => {
    const { clientId, eventType } = req.body;
    
    // Find client from mock data
    const client = messages.find(day => day.clientId === clientId);
    if (!client) {
        return res.status(404).json({ error: 'Client not found' });
    }

    // Generate message
    const message = generateSpecialDayMessage(client, eventType);

    // Send SMS
    const result = await sendSMS(client.phone || process.env.TEST_PHONE_NUMBER, message);
    
    if (result.success) {
        res.json({ success: true, messageId: result.messageId });
    } else {
        res.status(500).json({ error: result.error });
    }
});

// Test SMS endpoint
router.post('/test-sms', async (req, res) => {
    const testMessage = "This is a test message from your banking app! 🏦";
    const result = await sendSMS(process.env.TEST_PHONE_NUMBER, testMessage);
    
    if (result.success) {
        res.json({ success: true, messageId: result.messageId });
    } else {
        res.status(500).json({ error: result.error });
    }
});

// Verify phone number
router.post('/verify-phone', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        
        // Create a verification
        const verification = await twilioClient.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({
                to: phoneNumber,
                channel: 'sms'
            });

        res.json({
            success: true,
            status: verification.status
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { phoneNumber, code } = req.body;
        
        // Check verification code
        const verificationCheck = await twilioClient.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({
                to: phoneNumber,
                code: code
            });

        if (verificationCheck.status === 'approved') {
            // Update the TEST_PHONE_NUMBER in .env if verification successful
            const envPath = path.join(process.cwd(), '.env');
            let envContent = fs.readFileSync(envPath, 'utf8');
            envContent = envContent.replace(
                /TEST_PHONE_NUMBER=.*/,
                `TEST_PHONE_NUMBER=${phoneNumber}`
            );
            fs.writeFileSync(envPath, envContent);

            res.json({
                success: true,
                status: 'approved',
                message: 'Phone number verified successfully'
            });
        } else {
            res.json({
                success: false,
                status: verificationCheck.status,
                message: 'Invalid verification code'
            });
        }
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
