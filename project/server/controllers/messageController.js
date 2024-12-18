import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (phoneNumber, message) => {
    try {
        const result = await twilioClient.messages.create({
            body: message,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        return { success: true, messageId: result.sid };
    } catch (error) {
        console.error('SMS sending failed:', error);
        return { success: false, error: error.message };
    }
};

export const generateSpecialDayMessage = (client, eventType) => {
    const isRural = client.isRural;
    const name = client.clientName;
    
    if (eventType === 'birthday') {
        return isRural
            ? `नमस्कार ${name}, जन्मदिन की हार्दिक शुभकामनाएं! 🎂 आपके कृषि व्यवसाय में उन्नति हो। हमारी ग्रामीण बैंकिंग सेवाओं का लाभ उठाएं।`
            : `Dear ${name}, Happy Birthday! 🎂 We value your trust in our services. Check out our premium banking solutions designed for you.`;
    } else {
        return isRural
            ? `नमस्कार ${name}, खाता वर्षगांठ की शुभकामनाएं! 🎊 हमारी ग्रामीण बैंकिंग सेवाओं पर विश्वास के लिए धन्यवाद।`
            : `Dear ${name}, Happy Account Anniversary! 🎊 Thank you for your continued trust in our premium banking services.`;
    }
};
