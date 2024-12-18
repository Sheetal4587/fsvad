import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import TestEmail from './components/TestEmail';
import PhoneVerificationForm from './components/PhoneVerificationForm';
import Layout from './components/Layout';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Employees from './components/Employees';
import SpecialDay from './components/SpecialDay';
import Emergency from './components/Emergency';
import Broadcasts from './components/Broadcasts';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(',')
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TestEmail />} />
            <Route path="/verify-phone" element={<PhoneVerificationForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/special-day" element={<SpecialDay />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/broadcasts" element={<Broadcasts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
