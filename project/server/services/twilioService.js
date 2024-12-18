import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
  try {
    // Format the phone number to ensure it has the country code
    const formattedNumber = to.startsWith('+') ? to : `${process.env.DEFAULT_COUNTRY_CODE}${to}`;

    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedNumber
    });

    console.log('SMS sent successfully:', response.sid);
    return {
      success: true,
      messageId: response.sid
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw {
      success: false,
      error: error.message,
      code: error.code,
      moreInfo: error.moreInfo
    };
  }
}; 