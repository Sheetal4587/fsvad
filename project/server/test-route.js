import express from 'express';
import { sendSMS } from './services/twilioService.js';

const router = express.Router();

// Test SMS endpoint
router.post('/send-test-sms', async (req, res) => {
  try {
    const { message = 'Hello! This is a test message from your banking app. 🏦' } = req.body;
    
    // Get all verified numbers from environment variables
    const verifiedNumbers = [
      process.env.TEST_PHONE_NUMBER,
      process.env.ADDITIONAL_VERIFIED_NUMBER
    ].filter(Boolean); // Remove any undefined numbers

    // Send SMS to all verified numbers
    const results = await Promise.all(
      verifiedNumbers.map(async (number) => {
        try {
          const result = await sendSMS(number, message);
          return {
            number,
            success: true,
            messageId: result.messageId
          };
        } catch (error) {
          return {
            number,
            success: false,
            error: error.message
          };
        }
      })
    );

    // Check if any messages were sent successfully
    const anySuccess = results.some(result => result.success);
    
    res.json({
      success: anySuccess,
      message: anySuccess ? 'Test SMS sent successfully to verified numbers' : 'Failed to send SMS to any number',
      details: results
    });
  } catch (error) {
    console.error('Error in test SMS route:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send test SMS',
      code: error.code,
      moreInfo: error.moreInfo
    });
  }
});

export default router;
