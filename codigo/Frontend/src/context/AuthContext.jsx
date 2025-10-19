import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Provedor que gerencia o estado
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    // Lê os dados salvos no navegador ao carregar
    isLoggedIn: !!localStorage.getItem("userId"),
    userEmail: localStorage.getItem("userEmail"),
    userId: localStorage.getItem("userId"),
  });

  const login = (email, id) => {
    // Salva no navegador
    localStorage.setItem("userId", id);
    localStorage.setItem("userEmail", email);
    // Atualiza o estado global
    setAuth({ isLoggedIn: true, userEmail: email, userId: id });
  };

  const logout = () => {
    // Remove do navegador
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    // Atualiza o estado global
    setAuth({ isLoggedIn: false, userEmail: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};