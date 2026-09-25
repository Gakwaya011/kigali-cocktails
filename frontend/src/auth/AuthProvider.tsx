import { useEffect, useState, type ReactNode } from 'react';
import { api, ApiError } from '../lib/api';
import { AuthContext, type AuthUser } from './authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<AuthUser>('/api/auth/me')
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await api.post<AuthUser>('/api/auth/login', { email, password });
      setUser(loggedInUser);
    } catch (err) {
      if (err instanceof ApiError) throw new Error(err.message, { cause: err });
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser = await api.post<AuthUser>('/api/auth/register', { name, email, password });
      setUser(newUser);
    } catch (err) {
      if (err instanceof ApiError) throw new Error(err.message, { cause: err });
      throw err;
    }
  };

  const logout = async () => {
    await api.post('/api/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
