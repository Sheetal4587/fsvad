import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Clients = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Clients
      </Typography>
      <Paper elevation={3}>
        <Box p={4}>
          <Typography>Clients management content will go here</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Clients;
