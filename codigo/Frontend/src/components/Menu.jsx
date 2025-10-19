import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. IMPORTE O HOOK
import './Menu.css';

export default function Menu() {
  const { isLoggedIn, userEmail, logout } = useAuth(); // 2. PEGUE OS DADOS
  const navigate = useNavigate();

  // Pega o nome antes do "@"
  const username = userEmail ? userEmail.split('@')[0] : '';

  const handleLogout = () => {
    logout(); // 3. CHAME A FUNÇÃO DE LOGOUT
    navigate('/login'); // Redireciona para o login
  };

  return (
    <header className="menu-container">
      <div className="menu-logo">
        <Link to="/">Projeto Saúde</Link>
      </div>
      <nav className="menu-links">
        {/* Links de navegação principais */}
        <Link to="/vacina">Vacinas</Link>
        <Link to="/onde-ir">Onde devo ir?</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/admin/vacinas">Admin</Link>

        {isLoggedIn ? (
          // Se ESTIVER logado
          <div className="menu-auth">
            <Link to="/perfil" className="menu-username">
              Olá, {username}
            </Link>
            <button onClick={handleLogout} className="menu-logout-button">
              Sair
            </button>
          </div>
        ) : (
          // Se NÃO ESTIVER logado
          <div className="menu-auth">
            <Link to="/login">Login</Link>
            <Link to="/register" className="auth-register-button">Cadastrar</Link>
          </div>
        )}
      </nav>
    </header>
  );
}