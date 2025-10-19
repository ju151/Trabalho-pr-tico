import React from 'react';
import { Link } from 'react-router-dom';
import TriagemForm from '../components/TriagemForm'; // Reutilizando seu formulário!
import './OndeIrPage.css'; // Vamos criar este CSS

export default function OndeIrPage() {
  return (
    <div className="onde-ir-container">

      {/* --- Seção de Título e Descrição --- */}
      <section className="oir-header">
        <h1 className="oir-title-main">Está passando mal mas não sabe onde ir?</h1>
        <h2 className="oir-title-sub">Consulte Aqui!</h2>
        <p className="oir-description">
          Muitas vezes hospitais, UBSs e Postos de saúde são ocupados por pessoas que não foram orientadas e acabam indo para o lugar errado. Aqui você pode consultar o local mais indicado de acordo com seus sintomas.
        </p>
      </section>

      {/* --- Seção do Formulário (Reutilizado) --- */}
      <section className="oir-form">
        <TriagemForm />
      </section>

      {/* --- Seção dos Info Cards --- */}
      <section className="oir-info">
        <h3 className="oir-info-title">Entenda um pouco de cada um desses lugares</h3>
        <div className="oir-cards-container">

          {/* Card UBS */}
          <div className="oir-card">
            <h4>UBS</h4>
            <ul>
              <li>Foco em Prevenção e Rotina</li>
              <li>Vacinação e Curativos</li>
              <li>Atendimento de Baixa Complexidade</li>
              <li>Renovação de receitas de uso contínuo</li>
              <li>Coleta de exames laboratoriais básicos</li>
            </ul>
            <Link to="/local/ubs" className="saiba-mais secondary">Saiba Mais</Link>
          </div>

          {/* Card Posto de Saúde */}
          <div className="oir-card">
            <h4>Posto de Saúde</h4>
            <ul>
              <li>Acompanhamento de Crônicos (Pressão Alta, Diabetes)</li>
              <li>Consultas de Rotina e Pré-natal</li>
              <li>Vínculo com a Comunidade Local</li>
              <li>Acompanhamento pediátrico</li>
              <li>Tratamento de sintomas leves (gripes, alergias)</li>
            </ul>
            <Link to="/local/posto" className="saiba-mais primary">Saiba Mais</Link>
          </div>

          {/* Card Hospital */}
          <div className="oir-card">
            <h4>Hospital</h4>
            <ul>
              <li>Foco em Emergência (Risco de Vida)</li>
              <li>Alta Complexidade e Internação</li>
              <li>Cirurgias e Exames Complexos</li>
              <li>Atendimento a traumas graves (acidentes)</li>
              <li>Disponibilidade de UTI (Unidade de Terapia Intensiva)</li>
            </ul>
            <Link to="/local/hospital" className="saiba-mais secondary">Saiba Mais</Link>
          </div>

          <div className="oir-card">
            <h4>UPA</h4>
            <ul>
                <li>Febre alta que não cede</li>
                <li>Dores fortes (ex: abdominal, cabeça)</li>
                <li>Vômitos ou diarreia persistentes</li>
                <li>Cortes (suturas/pontos)</li>
                <li>Torções e fraturas (não expostas)</li>
                <li>Crises de pressão alta ou diabetes</li>
            </ul>
            <Link to="/local/upa" className="saiba-mais secondary">Saiba Mais</Link>
          </div>
        </div>
      </section>
    </div>
  );
}