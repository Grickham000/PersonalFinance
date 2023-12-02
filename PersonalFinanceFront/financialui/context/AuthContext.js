// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated (e.g., check for a token in cookies)
    const token = Cookies.get('jwt_token');
    console.log(token + " logger del token");

    // Set the user object if the token is present, else clear the user object
    setUser(token ? { token } : null);

    // Set loading to false as we've checked for the token
    setLoading(false);
  }, []);

  const login = (token) => {
    // Set the user object when the user logs in
    setUser({ token });
  };

  const logout = () => {
    // Clear the user object when the user logs out
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
