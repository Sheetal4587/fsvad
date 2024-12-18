import express from 'express';
const router = express.Router();

// Mock data for special days with varied client types and events
const specialDays = [
    {
        id: 'sd1',
        clientId: 'C001',
        clientName: 'Ramesh Kumar',
        date: '2024-12-14',
        type: 'birthday',
        isRural: true,
        preferredLanguage: 'regional',
        age: 45,
        accountAge: 5
    },
    {
        id: 'sd2',
        clientId: 'C002',
        clientName: 'Priya Sharma',
        date: '2024-12-15',
        type: 'anniversary',
        isRural: false,
        preferredLanguage: 'english',
        age: 32,
        accountAge: 10
    },
    {
        id: 'sd3',
        clientId: 'C003',
        clientName: 'Suresh Patel',
        date: '2024-12-16',
        type: 'anniversary',
        isRural: true,
        preferredLanguage: 'regional',
        age: 55,
        accountAge: 15
    },
    {
        id: 'sd4',
        clientId: 'C004',
        clientName: 'Neha Kapoor',
        date: '2024-12-17',
        type: 'birthday',
        isRural: false,
        preferredLanguage: 'english',
        age: 28,
        accountAge: 3
    },
    {
        id: 'sd5',
        clientId: 'C005',
        clientName: 'Geeta Devi',
        date: '2024-12-18',
        type: 'birthday',
        isRural: true,
        preferredLanguage: 'regional',
        age: 60,
        accountAge: 20
    }
];

// Get all special days
router.get('/', (req, res) => {
    // Sort by date
    const sortedDays = [...specialDays].sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(sortedDays);
});

// Get message for a specific special day
router.get('/:id/message', (req, res) => {
    const { id } = req.params;
    const { language = 'english' } = req.query;
    const event = specialDays.find(day => day.id === id);
    
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    // Generate message based on client type, event type, and language
    const messageType = event.type; // 'birthday' or 'anniversary'
    const clientType = event.isRural ? 'rural' : 'urban';
    
    const messages = {
        birthday: {
            rural: {
                english: `Dear ${event.clientName}, Wishing you a very Happy ${event.age}th Birthday! 🎂 Your ${event.accountAge} years of trust in our rural banking services mean a lot to us. We have special agricultural schemes and Kisan Credit Card facilities available for you. May this year bring prosperity to your farming endeavors!`,
                hindi: `प्रिय ${event.clientName} जी, आपको ${event.age}वां जन्मदिन बहुत-बहुत मुबारक हो! 🎂 हमारी ग्रामीण बैंकिंग सेवाओं पर ${event.accountAge} वर्षों से विश्वास करने के लिए धन्यवाद। आपके लिए विशेष कृषि योजनाएं और किसान क्रेडिट कार्ड सुविधाएं उपलब्ध हैं। आपकी खेती में तरक्की का यह साल हो!`,
                regional: `नमस्कार ${event.clientName}, तुम्हाला ${event.age}वा वाढदिवस खूप खूप शुभेच्छा! 🎂 आमच्या ग्रामीण बँकिंग सेवांवर ${event.accountAge} वर्षांपासून विश्वास ठेवल्याबद्दल धन्यवाद. तुमच्यासाठी विशेष कृषी योजना आणि किसान क्रेडिट कार्ड सुविधा उपलब्ध आहेत. या वर्षी तुमच्या शेतीला भरभराट येवो!`
            },
            urban: {
                english: `Dear ${event.clientName}, Happy ${event.age}th Birthday! 🎉 We're honored to be your banking partner for ${event.accountAge} years. Explore our premium banking services, investment options, and exclusive wealth management solutions designed just for you. Here's to another year of financial growth!`,
                hindi: `प्रिय ${event.clientName} जी, आपको ${event.age}वां जन्मदिन मुबारक हो! 🎉 ${event.accountAge} वर्षों से आप हमारे साथ जुड़े हैं, इसके लिए धन्यवाद। हमारी प्रीमियम बैंकिंग सेवाएं, निवेश विकल्प और विशेष धन प्रबंधन समाधान आपके लिए तैयार हैं। आर्थिक विकास का एक और साल मंगलमय हो!`,
                regional: `नमस्कार ${event.clientName}, तुम्हाला ${event.age}वा वाढदिवस खूप खूप शुभेच्छा! 🎉 ${event.accountAge} वर्षांपासून तुम्ही आमच्या बँकेचे ग्राहक आहात, त्याबद्दल धन्यवाद. आमच्या प्रीमियम बँकिंग सेवा, गुंतवणूक पर्याय आणि विशेष संपत्ती व्यवस्थापन समाधाने तुमच्यासाठी तयार आहेत. आर्थिक वृद्धीचे आणखी एक वर्ष मंगलमय होवो!`
            }
        },
        anniversary: {
            rural: {
                english: `Dear ${event.clientName}, Happy ${event.accountAge}th Account Anniversary! 🎊 Thank you for trusting our rural banking services all these years. We continue to offer specialized agricultural loans and Kisan schemes to support your farming needs. Here's to many more years of growth together!`,
                hindi: `प्रिय ${event.clientName} जी, आपके खाते की ${event.accountAge}वीं वर्षगांठ मुबारक हो! 🎊 इतने वर्षों से हमारी ग्रामीण बैंकिंग सेवाओं पर विश्वास करने के लिए धन्यवाद। हम आपकी कृषि आवश्यकताओं के लिए विशेष कृषि ऋण और किसान योजनाएं प्रदान करते रहेंगे। आइए मिलकर और भी तरक्की करें!`,
                regional: `नमस्कार ${event.clientName}, तुमच्या खात्याच्या ${event.accountAge}व्या वर्धापन दिनाच्या हार्दिक शुभेच्छा! 🎊 इतकी वर्षे आमच्या ग्रामीण बँकिंग सेवांवर विश्वास ठेवल्याबद्दल धन्यवाद. आम्ही तुमच्या शेती गरजांसाठी विशेष कृषी कर्जे आणि किसान योजना देत राहू. एकत्र प्रगतीच्या दिशेने आणखी अनेक वर्षे जाऊया!`
            },
            urban: {
                english: `Dear ${event.clientName}, Happy ${event.accountAge}th Account Anniversary! 🎊 We're grateful for your continued trust in our premium banking services. Discover our latest investment opportunities and wealth management solutions tailored for your financial goals. Here's to our growing partnership!`,
                hindi: `प्रिय ${event.clientName} जी, आपके खाते की ${event.accountAge}वीं वर्षगांठ मुबारक हो! 🎊 हमारी प्रीमियम बैंकिंग सेवाओं पर निरंतर विश्वास के लिए धन्यवाद। आपके वित्तीय लक्ष्यों के लिए हमारे नवीनतम निवेश अवसर और धन प्रबंधन समाधान जानें। हमारी साझेदारी और मजबूत हो!`,
                regional: `नमस्कार ${event.clientName}, तुमच्या खात्याच्या ${event.accountAge}व्या वर्धापन दिनाच्या हार्दिक शुभेच्छा! 🎊 आमच्या प्रीमियम बँकिंग सेवांवर सातत्याने विश्वास ठेवल्याबद्दल धन्यवाद. तुमच्या आर्थिक ध्येयांसाठी आमचे नवीन गुंतवणूक पर्याय आणि संपत्ती व्यवस्थापन समाधाने जाणून घ्या. आपले भागीदारी आणखी बळकट होवो!`
            }
        }
    };

    const content = messages[messageType][clientType][language] || messages[messageType][clientType]['english'];

    res.json({
        id: `msg_${event.id}`,
        clientId: event.clientId,
        clientName: event.clientName,
        content: content,
        status: 'pending'
    });
});

// POST new special day
router.post('/', (req, res) => {
    const newSpecialDay = {
        id: `sd${specialDays.length + 1}`,
        ...req.body
    };
    specialDays.push(newSpecialDay);
    res.status(201).json(newSpecialDay);
});

// PUT update special day
router.put('/:id', (req, res) => {
    const index = specialDays.findIndex(day => day.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Special day not found' });
    }
    specialDays[index] = { ...specialDays[index], ...req.body };
    res.json(specialDays[index]);
});

// DELETE special day
router.delete('/:id', (req, res) => {
    const index = specialDays.findIndex(day => day.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Special day not found' });
    }
    specialDays.splice(index, 1);
    res.status(204).send();
});

export default router;
