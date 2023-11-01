import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

type AuthContextType = {
  login: () => void;
  register: () => void;
  logout: () => void;
  getUser: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
  }, []);

  const login = () => {
    // Implemente a lógica de login
  };

  const register = () => {
    // Implemente a lógica de registro
  };

  const logout = () => {
    // Implemente a lógica de logout
  };

  const getUser = () => {
    // Implemente a lógica para obter os dados do usuário autenticado
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
