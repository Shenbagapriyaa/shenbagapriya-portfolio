import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('admin_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
