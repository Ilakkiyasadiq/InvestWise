import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  portfolio: {
    stocks: Array<{
      symbol: string;
      shares: number;
      buyPrice: number;
      currentPrice: number;
    }>;
    totalInvested: number;
    totalValue: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'portfolio'> & { password: string }) => Promise<void>;
  logout: () => void;
  updatePortfolio: (portfolio: User['portfolio']) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  CURRENT_USER: 'currentUser',
  USERS: 'users',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signup = async (userData: Omit<User, 'id' | 'portfolio'> & { password: string }) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
    if (users[userData.email]) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      portfolio: {
        stocks: [],
        totalInvested: 0,
        totalValue: 0
      }
    };

    // Store user data and credentials
    users[userData.email] = {
      ...newUser,
      password: userData.password // In a real app, this should be hashed
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Set current user
    const { password: _, ...userWithoutPassword } = users[userData.email];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
    const userData = users[email];

    if (!userData || userData.password !== password) {
      return false;
    }

    const { password: _, ...userWithoutPassword } = userData;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setUser(null);
  };

  const updatePortfolio = (portfolio: User['portfolio']) => {
    if (user) {
      const updatedUser = { ...user, portfolio };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
      
      // Update user in users storage
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
      users[user.email] = { ...users[user.email], portfolio };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updatePortfolio }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}