import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Paper elevation={3}>
        <Box p={4}>
          <Typography>Dashboard content will go here</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
