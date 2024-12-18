import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Snackbar, CircularProgress } from '@mui/material';
import { Mail } from 'lucide-react';

interface TestResponse {
  status: 'success' | 'error';
  message: string;
  messageId?: string;
  error?: string;
  code?: string;
  details?: {
    from?: string;
    to?: string;
    subject?: string;
    accepted?: string[];
    response?: string;
  };
}

const TestEmail: React.FC = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [result, setResult] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendTestEmail = async () => {
    try {
      setLoading(true);
      setResult(null);
      setShowAlert(false);

      const response = await fetch('http://localhost:5001/api/email/send-test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data: TestResponse = await response.json();
      setResult(data);
      setShowAlert(true);
      
      if (!response.ok) {
        throw data;
      }
    } catch (error) {
      console.error('Error details:', error);
      setResult({
        status: 'error',
        message: error.message || 'Failed to send email',
        error: error.error,
        code: error.code
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Email Test Page
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Enter the email details below and click the button to send a test email.
      </Typography>

      <Box sx={{ my: 3 }}>
        <TextField
          fullWidth
          name="to"
          label="To Email"
          variant="outlined"
          value={formData.to}
          onChange={handleChange}
          placeholder="recipient@example.com"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          name="subject"
          label="Subject"
          variant="outlined"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Test Email Subject"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          name="message"
          variant="outlined"
          label="Message Content"
          placeholder="Enter your message here..."
          value={formData.message}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={sendTestEmail}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Mail size={20} />}
          sx={{ minWidth: 200 }}
        >
          {loading ? 'SENDING...' : 'SEND TEST EMAIL'}
        </Button>
      </Box>

      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert}
          severity={result?.status === 'success' ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {result?.message}
          {result?.messageId && (
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              Message ID: {result.messageId}
            </Typography>
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestEmail;
