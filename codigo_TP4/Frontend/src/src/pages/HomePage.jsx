import React from 'react';
import { Link } from 'react-router-dom'; // Para criar links para as outras páginas
import './HomePage.css'; // Vamos criar este arquivo para estilizar

export default function HomePage() {
  return (
    <div className="home-container">
      
      <section className="home-hero">
        <h1>Bem-vindo ao Projeto Saúde</h1>
        <p className="home-subtitle">Navegando o sistema de saúde com mais clareza e eficiência.</p>
      </section>

      <section className="home-section">
        <p>
          Muitas vezes, na hora da necessidade, não sabemos para onde ir. Hospitais acabam superlotados com casos que poderiam ser resolvidos em Postos de Saúde ou UBSs, enquanto pessoas com emergências reais podem demorar para serem atendidas.
        </p>
        <p>
          Este site foi criado para ser um guia rápido, ajudando você a tomar a decisão correta e a encontrar o atendimento mais adequado para sua necessidade.
        </p>
      </section>

      <section className="home-section">
        <h2>Como o site pode te ajudar?</h2>
        <p>
          Oferecemos duas ferramentas principais para todos os visitantes e uma área de perfil para usuários cadastrados:
        </p>
        <ul className="home-list">
          <li>
            <strong>Triagem de Sintomas:</strong> Não tem certeza da gravidade? Nossa ferramenta de <Link to="/onde-ir">Triagem</Link> (na página "Onde devo ir?") analisa seus sintomas e recomenda o local mais indicado.
          </li>
          <li>
            <strong>Guia de Locais:</strong> Você sabe a diferença entre uma UBS, um Posto de Saúde e um Hospital? A página <Link to="/onde-ir">"Onde devo ir?"</Link> explica o foco de cada um.
          </li>
          <li>
            <strong>Carteira de Vacinação Digital:</strong> Ao se cadastrar, você ganha acesso a um <Link to="/perfil">Perfil</Link> onde pode preencher seus dados de saúde. Com base nessas informações, o sistema calcula e exibe todas as vacinas para as quais você é elegível.
          </li>
        </ul>
      </section>
      
      <section className="home-section">
        <h2>Como usar?</h2>
        <div className="home-how-to">
          <div className="how-to-card">
            <h3>Para Visitantes</h3>
            <p>
              Use o menu de navegação para explorar as páginas <Link to="/onde-ir">"Onde devo ir?"</Link> ou <Link to="/vacina">"Vacinas"</Link> para informações gerais e triagem de sintomas. É rápido, anônimo e fácil.
            </p>
          </div>
          <div className="how-to-card">
            <h3>Para Usuários Cadastrados</h3>
            <p>
              Clique em <Link to="/register">"Cadastrar"</Link> para criar sua conta. Após o <Link to="/login">"Login"</Link>, você será levado ao seu <Link to="/perfil">"Perfil"</Link>. Preencha seus dados para desbloquear sua lista de vacinas personalizadas e gerencie quais você já tomou.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}