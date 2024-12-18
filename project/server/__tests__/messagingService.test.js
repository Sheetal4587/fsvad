import messagingService from '../services/messagingService';

describe('Messaging Service Tests', () => {
    const testClient = {
        id: 'TEST001',
        name: 'Test User',
        phone: process.env.TEST_PHONE_NUMBER || '+1234567890',
        email: process.env.TEST_EMAIL || 'test@example.com',
        type: 'birthday'
    };

    const testMessage = 'This is a test message from your bank! 🎉';

    describe('SMS Tests', () => {
        it('should send SMS successfully', async () => {
            const result = await messagingService.sendSMS(
                testClient.phone,
                testMessage
            );
            expect(result.success).toBe(true);
            expect(result.messageId).toBeDefined();
        });

        it('should handle invalid phone number', async () => {
            const result = await messagingService.sendSMS(
                'invalid-number',
                testMessage
            );
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });

    describe('Email Tests', () => {
        it('should send email successfully', async () => {
            const result = await messagingService.sendEmail(
                testClient.email,
                'Test Subject',
                testMessage
            );
            expect(result.success).toBe(true);
            expect(result.messageId).toBeDefined();
        });

        it('should handle invalid email', async () => {
            const result = await messagingService.sendEmail(
                'invalid-email',
                'Test Subject',
                testMessage
            );
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });

    describe('Broadcast Tests', () => {
        it('should broadcast both SMS and email', async () => {
            const results = await messagingService.broadcastMessage(
                testClient,
                testMessage
            );
            expect(results.sms.success).toBe(true);
            expect(results.email.success).toBe(true);
        });
    });
});
