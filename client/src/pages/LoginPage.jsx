import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. Import our hook

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- 2. Get the 'login' function from our context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

try {
      // Send the data to your backend's /login endpoint
      const response = await axios.post('/api/auth/login', { // <-- This is the updated line
        email,
        password,
      });

      // 3. On success, call the 'login' function from our context
      // This will save the token and user in state and localStorage
      login(response.data.token, response.data.user);
      
      // 4. Redirect to the homepage
      navigate('/');

    } catch (err) {
      setError(err.response?.data || 'An error occurred.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}