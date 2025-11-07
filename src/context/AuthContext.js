import React, { createContext, useState, useEffect } from 'react';
import { logout as apiLogout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');  

      if (token && storedUser) {
        try {
          const currentUser = JSON.parse(storedUser);  
          setUser(currentUser);  
        } catch (error) {
          console.error('User info parsing error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logout = () => {
    apiLogout();
    localStorage.removeItem('token');  
    localStorage.removeItem('user');   
    setUser(null);  
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
