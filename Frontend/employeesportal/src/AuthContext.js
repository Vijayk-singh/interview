import React, { createContext, useState, useEffect } from 'react';

// Create a new context
export const AuthContext = createContext();

// Create an AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check JWT token on component mount (e.g., during app initialization)
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    // Perform JWT verification logic (e.g., send token to server for validation)
    // Update isLoggedIn state based on verification result
    setIsLoggedIn(verifyToken(token)); // Implement verifyToken function as needed
  }, []);

  const verifyToken = (token) => {
    // Implement token verification logic here (e.g., send token to server for validation)
    // Return true/false based on verification result
    return token ? true : false;
  };
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
