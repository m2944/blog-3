
import { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider (a component that will "wrap" your app)
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Check localStorage for a token
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Check for user info

  // This effect runs when the component loads
  useEffect(() => {
    // If we have a token in state, but no user, it means we reloaded the page.
    // We should try to fetch the user's info. (This is a more advanced step,
    // for now, we'll just rely on what's in localStorage).
    
    // When token/user changes, update localStorage
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // If no token, clear from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]); // Re-run this effect when token or user changes

  // Function to handle user login
  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  // Function to handle user logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // 3. The value we'll provide to all children
  const contextValue = {
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. A helper "hook" to easily use the context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};