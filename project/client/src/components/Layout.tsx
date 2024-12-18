import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Paper
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const SideNav = styled(Paper)(({ theme }) => ({
  width: 260,
  minHeight: '100vh',
  borderRadius: 0,
  backgroundColor: '#fff',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 100,
  boxShadow: theme.shadows[1]
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: 260,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
  minHeight: '100vh'
}));

const AppTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.primary.main
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Clients', icon: <PeopleIcon />, path: '/clients' },
  { text: 'Employees', icon: <PersonIcon />, path: '/employees' },
  { text: 'Special Day', icon: <EventIcon />, path: '/special-day' },
  { text: 'Emergency', icon: <WarningIcon />, path: '/emergency' },
  { text: 'Broadcasts', icon: <NotificationsIcon />, path: '/broadcasts' },
  { text: 'Test SMS', icon: <MessageIcon />, path: '/verify-phone' },
  { text: 'Test Email', icon: <EmailIcon />, path: '/' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav elevation={1}>
        <AppTitle variant="h6">
          FinanceApp
        </AppTitle>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    borderLeft: '4px solid #1976d2',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.12)'
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  minWidth: 40 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: location.pathname === item.path ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SideNav>
      <MainContent>
        {children}
      </MainContent>
    </Box>
  );
};

export default Layout;
