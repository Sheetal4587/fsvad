import { Client } from '../types/client';

export interface MessageTemplate {
  id: string;
  name: string;
  variants: {
    urban: {
      english: string;
      hindi: string;
    };
    rural: {
      english: string;
      hindi: string;
      regional?: string; // For specific regional languages
    };
  };
  category: 'birthday' | 'anniversary' | 'general';
}

export const messageTemplates: MessageTemplate[] = [
  {
    id: 'birthday',
    name: 'Birthday Wishes',
    variants: {
      urban: {
        english: `Dear {client_name},

Wishing you a very Happy Birthday! 🎉 

On this special day, we want to celebrate not just your birthday but also your remarkable financial journey with us. Your trust in our services means the world to us.

We're pleased to offer you exclusive birthday benefits:
- Complimentary financial review session
- Special investment opportunities
- Personalized wealth management consultation

May this year bring you abundant prosperity and success!

Best regards,
Your Financial Advisor`,
        hindi: `प्रिय {client_name} जी,

जन्मदिन की हार्दिक शुभकामनाएं! 🎉

इस खास दिन पर हम आपको विशेष उपहार देना चाहते हैं:
- निःशुल्क वित्तीय समीक्षा सत्र
- विशेष निवेश अवसर
- व्यक्तिगत धन प्रबंधन परामर्श

आपका यह वर्ष समृद्धि और सफलता से भरा हो!

शुभकामनाओं सहित,
आपका वित्तीय सलाहकार`
      },
      rural: {
        english: `Dear {client_name},

Warmest Birthday Wishes! 🎉 

We are grateful to have you as part of our family. Your trust in us has helped us serve our community better.

On your special day, we would like to offer:
- Free financial planning session at your convenience
- Information about new savings schemes
- Special rural investment programs
- Local language support

May this year bring happiness and prosperity to you and your family!

Best regards,
Your Financial Advisor`,
        hindi: `प्रिय {client_name} जी,

जन्मदिन की ढेर सारी शुभकामनाएं! 🎉

आप हमारे परिवार का हिस्सा हैं, इसके लिए हम आभारी हैं। आपके विश्वास ने हमें समुदाय की बेहतर सेवा करने में मदद की है।

इस खास अवसर पर हम आपको देना चाहते हैं:
- आपकी सुविधा अनुसार नि:शुल्क वित्तीय योजना सत्र
- नई बचत योजनाओं की जानकारी
- विशेष ग्रामीण निवेश कार्यक्रम
- स्थानीय भाषा में सहायता

यह वर्ष आप और आपके परिवार के लिए खुशहाली लेकर आए!

शुभकामनाओं सहित,
आपका वित्तीय सलाहकार`,
        regional: `{regional_template}` // Placeholder for regional language
      }
    },
    category: 'birthday'
  },
  {
    id: 'anniversary',
    name: 'Account Anniversary',
    variants: {
      urban: {
        english: `Dear {client_name},

Congratulations on completing another successful year with us! 🎊

Your journey with us has been truly remarkable. Over the past year, we've seen significant growth in your portfolio, and we're excited about the opportunities ahead.

To celebrate this milestone, we're offering:
- Comprehensive portfolio review
- Exclusive investment opportunities
- Wealth management strategy session
- Special anniversary benefits

Here's to many more years of successful partnership!

Best regards,
Your Financial Advisor`,
        hindi: `प्रिय {client_name} जी,

हमारे साथ एक और सफल वर्ष पूरा करने पर बधाई! 🎊

इस उपलब्धि के उपलक्ष्य में, हम आपको प्रदान कर रहे हैं:
- संपूर्ण पोर्टफोलियो समीक्षा
- विशेष निवेश अवसर
- धन प्रबंधन रणनीति सत्र
- विशेष वर्षगांठ लाभ

आने वाले वर्षों में भी ऐसे ही सफल साझेदारी के लिए शुभकामनाएं!

सादर,
आपका वित्तीय सलाहकार`
      },
      rural: {
        english: `Dear {client_name},

Happy Account Anniversary! 🎊

We're grateful for the trust you've placed in us over the past year. Your success is our success, and we're committed to serving you better.

To mark this special occasion, we're offering:
- Free financial health check-up
- Information about new rural banking schemes
- Special savings programs for farmers
- Doorstep banking services
- Local language support

Thank you for being part of our growing family!

Best regards,
Your Financial Advisor`,
        hindi: `प्रिय {client_name} जी,

खाता वर्षगांठ की हार्दिक शुभकामनाएं! 🎊

पिछले एक वर्ष में आपने हम पर जो विश्वास किया, उसके लिए हम आभारी हैं। आपकी सफलता ही हमारी सफलता है।

इस विशेष अवसर पर, हम आपको दे रहे हैं:
- नि:शुल्क वित्तीय स्वास्थ्य जांच
- नई ग्रामीण बैंकिंग योजनाओं की जानकारी
- किसानों के लिए विशेष बचत कार्यक्रम
- घर-घर बैंकिंग सेवाएं
- स्थानीय भाषा में सहायता

हमारे बढ़ते परिवार का हिस्सा बनने के लिए धन्यवाद!

सादर,
आपका वित्तीय सलाहकार`,
        regional: `{regional_template}` // Placeholder for regional language
      }
    },
    category: 'anniversary'
  },
  {
    id: 'birthday_followup',
    name: 'Birthday Follow-up Call Reminder',
    variants: {
      urban: {
        english: `Important: Schedule priority follow-up call with {client_name} for birthday wishes and complimentary portfolio review. Prepare personalized investment insights and growth opportunities to discuss.`,
        hindi: `महत्वपूर्ण: {client_name} के साथ जन्मदिन की शुभकामनाओं और निःशुल्क पोर्टफोलियो समीक्षा के लिए प्राथमिकता अनुसार फॉलो-अप कॉल शेड्यूल करें। व्यक्तिगत निवेश अंतर्दृष्टि और विकास के अवसरों पर चर्चा करने के लिए तैयार करें।`
      },
      rural: {
        english: `Important: Schedule priority follow-up call with {client_name} for birthday wishes and complimentary financial planning session. Prepare information about new savings schemes and special rural investment programs.`,
        hindi: `महत्वपूर्ण: {client_name} के साथ जन्मदिन की शुभकामनाओं और निःशुल्क वित्तीय योजना सत्र के लिए प्राथमिकता अनुसार फॉलो-अप कॉल शेड्यूल करें। नई बचत योजनाओं और विशेष ग्रामीण निवेश कार्यक्रमों की जानकारी तैयार करें।`
      }
    },
    category: 'birthday'
  },
  {
    id: 'anniversary_followup',
    name: 'Anniversary Follow-up Call Reminder',
    variants: {
      urban: {
        english: `Priority: Schedule anniversary meeting with {client_name} to discuss yearly performance, milestone achievements, and future investment strategies. Prepare detailed portfolio analysis and growth projections.`,
        hindi: `प्राथमिकता: {client_name} के साथ वर्षगांठ बैठक शेड्यूल करें जिसमें वार्षिक प्रदर्शन, मील के पत्थर की उपलब्धियां और भविष्य की निवेश रणनीतियों पर चर्चा की जाए। विस्तृत पोर्टफोलियो विश्लेषण और विकास के पूर्वानुमान तैयार करें।`
      },
      rural: {
        english: `Priority: Schedule anniversary meeting with {client_name} to discuss yearly performance, milestone achievements, and future investment strategies. Prepare information about new rural banking schemes and special savings programs for farmers.`,
        hindi: `प्राथमिकता: {client_name} के साथ वर्षगांठ बैठक शेड्यूल करें जिसमें वार्षिक प्रदर्शन, मील के पत्थर की उपलब्धियां और भविष्य की निवेश रणनीतियों पर चर्चा की जाए। नई ग्रामीण बैंकिंग योजनाओं और किसानों के लिए विशेष बचत कार्यक्रमों की जानकारी तैयार करें।`
      }
    },
    category: 'anniversary'
  }
];

export const getMessageTemplate = (
  templateId: string,
  clientName: string,
  isRural: boolean,
  language: 'english' | 'hindi' | 'regional' = 'english'
): string => {
  const template = messageTemplates.find(t => t.id === templateId);
  if (!template) {
    return 'Template not found';
  }

  const clientType = isRural ? 'rural' : 'urban';
  let message = template.variants[clientType][language] || template.variants[clientType].english;

  // Replace placeholders
  message = message.replace(/{client_name}/g, clientName);

  return message;
};