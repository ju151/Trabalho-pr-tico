import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { locaisData } from '../data/locaisData.js'; // NÃO PRECISAMOS MAIS DESTE
import './LocalDetailPage.css'; // O CSS existente

export default function LocalDetailPage() {
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tipo } = useParams(); // Pega o "tipo" (ex: ubs) da URL

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        setLoading(true);
        // Busca na nova API pública usando o 'tipo'
        const res = await fetch(`http://localhost:5000/api/unidades/${tipo}`);
        if (!res.ok) throw new Error("Local não encontrado");
        const data = await res.json();
        setLocal(data);
      } catch (err) {
        setLocal(null); // Define como nulo se der erro
      } finally {
        setLoading(false);
      }
    };
    fetchDetalhes();
  }, [tipo]); // Executa toda vez que o 'tipo' (URL) mudar

  if (loading) {
    return <div className="local-detail-container">Carregando...</div>;
  }

  if (!local) {
    return (
      <div className="local-detail-container">
        <h2>Local não encontrado</h2>
        <Link to="/onde-ir" className="voltar-link">Voltar</Link>
      </div>
    );
  }

  // Se encontrou, renderiza os dados vindos do banco
  return (
    <div className="local-detail-container">
      <h1>{local.title}</h1>
      <p className="local-descricao">{local.fullDescription}</p>
      
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