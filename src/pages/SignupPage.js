// src/pages/SignupPage.js
import React from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Implement signup logic here
    navigate('/login');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ bgcolor: '#f4f6f8' }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField label="Name" variant="outlined" margin="normal" fullWidth />
      <TextField label="Email" variant="outlined" margin="normal" fullWidth />
      <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />
      <Button variant="contained" color="primary" onClick={handleSignup} fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
}

export default SignupPage;
