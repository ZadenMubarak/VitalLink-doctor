import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://appoftheyear-439917.nw.r.appspot.com/login_doctor', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isSuperuser', email === 'admin@vitalink.com' ? 'true' : 'false');
        
        navigate('/');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      setError('Failed to login. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"100vh"} sx={{bgcolor: '#f4f6f8'}}>
      <Typography variant="h5" component="h1" gutterBottom>
        Login to VitalLink
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

export default Login;


