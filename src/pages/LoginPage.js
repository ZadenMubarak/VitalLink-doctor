// // src/pages/LoginPage.js
// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// function LoginPage({ onLogin }) {
//   const navigate = useNavigate();
//   const [isSuperuser, setIsSuperuser] = useState(false);

//   const handleLogin = () => {
//     // Call onLogin with superuser status
//     onLogin(isSuperuser);
//     navigate('/');
//   };

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//       sx={{ bgcolor: '#f4f6f8' }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>
//       <TextField label="Email" variant="outlined" margin="normal" fullWidth />
//       <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />
//       <FormControlLabel
//         control={<Checkbox checked={isSuperuser} onChange={(e) => setIsSuperuser(e.target.checked)} />}
//         label="Login as Superuser"
//       />
//       <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
//         Login
//       </Button>
//       <Typography variant="body2" sx={{ mt: 2 }}>
//         Don’t have an account?{' '}
//         <Link onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
//           Sign Up
//         </Link>
//       </Typography>
//     </Box>
//   );
// }

// export default LoginPage;


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
      const response = await fetch('http://127.0.0.1:5000/login_doctor', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      // 
      //  const response = await fetch('https://5af0-197-184-183-73.ngrok-free.app/login_doctor', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      //   headers: {
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   },
      // });

      // `

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


