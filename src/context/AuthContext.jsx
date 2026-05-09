import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const saveAuth = (data) => {
    setToken(data.token);
    const userInfo = { username: data.username, name: data.name };
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const loginUser = async (credentials) => {
    try {
      const data = await api.login(credentials);
      saveAuth(data);
      toast.success(`Welcome back, ${data.name}!`);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Invalid username or password');
      return false;
    }
  };

  const registerUser = async (userData) => {
    try {
      const data = await api.register(userData);
      saveAuth(data); // auto-login on register
      toast.success(`Welcome, ${data.name}! Account created.`);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
