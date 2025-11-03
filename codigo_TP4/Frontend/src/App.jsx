import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu.jsx'; // Importa o menu que criamos

// Lembre-se de importar o CSS do React, se não o fez
import 'react-router-dom'; 

function App() {
  return (
    <div>
      {/* O Menu aparecerá em todas as páginas */}
      <Menu />
      
      {/* O <Outlet> é o espaço onde a página (Home ou Vacina) será renderizada */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;