import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    // Lê os dados salvos no navegador ao carregar
    isLoggedIn: !!localStorage.getItem("token"),
    userEmail: localStorage.getItem("userEmail"),
    userRole: localStorage.getItem("userRole"),
    token: localStorage.getItem("token"), // <-- NOVO
    userId: localStorage.getItem("userId"),
  });

  const login = (email, role, token, id) => {
    // Salva no navegador
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", id);
    // Atualiza o estado global
    setAuth({ isLoggedIn: true, userEmail: email, userRole: role, token: token, userId: id });
  };

  const logout = () => {
    // Remove do navegador
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    // Atualiza o estado global
    setAuth({ isLoggedIn: false, userEmail: null, userRole: null, token: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};