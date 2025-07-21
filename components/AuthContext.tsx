import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '@/constants/Config';
import { apiCall, checkBackendHealth } from '@/utils/networkUtils';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load stored auth data on app start
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load stored auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const storeAuthData = async (newToken: string, newUser: User) => {
    try {
      await AsyncStorage.setItem('authToken', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Failed to store auth data:', error);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // FAKE LOGIN: Accept any input and proceed
    console.log("Login attempt with email:", email);
    const url = "https://meeapp.onrender.com/api/auth/login";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      setToken(token);
      const userUrl = "https://meeapp.onrender.com/api/users/me";
      const userResponse = await fetch(userUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const userData = await userResponse.json();
      setUser(userData);
      await storeAuthData(token, userData);
      return true;
    } else {
      console.error('Login failed:', response.status);
      return false;
    }
    // const mockUser = {
    //   id: 1,
    //   username: email.split('@')[0],
    //   email,
    //   roles: ['USER'],
    // };
    // const mockToken = 'mock-token-' + Date.now();
    // setToken(mockToken);
    // setUser(mockUser);
    // await storeAuthData(mockToken, mockUser);
    // return true;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken, user: userData } = data;
        
        setToken(accessToken);
        setUser(userData);
        await storeAuthData(accessToken, userData);
        return true;
      } else {
        console.error('Registration failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await clearAuthData();
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      logout,
      register,
    }}>
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