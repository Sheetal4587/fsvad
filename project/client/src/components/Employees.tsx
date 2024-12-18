import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Employees = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Employees
      </Typography>
      <Paper elevation={3}>
        <Box p={4}>
          <Typography>Employees management content will go here</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Employees;
