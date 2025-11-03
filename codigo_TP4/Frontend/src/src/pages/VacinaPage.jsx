import React from 'react';
import VacinaForm from '../components/VacinaForm';
import './VacinaPage.css'; // Importa o CSS para estilizar esta página

export default function VacinaPage() {
  return (
    <div className="vacina-page-container">
      <h1 className="title-main">Não sabe se já pode tomar a vacina?</h1>
      <h2 className="title-sub">Consulte Aqui!</h2>
      <p className="description">
        Escolha a Vacina que você deseja tomar, escreva sua idade e clique em pesquisar
      </p>
      
      {/* Aqui entra seu formulário de vacina atualizado */}
      <VacinaForm />
    </div>
  );
}