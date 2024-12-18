import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  Paper,
  CircularProgress
} from '@mui/material';
import { MessageSquare } from 'lucide-react';

// Configure axios base URL and timeout
axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.timeout = 5000; // 5 seconds timeout

interface TestResponse {
  success: boolean;
  messageId?: string;
  message?: string;
  error?: string;
  code?: string;
  details?: {
    from?: string;
    to?: string;
    messageContent?: string;
    status?: string;
    dateCreated?: string;
  };
  moreInfo?: string;
}

const TestSMS: React.FC = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<TestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check server status on component mount
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      await axios.get('/health');
      setServerStatus('online');
    } catch (error) {
      console.error('Server health check failed:', error);
      setServerStatus('offline');
    }
  };

  const sendTestSMS = async () => {
    if (serverStatus === 'offline') {
      setResult({
        success: false,
        error: 'Server is offline. Please try again later.',
        code: 'SERVER_OFFLINE'
      });
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post('/api/test/send-test-sms', {
        message: message || 'Hello! This is a test message from your banking app. 🏦'
      });

      const data: TestResponse = response.data;
      setResult(data);
    } catch (error: any) {
      console.error('Error details:', error);
      
      // Handle different types of errors
      if (error.code === 'ERR_NETWORK') {
        setResult({
          success: false,
          error: 'Cannot connect to server. Please check if the server is running.',
          code: 'CONNECTION_ERROR'
        });
      } else {
        setResult({
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to send SMS',
          code: error.response?.data?.code,
          moreInfo: error.response?.data?.moreInfo
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SMS Test Page
        </Typography>
        
        {/* Server Status Indicator */}
        {serverStatus === 'checking' ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            Checking server status...
          </Alert>
        ) : serverStatus === 'offline' ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            Server is offline. Please check if the server is running on port 5001.
          </Alert>
        ) : (
          <Alert severity="success" sx={{ mb: 3 }}>
            Server is online and ready to send messages.
          </Alert>
        )}

        <Typography variant="body1" gutterBottom>
          Enter your message below and click the button to send a test SMS to your configured number.
        </Typography>

        <Box sx={{ my: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Message Content"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={serverStatus === 'offline'}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={sendTestSMS}
            disabled={loading || serverStatus === 'offline'}
            startIcon={loading ? <CircularProgress size={20} /> : <MessageSquare size={20} />}
            sx={{ mb: 3 }}
          >
            {loading ? 'SENDING...' : 'SEND TEST SMS'}
          </Button>
        </Box>

        {result && (
          <Alert 
            severity={result.success ? 'success' : 'error'}
            sx={{ mt: 2 }}
          >
            {result.success ? (
              <>
                <Typography variant="body1">
                  SMS sent successfully!
                </Typography>
                {result.messageId && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Message ID: {result.messageId}
                  </Typography>
                )}
                {result.details?.status && (
                  <Typography variant="body2">
                    Status: {result.details.status}
                  </Typography>
                )}
              </>
            ) : (
              <>
                <Typography variant="body1">
                  {result.error}
                </Typography>
                {result.code && (
                  <Typography variant="body2">
                    Error Code: {result.code}
                  </Typography>
                )}
                {result.moreInfo && (
                  <Typography variant="body2">
                    More Info: {result.moreInfo}
                  </Typography>
                )}
              </>
            )}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default TestSMS;
