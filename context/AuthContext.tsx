"use client"
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: string | null;
  register: (username: string, password: string) => boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const mockUsers: { [username: string]: string } = {
    testuser: "password",
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: () => false,
  login: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const register = (username: string, password: string): boolean => {
    if (mockUsers[username]) {
      alert('Kasutaja juba olemas!');
      return false;
    }
    if (username.trim() === '' || password.trim() === '') {
      alert('Palun täida kõik väljad!');
      return false;
    }
    mockUsers[username] = password;
    console.log('Registreeritud kasutajad:', mockUsers);
    alert('Kasutaja registreeritud!');
    return true; 
  };

  const login = (username: string, password: string) => {
    if (mockUsers[username] && mockUsers[username] === password) {
      setUser(username);
      return true;
    } else {
      alert('Vale kasutajanimi või parool!');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    alert('Oled välja logitud.');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
