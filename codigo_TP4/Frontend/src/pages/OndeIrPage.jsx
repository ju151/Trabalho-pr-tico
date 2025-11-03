import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TriagemForm from '../components/TriagemForm';
import './OndeIrPage.css'; // O CSS existente

export default function OndeIrPage() {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca as unidades da API pública
  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/unidades");
        const data = await res.json();
        setUnidades(data);
      } catch (err) {
        console.error("Erro ao buscar unidades:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnidades();
  }, []);

  return (
    <div className="onde-ir-container">
      
      {/* --- Seção de Título e Descrição (igual) --- */}
      <section className="oir-header">
        <h1 className="oir-title-main">Está passando mal mas não sabe onde ir?</h1>
        <h2 className="oir-title-sub">Consulte Aqui!</h2>
        <p className="oir-description">
          Muitas vezes hospitais, UBSs e Postos de saúde são ocupados por pessoas que não foram orientadas e acabam indo para o lugar errado. Aqui você pode consultar o local mais indicado de acordo com seus sintomas.
        </p>
      </section>

      {/* --- Seção do Formulário (igual) --- */}
      <section className="oir-form">
        <TriagemForm />
      </section>

      {/* --- Seção dos Info Cards (DINÂMICA) --- */}
      <section className="oir-info">
        <h3 className="oir-info-title">Entenda um pouco de cada um desses lugares</h3>
        <div className="oir-cards-container">
          
          {loading ? (
            <p>Carregando unidades...</p>
          ) : (
            // Mapeia os dados vindos do banco
            unidades.map(unidade => (
              <div className="oir-card" key={unidade._id}>
                <h4>{unidade.name}</h4>
                <ul>
                  {unidade.summaryItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <Link 
                  to={`/local/${unidade.type}`} 
                  className={`saiba-mais ${unidade.buttonStyle || 'secondary'}`}
                >
                  Saiba Mais
                </Link>
              </div>
            ))
          )}

        </div>
      </section>
    </div>
  );
}