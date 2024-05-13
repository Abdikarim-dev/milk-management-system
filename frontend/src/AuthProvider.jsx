import  { createContext, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const NavigateLogin = () => {
    // Implement your login logic here
    setLoggedIn(true);
    navigate('/home');
    
  };

  const NavigateLogout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, NavigateLogin, NavigateLogout }}>
      {children}
    </AuthContext.Provider>
  );
};