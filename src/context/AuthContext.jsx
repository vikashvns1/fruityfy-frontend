import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { loginApi, registerApi } from '../services/api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Login Function
  const login = async (email, password) => {
    const res = await loginApi({ email, password, role: 'customer' });

    if (res.success) {
      const { token, user } = res.data; // Extract from your backend response
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success(res.message);
      return true;
    } else {
      toast.error(res.message);
      return false;
    }
  };

  // Register Function
  const register = async (name, email, password, phone) => {
    const res = await registerApi({ full_name: name, email, password, phone });

    if (res.success) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success("Account created successfully!");
      return true;
    } else {
      toast.error(res.message);
      return false;
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Logged out successfully");
    window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider value={{ user, setUser,login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);