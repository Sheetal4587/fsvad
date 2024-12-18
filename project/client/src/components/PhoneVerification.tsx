import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1.75)
}));

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSendVerification = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/messages/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await response.json();
      if (data.success) {
        setVerificationSent(true);
      } else {
        throw new Error(data.error || 'Failed to send verification code');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/messages/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, code: otpCode })
      });

      const data = await response.json();
      if (data.success) {
        setVerified(true);
      } else {
        throw new Error(data.message || 'Invalid verification code');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box p={4}>
          <Stack spacing={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              Phone Verification
            </Typography>

            <Typography variant="body1" color="textSecondary" gutterBottom>
              {verified
                ? 'Phone number verified successfully!'
                : 'Enter your phone number to receive a verification code.'}
            </Typography>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!verificationSent) {
                handleSendVerification();
              } else {
                handleVerifyOTP();
              }
            }}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={verificationSent || loading}
                  placeholder="+91XXXXXXXXXX"
                  required
                />

                {verificationSent && !verified && (
                  <TextField
                    fullWidth
                    label="Verification Code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    disabled={loading}
                    required
                  />
                )}

                {error && (
                  <ErrorMessage>{error}</ErrorMessage>
                )}

                {!verified && (
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    >
                      {loading
                        ? 'Processing...'
                        : verificationSent
                        ? 'Verify Code'
                        : 'Send Verification Code'}
                    </Button>
                  </Box>
                )}
              </Stack>
            </form>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default PhoneVerification;
