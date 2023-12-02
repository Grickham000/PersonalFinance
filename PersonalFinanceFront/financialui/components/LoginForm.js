import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const router = useRouter(); // Initialize useRouter
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your Django backend to authenticate the user
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      
      // Assuming your Django backend returns a JWT token
      const token = response.data.access;

      // Store the token in a cookie
      Cookies.set('jwt_token', token);
      console.log('Login successful!');

      // Update the context with the retrieved token
      login(token);

      // Redirect or perform any other actions after successful login
      router.push('/');
    } catch (error) {
      // Handle login error (display error message, etc.)
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
