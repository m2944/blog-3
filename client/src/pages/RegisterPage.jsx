import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop form from refreshing the page
    setError(null);
    setSuccess(null);

try {
      // Send the data to your backend's /register endpoint
      const response = await axios.post('/api/auth/register', { // <-- This is the updated line
        username,
        email,
        password,
      });
      
      setSuccess(response.data.message); // "User registered successfully!"
      
      // After 2 seconds, redirect them to the login page
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.response?.data.msg || err.response?.data || 'An error occurred.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minlength="6"
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}