import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Select, 
  MenuItem, 
  Button, 
  Chip, 
  Grid,
  Container,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Gift, Send, Globe, Phone } from 'lucide-react';

interface Event {
  id: string;
  clientName: string;
  clientId: string;
  date: string;
  type: 'birthday' | 'anniversary';
  isRural: boolean;
  preferredLanguage: 'english' | 'hindi' | 'regional';
}

interface Message {
  id: string;
  clientId: string;
  clientName: string;
  content: {
    english: string;
    hindi: string;
    regional: string;
  };
  status: 'pending' | 'sent';
}

interface CallReminder {
  clientId: string;
  clientName: string;
  eventType: 'birthday' | 'anniversary';
  date: string;
  status: 'pending' | 'completed';
  notes?: string;
}

const generateDefaultMessage = (event: Event): Message['content'] => {
  const eventType = event.type === 'birthday' ? 'Birthday' : 'Anniversary';
  
  // English message for urban clients
  const englishMessage = `Dear ${event.clientName},

${event.type === 'birthday' ? 
  `On your special day, we wish you a very Happy Birthday! 🎂 May your day be filled with joy and wonderful moments.` : 
  `Congratulations on your Wedding Anniversary! 💑 May your journey together be filled with love and prosperity.`}

As our valued ${event.isRural ? 'rural' : 'premium'} banking customer, we appreciate your continued trust in our services. ${
  event.isRural ? 
  'We have specially curated rural banking services and agricultural schemes to support your growth.' :
  'Explore our premium banking services and investment options designed for your financial success.'
}

Best wishes,
Your Financial Partner 🏦`;

  // Hindi message with cultural touches
  const hindiMessage = `प्रिय ${event.clientName},

${event.type === 'birthday' ? 
  `आपके जन्मदिन पर हार्दिक शुभकामनाएं! 🎂 भगवान आपको सदा खुश रखे और सफलता प्रदान करे।` : 
  `आपको शादी की सालगिरह पर हार्दिक बधाई! 💑 आपका वैवाहिक जीवन खुशियों से भरा रहे।`}

${event.isRural ? 
  'एक विशेष ग्रामीण बैंकिंग ग्राहक के रूप में, हम आपकी सेवा करके गौरवान्वित हैं। आपकी उन्नति के लिए हमारे पास विशेष ग्रामीण बैंकिंग सेवाएं और कृषि योजनाएं उपलब्ध हैं।' :
  'एक प्रीमियम बैंकिंग ग्राहक के रूप में, हम आपकी सेवा करके गौरवान्वित हैं। आपकी वित्तीय सफलता के लिए हमारी विशेष बैंकिंग सेवाओं और निवेश योजनाओं का लाभ उठाएं।'}

शुभकामनाओं सहित,
आपका वित्तीय साथी 🏦`;

  // Marathi message with regional touches
  const marathiMessage = `नमस्कार ${event.clientName},

${event.type === 'birthday' ? 
  `तुमच्या वाढदिवसानिमित्त हार्दिक शुभेच्छा! 🎂 तुमचा दिवस आनंदी आणि सुखकर जावो.` : 
  `तुमच्या लग्नाच्या वाढदिवसानिमित्त हार्दिक शुभेच्छा! 💑 तुमचं सांसारिक जीवन सुखसमृद्धीने नांदो.`}

${event.isRural ? 
  'आमचे विशेष ग्रामीण बँकिंग ग्राहक म्हणून, आम्हाला तुमची सेवा करण्यात अभिमान वाटतो. तुमच्या प्रगतीसाठी आमच्याकडे विशेष ग्रामीण बँकिंग सेवा आणि कृषी योजना उपलब्ध आहेत.' :
  'आमचे प्रीमियम बँकिंग ग्राहक म्हणून, आम्हाला तुमची सेवा करण्यात अभिमान वाटतो. तुमच्या आर्थिक यशासाठी आमच्या विशेष बँकिंग सेवा आणि गुंतवणूक योजनांचा लाभ घ्या.'}

शुभेच्छांसह,
तुमचा आर्थिक भागीदा��� 🏦`;

  return {
    english: englishMessage,
    hindi: hindiMessage,
    regional: marathiMessage
  };
};

const SpecialDay = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi' | 'regional'>('english');
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [callReminders, setCallReminders] = useState<CallReminder[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      // Set language based on client's region and preferences
      let defaultLanguage: 'english' | 'hindi' | 'regional';
      
      if (selectedEvent.isRural) {
        defaultLanguage = 'regional'; // Use Marathi for rural clients
      } else {
        defaultLanguage = 'english'; // Use English for urban clients
      }
      
      // Override with client's preferred language if specified
      if (selectedEvent.preferredLanguage) {
        defaultLanguage = selectedEvent.preferredLanguage;
      }
      
      setSelectedLanguage(defaultLanguage);
      
      // Generate message immediately without API call
      const defaultContent = generateDefaultMessage(selectedEvent);
      const newMessage = {
        id: `msg_${Date.now()}`,
        clientId: selectedEvent.clientId,
        clientName: selectedEvent.clientName,
        content: defaultContent,
        status: 'pending'
      };
      setMessage(newMessage);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/special-days');
      setEvents(response.data);
      if (response.data.length > 0) {
        // Automatically select the first event
        const firstEvent = response.data[0];
        setSelectedEvent(firstEvent);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedEvent || !message) return;
    try {
      setLoading(true);
      // Send SMS
      const smsResponse = await axios.post('/api/messages/send-sms', {
        clientId: selectedEvent.clientId,
        eventType: selectedEvent.type
      });

      if (smsResponse.data.success) {
        setMessage(prev => prev ? { ...prev, status: 'sent' } : null);
        setSnackbar({
          open: true,
          message: 'Message sent successfully!',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCallReminder = async () => {
    if (!selectedEvent) return;
    try {
      setLoading(true);
      const reminder: CallReminder = {
        clientId: selectedEvent.clientId,
        clientName: selectedEvent.clientName,
        eventType: selectedEvent.type,
        date: selectedEvent.date,
        status: 'pending',
        notes: `Call client for ${selectedEvent.type} wishes and discuss rural banking services`
      };

      // Send reminder to backend
      const response = await axios.post('http://localhost:5001/api/reminders/create', reminder);

      if (response.data.success) {
        setCallReminders([...callReminders, response.data.data]);
        setSnackbar({
          open: true,
          message: 'Call reminder created successfully!',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error creating call reminder:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create call reminder. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !events.length) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Special Days
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <Stack spacing={2}>
              {events.map((event) => (
                <Card 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  sx={{ 
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-2px)', bgcolor: 'action.hover' },
                    bgcolor: selectedEvent?.id === event.id ? 'primary.light' : 'background.paper',
                    borderLeft: selectedEvent?.id === event.id ? 4 : 0,
                    borderColor: 'primary.main'
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconButton 
                        color={event.type === 'birthday' ? 'primary' : 'secondary'}
                        sx={{ 
                          bgcolor: event.type === 'birthday' ? 'primary.light' : 'secondary.light',
                          '&:hover': { bgcolor: event.type === 'birthday' ? 'primary.light' : 'secondary.light' }
                        }}
                      >
                        <Gift />
                      </IconButton>
                      <Box flexGrow={1}>
                        <Typography variant="h6" color={selectedEvent?.id === event.id ? 'primary' : 'inherit'}>
                          {event.clientName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)} on {new Date(event.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Chip 
                          label={event.isRural ? 'Rural' : 'Urban'} 
                          color={event.isRural ? 'success' : 'info'}
                          size="small"
                          sx={{ fontWeight: 'medium' }}
                        />
                        <Chip 
                          icon={<Globe size={16} />}
                          label={event.preferredLanguage === 'regional' ? 'Marathi' : 
                                event.preferredLanguage.charAt(0).toUpperCase() + event.preferredLanguage.slice(1)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Message Preview
              </Typography>

              {selectedEvent && message && (
                <>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value as 'english' | 'hindi' | 'regional')}
                      label="Language"
                    >
                      <MenuItem value="english">English</MenuItem>
                      <MenuItem value="hindi">Hindi</MenuItem>
                      <MenuItem value="regional">Marathi</MenuItem>
                    </Select>
                  </FormControl>

                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 3, 
                      minHeight: '200px', 
                      bgcolor: 'white',
                      whiteSpace: 'pre-line',
                      fontFamily: 'system-ui',
                      borderRadius: 2,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        bgcolor: selectedEvent.type === 'birthday' ? 'primary.main' : 'secondary.main',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                      {message.content[selectedLanguage]}
                    </Typography>
                  </Paper>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {selectedEvent.isRural && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        startIcon={<Phone />}
                        onClick={handleCreateCallReminder}
                        disabled={loading}
                        sx={{ 
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          mr: 2
                        }}
                      >
                        Create Call Reminder
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<Send />}
                      onClick={handleSendMessage}
                      disabled={loading}
                      sx={{ 
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem'
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Box>

                  {selectedEvent.isRural && callReminders.some(r => r.clientId === selectedEvent.clientId) && (
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        mt: 2, 
                        p: 2, 
                        bgcolor: 'secondary.light',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <Phone size={16} />
                      <Typography variant="body2" color="secondary.dark">
                        Call reminder set for {new Date(selectedEvent.date).toLocaleDateString()}
                      </Typography>
                    </Paper>
                  )}
                </>
              )}

              {!selectedEvent && (
                <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
                  Select a client to preview their personalized message
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Call Reminders Section */}
          {events.some(e => e.isRural) && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone size={20} />
                  Call Reminders for Rural Clients
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {events
                    .filter(event => event.isRural)
                    .map(event => {
                      const reminder = callReminders.find(r => r.clientId === event.clientId);
                      return (
                        <Grid item xs={12} md={6} key={event.id}>
                          <Paper 
                            elevation={1} 
                            sx={{ 
                              p: 2,
                              bgcolor: reminder ? 'secondary.light' : 'background.paper',
                              border: 1,
                              borderColor: 'divider'
                            }}
                          >
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Box>
                                <Typography variant="subtitle1" fontWeight="medium">
                                  {event.clientName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)} on{' '}
                                  {new Date(event.date).toLocaleDateString()}
                                </Typography>
                              </Box>
                              {reminder ? (
                                <Chip 
                                  label="Reminder Set" 
                                  color="secondary" 
                                  size="small"
                                  icon={<Phone size={14} />}
                                />
                              ) : (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<Phone size={14} />}
                                  onClick={() => {
                                    setSelectedEvent(event);
                                    handleCreateCallReminder();
                                  }}
                                >
                                  Set Reminder
                                </Button>
                              )}
                            </Stack>
                          </Paper>
                        </Grid>
                      );
                    })}
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SpecialDay;