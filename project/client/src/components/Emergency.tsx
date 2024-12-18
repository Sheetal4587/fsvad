import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Emergency = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Emergency
      </Typography>
      <Paper elevation={3}>
        <Box p={4}>
          <Typography>Emergency management content will go here</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Emergency;
