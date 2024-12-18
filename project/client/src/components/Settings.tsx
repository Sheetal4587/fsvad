import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Button
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Settings = () => {
  const [settings, setSettings] = useState({
    updateInterval: 5,
    minPortfolioValue: 100000,
    emailNotifications: true,
    smsNotifications: true,
    autoSendUpdates: true,
    workingHoursOnly: true,
    startTime: dayjs().set('hour', 9).set('minute', 0),
    endTime: dayjs().set('hour', 17).set('minute', 0)
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTimeChange = (time: dayjs.Dayjs | null, field: string) => {
    if (time) {
      setSettings(prev => ({
        ...prev,
        [field]: time
      }));
    }
  };

  const handleSave = () => {
    // TODO: Save settings to backend
    console.log('Saving settings:', settings);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={3}>
        <Box p={4}>
          <Stack spacing={4}>
            {/* Broadcast Preferences */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Broadcast Preferences
              </Typography>
              
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Market Updates
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      label="Update Interval (minutes)"
                      name="updateInterval"
                      type="number"
                      value={settings.updateInterval}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      label="Minimum Portfolio Value (₹)"
                      name="minPortfolioValue"
                      type="number"
                      value={settings.minPortfolioValue}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Stack>
                </Box>

                {/* Communication Channels */}
                <Box>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Communication Channels
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={settings.emailNotifications}
                          onChange={handleChange}
                          name="emailNotifications"
                        />
                      }
                      label="Enable Email Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={settings.smsNotifications}
                          onChange={handleChange}
                          name="smsNotifications"
                        />
                      }
                      label="Enable SMS Notifications"
                    />
                  </FormGroup>
                </Box>

                {/* Automation */}
                <Box>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Automation
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={settings.autoSendUpdates}
                          onChange={handleChange}
                          name="autoSendUpdates"
                        />
                      }
                      label="Automatically Send Market Updates"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={settings.workingHoursOnly}
                          onChange={handleChange}
                          name="workingHoursOnly"
                        />
                      }
                      label="Send Updates Only During Working Hours"
                    />
                  </FormGroup>
                </Box>

                {/* Working Hours */}
                <Box>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Working Hours
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction="row" spacing={2}>
                      <TimePicker
                        label="Start Time"
                        value={settings.startTime}
                        onChange={(newValue) => handleTimeChange(newValue, 'startTime')}
                      />
                      <TimePicker
                        label="End Time"
                        value={settings.endTime}
                        onChange={(newValue) => handleTimeChange(newValue, 'endTime')}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                size="large"
              >
                Save Changes
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
