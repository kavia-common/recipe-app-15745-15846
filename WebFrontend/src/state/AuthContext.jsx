import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI } from '../services/api';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authenticated user state, token storage, login/logout, and profile updates. */
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'authenticated' | 'anonymous'
  const [error, setError] = useState(null);

  const loadMe = useCallback(async () => {
    try {
      setStatus('loading');
      const me = await AuthAPI.me();
      setUser(me);
      setStatus('authenticated');
    } catch (e) {
      setUser(null);
      setStatus('anonymous');
    }
  }, []);

  useEffect(() => {
    // Attempt session restoration on mount if token exists
    if (localStorage.getItem('auth:token')) {
      loadMe();
    } else {
      setStatus('anonymous');
    }
  }, [loadMe]);

  const login = useCallback(async (email, password) => {
    const res = await AuthAPI.login({ email, password });
    // Expect { token, user }
    if (res?.token) {
      localStorage.setItem('auth:token', res.token);
    }
    setUser(res?.user || null);
    setStatus(res?.user ? 'authenticated' : 'anonymous');
    return res;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await AuthAPI.register(payload);
    if (res?.token) {
      localStorage.setItem('auth:token', res.token);
    }
    setUser(res?.user || null);
    setStatus(res?.user ? 'authenticated' : 'anonymous');
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth:token');
    setUser(null);
    setStatus('anonymous');
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const res = await AuthAPI.updateProfile(payload);
    setUser(res);
    return res;
  }, []);

  const updatePrivacy = useCallback(async (payload) => {
    const res = await AuthAPI.updatePrivacy(payload);
    setUser(res);
    return res;
  }, []);

  const value = useMemo(() => ({
    user, status, error,
    login, register, logout,
    updateProfile, updatePrivacy,
    reload: loadMe,
  }), [user, status, error, login, register, logout, updateProfile, updatePrivacy, loadMe]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access authenticated user, status and actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
