import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1.75)
}));

const SuccessMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2)
}));

const steps = ['Enter Phone Number', 'Verify OTP'];

const PhoneVerificationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setActiveStep(1);
      } else {
        throw new Error(data.error || 'Failed to send verification code');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleSendVerification}>
            <StyledCard>
              <CardContent>
                <Stack spacing={3}>
                  <Typography variant="h6" gutterBottom>
                    Enter Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={loading}
                    placeholder="+91XXXXXXXXXX"
                    required
                    InputProps={{
                      startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading || !phoneNumber}
                    startIcon={loading ? <CircularProgress size={20} /> : <PhoneIcon />}
                  >
                    {loading ? 'Sending...' : 'Send Verification Code'}
                  </Button>
                </Stack>
              </CardContent>
            </StyledCard>
          </form>
        );

      case 1:
        return (
          <form onSubmit={handleVerifyOTP}>
            <StyledCard>
              <CardContent>
                <Stack spacing={3}>
                  <Typography variant="h6" gutterBottom>
                    Enter Verification Code
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Enter the verification code sent to {phoneNumber}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Verification Code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading || !otpCode}
                    startIcon={loading ? <CircularProgress size={20} /> : <VerifiedIcon />}
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                </Stack>
              </CardContent>
            </StyledCard>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Phone Number Verification
      </Typography>
      
      <Typography variant="body1" color="textSecondary" paragraph>
        Verify a phone number to use it for SMS testing. The number will be automatically saved for future use.
      </Typography>

      <Paper elevation={3}>
        <Box p={4}>
          {!verified ? (
            <>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <ErrorMessage>{error}</ErrorMessage>
              )}

              {renderStepContent(activeStep)}
            </>
          ) : (
            <Box textAlign="center">
              <SuccessMessage variant="h6">
                <VerifiedIcon color="success" />
                Phone number verified successfully!
              </SuccessMessage>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                You can now use this number for SMS testing.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setActiveStep(0);
                  setVerified(false);
                  setPhoneNumber('');
                  setOtpCode('');
                }}
                sx={{ mt: 3 }}
              >
                Verify Another Number
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PhoneVerificationForm;
