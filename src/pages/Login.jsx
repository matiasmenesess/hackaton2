import React, { useState } from 'react';
import { login, getRoleBasedOnToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {jwtDecode }from 'jwt-decode';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.data.token);
      const decodedToken = jwtDecode(response.data.token);      
      localStorage.setItem('userId', decodedToken.userId); // Guarda el userId en el localStorage
      const role = getRoleBasedOnToken();
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
