import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { locaisData } from '../data/locaisData.js'; // Importa nossos textos
import './LocalDetailPage.css'; // Vamos criar este CSS

export default function LocalDetailPage() {
  // 1. Lê o parâmetro "tipo" da URL (ex: "ubs", "posto")
  const { tipo } = useParams();

  // 2. Busca os dados correspondentes no nosso arquivo
  const local = locaisData[tipo];

  // 3. Se a URL for inválida (ex: /local/farmacia), mostra um erro
  if (!local) {
    return (
      <div className="local-detail-container">
        <h2>Local não encontrado</h2>
        <Link to="/onde-ir" className="voltar-link">Voltar</Link>
      </div>
    );
  }

  // 4. Se encontrou, renderiza os dados
  return (
    <div className="local-detail-container">
      <h1>{local.titulo}</h1>
      <p className="local-descricao">{local.descricao}</p>

      <h3>Para quem é indicado?</h3>
      <ul className="local-indicado-lista">
        {local.indicadoPara.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Link to="/onde-ir" className="voltar-link">Voltar para a página anterior</Link>
    </div>
  );
}