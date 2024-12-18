import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Stack,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const PageContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3)
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3)
}));

const TableContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden'
}));

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  '& th, & td': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    textAlign: 'left'
  },
  '& th': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600
  }
}));

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginTop: theme.spacing(2)
}));

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px'
});

const MessageCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.grey[50]
}));

const MessageContent = styled(CardContent)(({ theme }) => ({
  whiteSpace: 'pre-wrap',
  '& .language-tag': {
    marginBottom: theme.spacing(1)
  }
}));

interface SpecialDay {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  type: 'birthday' | 'anniversary';
  isRural: boolean;
  preferredLanguage: string;
  age: number;
  accountAge: number;
}

interface Message {
  id: string;
  clientId: string;
  clientName: string;
  content: string;
  status: string;
}

const emptySpecialDay: SpecialDay = {
  id: '',
  clientId: '',
  clientName: '',
  date: dayjs().format('YYYY-MM-DD'),
  type: 'birthday',
  isRural: false,
  preferredLanguage: 'english',
  age: 0,
  accountAge: 0
};

const SpecialDay = () => {
  const [specialDays, setSpecialDays] = useState<SpecialDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState<SpecialDay | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    fetchSpecialDays();
  }, []);

  useEffect(() => {
    if (selectedDay) {
      // Set default language based on client type
      const defaultLanguage = selectedDay.isRural ? 'regional' : 'english';
      setSelectedLanguage(defaultLanguage);
      handleGenerateMessage(selectedDay.id, defaultLanguage);
    }
  }, [selectedDay]);

  const fetchSpecialDays = async () => {
    try {
      const response = await fetch('/api/special-days');
      if (!response.ok) throw new Error('Failed to fetch special days');
      const data = await response.json();
      setSpecialDays(data);
    } catch (err) {
      setError('Failed to load special days');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMessage = async (id: string, lang: string) => {
    setMessageLoading(true);
    try {
      const response = await fetch(`/api/special-days/${id}/message?language=${lang}`);
      if (!response.ok) throw new Error('Failed to generate message');
      const data = await response.json();
      setMessage(data.content);
    } catch (err) {
      setError('Failed to generate message');
      console.error(err);
    } finally {
      setMessageLoading(false);
    }
  };

  const handleLanguageChange = (event: any) => {
    const lang = event.target.value;
    setSelectedLanguage(lang);
    if (selectedDay) {
      handleGenerateMessage(selectedDay.id, lang);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <Typography variant="h4" component="h1">
          Special Days
        </Typography>
      </HeaderContainer>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Upcoming Events
          </Typography>
          <Stack spacing={2}>
            {specialDays.map((day) => (
              <Paper
                key={day.id}
                elevation={selectedDay?.id === day.id ? 3 : 1}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  bgcolor: selectedDay?.id === day.id ? 'action.selected' : 'background.paper'
                }}
                onClick={() => setSelectedDay(day)}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  {day.type === 'birthday' ? '🎂' : '💝'}
                  <Box flex={1}>
                    <Typography variant="h6">{day.clientName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {day.type.charAt(0).toUpperCase() + day.type.slice(1)} on {dayjs(day.date).format('MM/DD/YYYY')}
                    </Typography>
                  </Box>
                  <Chip
                    label={day.isRural ? 'Rural' : 'Urban'}
                    color={day.isRural ? 'success' : 'info'}
                    size="small"
                  />
                  <Chip
                    label={day.preferredLanguage}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Message Preview
          </Typography>
          <Paper sx={{ p: 2 }}>
            {selectedDay ? (
              <>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={selectedLanguage}
                    label="Language"
                    onChange={(e) => handleLanguageChange(e)}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="hindi">Hindi</MenuItem>
                    <MenuItem value="regional">Regional</MenuItem>
                  </Select>
                </FormControl>
                
                {messageLoading ? (
                  <Box display="flex" justifyContent="center" p={3}>
                    <CircularProgress size={24} />
                  </Box>
                ) : message ? (
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message}
                  </Typography>
                ) : (
                  <Typography color="text.secondary">
                    Select a language to preview message
                  </Typography>
                )}

                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    disabled={!message}
                  >
                    SEND MESSAGE
                  </Button>
                </Box>
              </>
            ) : (
              <Typography color="text.secondary">
                Select a client to preview their message
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SpecialDay;
