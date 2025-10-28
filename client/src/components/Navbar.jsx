import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. Import our hook

export default function Navbar() {
  const { user, logout } = useAuth(); // <-- 2. Get the 'user' and 'logout' function

  return (
    <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '20px' }}>
        My Medium
      </Link>

      {/* 3. Use the 'user' object to show links conditionally */}
      {user ? (
        <>
          {/* --- Show these links if user IS logged in --- */}
          <Link to="/create" style={{ marginRight: '20px' }}>
            Create Post
          </Link>

          <div style={{ float: 'right' }}>
            <span style={{ marginRight: '15px' }}>Welcome, {user.username}!</span>
            <button onClick={logout} style={{ marginRight: '10px' }}>Logout</button>
          </div>
        </>
      ) : (
        <>
          {/* --- Show these links if user IS NOT logged in --- */}
          <div style={{ float: 'right' }}>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
    </nav>
  );
}   