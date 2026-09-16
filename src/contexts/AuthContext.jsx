import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

// Demo user accounts for UI auto-fill & development convenience
const DEMO_ACCOUNTS = {
  worker: {
    email: 'rahim@demo.shramikid.local',
    phone: '01700000001',
    password: 'Worker@123',
    name: 'Rahim Uddin',
    role: 'worker',
  },
  employer: {
    email: 'abc@demo.shramikid.local',
    password: 'Employer@123',
    company: 'ABC Construction',
    role: 'employer',
  },
  admin: {
    email: 'admin@shramikid.demo',
    password: 'Admin@123',
    name: 'Admin',
    role: 'admin',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore authenticated user on mount via JWT token and /api/auth/me
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('shramik_token');
      const storedUser = localStorage.getItem('shramik_user');

      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            setIsLoggedIn(true);
            localStorage.setItem('shramik_user', JSON.stringify(res.user));
          }
        } catch (error) {
          console.warn('Could not restore session from backend, using cached session:', error.message);
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
              setIsLoggedIn(true);
            } catch (e) {}
          }
        }
      } else if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        } catch (e) {}
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login method
   */
  const login = async (email, password, role = null) => {
    try {
      const res = await authService.login({ email, password, role });
      if (res.success && res.user && res.token) {
        localStorage.setItem('shramik_token', res.token);
        localStorage.setItem('shramik_user', JSON.stringify(res.user));
        setUser(res.user);
        setIsLoggedIn(true);
        return { success: true, user: res.user };
      }
    } catch (error) {
      console.warn('Backend login failed, checking fallback:', error.message);

      // Local fallback for offline/demo accounts
      let loginUser = null;
      if (role === 'worker' || !role) {
        if (
          (email === DEMO_ACCOUNTS.worker.email || email === DEMO_ACCOUNTS.worker.phone) &&
          password === DEMO_ACCOUNTS.worker.password
        ) {
          loginUser = {
            id: 'SHR-W-2026-000201',
            ...DEMO_ACCOUNTS.worker,
            verificationStatus: 'verified',
            profileCompletion: 90,
          };
        }
      }
      if (role === 'employer' || (!loginUser && !role)) {
        if (email === DEMO_ACCOUNTS.employer.email && password === DEMO_ACCOUNTS.employer.password) {
          loginUser = {
            id: 'SHR-E-2026-000101',
            ...DEMO_ACCOUNTS.employer,
            verificationStatus: 'verified',
            profileCompletion: 95,
          };
        }
      }
      if (role === 'admin' || (!loginUser && !role)) {
        if (email === DEMO_ACCOUNTS.admin.email && password === DEMO_ACCOUNTS.admin.password) {
          loginUser = {
            id: 'SHR-A-2026-000001',
            ...DEMO_ACCOUNTS.admin,
            verificationStatus: 'verified',
            profileCompletion: 100,
          };
        }
      }

      if (loginUser) {
        setUser(loginUser);
        setIsLoggedIn(true);
        localStorage.setItem('shramik_user', JSON.stringify(loginUser));
        return { success: true, user: loginUser };
      }

      return { success: false, message: error.message || 'Invalid credentials' };
    }
  };

  /**
   * Passwordless Login via Phone + OTP
   */
  const loginWithOtp = async (phone, otp, role = null) => {
    try {
      const res = await authService.loginOtp({ phone, otp, role });
      if (res.success && res.user && res.token) {
        localStorage.setItem('shramik_token', res.token);
        localStorage.setItem('shramik_user', JSON.stringify(res.user));
        setUser(res.user);
        setIsLoggedIn(true);
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message || 'ওটিপি যাচাই ব্যর্থ হয়েছে।' };
    } catch (error) {
      console.warn('Backend login with OTP failed:', error.message);
      return { success: false, message: error.message || 'ওটিপি যাচাই করে লগইন করতে সমস্যা হয়েছে।' };
    }
  };

  /**
   * Register method
   */
  const register = async (userData) => {
    try {
      let res;
      if (userData.role === 'worker') {
        res = await authService.registerWorker(userData);
      } else {
        res = await authService.registerEmployer(userData);
      }

      if (res.success && res.user && res.token) {
        localStorage.setItem('shramik_token', res.token);
        localStorage.setItem('shramik_user', JSON.stringify(res.user));
        setUser(res.user);
        setIsLoggedIn(true);
        return { success: true, user: res.user };
      }
    } catch (error) {
      console.warn('Backend register failed, creating local fallback session:', error.message);

      // Fallback
      const rolePrefix = userData.role === 'worker' ? 'W' : userData.role === 'employer' ? 'E' : 'A';
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      const userId = `SHR-${rolePrefix}-${year}-${randomNum}`;

      const newUser = {
        ...userData,
        id: userId,
        verificationStatus: 'pending',
        profileCompletion: userData.profileCompletion || 50,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('shramik_user', JSON.stringify(newUser));

      return { success: true, user: newUser };
    }
  };

  /**
   * Update Profile method
   */
  const updateProfile = async (updatedData) => {
    try {
      const res = await authService.updateProfile(updatedData);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('shramik_user', JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
    } catch (error) {
      console.warn('Backend update profile failed, updating local state:', error.message);
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('shramik_user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    }
  };

  /**
   * Logout method
   */
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('shramik_token');
    localStorage.removeItem('shramik_user');
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    loginWithOtp,
    register,
    updateProfile,
    logout,
    demoAccounts: DEMO_ACCOUNTS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
