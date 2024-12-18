import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Stack,
  LinearProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/material/styles';

// Styled components
const StyledAlert = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  minWidth: '300px',
  maxWidth: '80%',
  zIndex: theme.zIndex.snackbar + 1,
  boxShadow: theme.shadows[6],
  '& .MuiAlert-message': {
    width: '100%'
  },
  '& .MuiAlert-icon': {
    alignItems: 'center'
  }
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1.75)
}));

const TestEmail = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showNotification = (type: 'success' | 'error', title: string, message: string) => {
    setNotification({
      show: true,
      type,
      title,
      message
    });

    // Auto-hide success notifications after 6 seconds
    if (type === 'success') {
      setTimeout(() => {
        setNotification(null);
      }, 6000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/email/send-test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Server response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send email');
      }

      // Clear form and show success
      setFormData({ subject: '', message: '' });
      showNotification('success', 'Success', 'Email sent successfully!');

    } catch (error) {
      console.error('Error sending email:', error);
      setError(error instanceof Error ? error.message : 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Email Test
      </Typography>
      
      <Typography variant="body1" color="textSecondary" paragraph>
        Send a test email to verify your email configuration is working correctly.
      </Typography>

      <Paper elevation={3}>
        <Box p={4}>
          {loading && (
            <Box mb={2}>
              <LinearProgress />
            </Box>
          )}
          
          <Stack spacing={3}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="To Email"
                  value="nandargimadhu@gmail.com"
                  disabled
                />

                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                  disabled={loading}
                />

                {error && (
                  <ErrorMessage>{error}</ErrorMessage>
                )}

                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  >
                    {loading ? 'Sending...' : 'Send Test Email'}
                  </Button>
                </Box>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Paper>

      {notification && notification.show && (
        <StyledAlert
          severity={notification.type}
          icon={notification.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
          onClose={() => setNotification(null)}
        >
          <Typography variant="h6" component="h2">
            {notification.title}
          </Typography>
          {notification.message}
        </StyledAlert>
      )}
    </Box>
  );
};

export default TestEmail;
