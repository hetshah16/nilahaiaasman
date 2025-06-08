import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'super-admin' | 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  interests?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@vruksha.com',
    password: 'admin123',
    role: 'super-admin'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'admin@greenwood.edu',
    password: 'admin123',
    role: 'admin',
    organizationId: 'org1',
    organizationName: 'Greenwood University'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'teacher@greenwood.edu',
    password: 'teacher123',
    role: 'teacher',
    organizationId: 'org1',
    organizationName: 'Greenwood University'
  },
  {
    id: '4',
    name: 'Alex Chen',
    email: 'student@greenwood.edu',
    password: 'student123',
    role: 'student',
    organizationId: 'org1',
    organizationName: 'Greenwood University',
    interests: ['Technology', 'Science', 'Mathematics']
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('vruksha_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('vruksha_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'student',
      organizationId: userData.organizationId,
      organizationName: userData.organizationName,
      interests: userData.interests
    };
    mockUsers.push({ ...newUser, password: userData.password });
    setUser(newUser);
    localStorage.setItem('vruksha_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  // Update user and persist to localStorage
  const updateUser = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('vruksha_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vruksha_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};