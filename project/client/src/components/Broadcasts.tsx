import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Broadcasts = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Broadcasts
      </Typography>
      <Paper elevation={3}>
        <Box p={4}>
          <Typography>Broadcasts management content will go here</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Broadcasts;
