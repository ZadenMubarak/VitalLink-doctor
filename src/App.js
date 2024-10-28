// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Import pages
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Appointment from './pages/Appointment';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    // Check authentication and superuser status from local storage
    const authStatus = localStorage.getItem('isAuthenticated');
    const superuserStatus = localStorage.getItem('isSuperuser');
    setIsAuthenticated(authStatus === 'true');
    setIsSuperuser(superuserStatus === 'true');
  }, []);

  const handleLogin = (isSuperuser) => {
    // Set authentication in local storage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isSuperuser', isSuperuser ? 'true' : 'false');
    setIsAuthenticated(true);
    setIsSuperuser(isSuperuser);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isSuperuser');
    setIsAuthenticated(false);
    setIsSuperuser(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LoginPage onLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
