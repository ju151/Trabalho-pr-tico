import React, { useState, useEffect } from "react";
import './VacinaForm.css'; 

export default function VacinaForm() {
  
  // --- NOVOS ESTADOS ---
  const [vaccineList, setVaccineList] = useState([]); 
  const [loading, setLoading] = useState(true);

  // --- Estados do Formulário ---
  const [idade, setIdade] = useState("");
  const [vacina, setVacina] = useState("");
  const [doente, setDoente] = useState(false);
  const [sexo, setSexo] = useState("");
  const [gestante, setGestante] = useState("");
  const [profissao, setProfissao] = useState("");
  const [resultado, setResultado] = useState("");

  // Busca as vacinas cadastradas no admin para preencher o dropdown
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/vaccines"); 
        const data = await res.json();
        setVaccineList(data); // Salva as vacinas no estado
      } catch (err) {
        console.error("Falha ao buscar lista de vacinas", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVaccines();
  }, []);

  const enviar = async (e) => {
    e.preventDefault();
    setResultado("");
    
    // Envia todos os dados que o novo backend espera
    const res = await fetch("http://localhost:5000/api/vacina", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        idade: Number(idade), 
        vacina, 
        doente,
        sexo,
        gestante,
        profissao 
      }),
    });
    const data = await res.json();
    setResultado(`${data.elegivel ? "✅ Pode tomar" : "❌ Não pode"} - ${data.justificativa}`);
  };

  return (
    <div className="form-container">
      <form onSubmit={enviar}>
        
        <label>Vacina</label>
        {/* --- DROPDOWN DINÂMICO --- */}
        <select value={vacina} onChange={(e) => setVacina(e.target.value)} disabled={loading}>
          <option value="">{loading ? "Carregando..." : "Selecione..."}</option>
          
          {/* Mapeia as vacinas vindas do banco de dados */}
          {vaccineList.map((v) => (
            <option key={v._id} value={v.name}>{v.name}</option>
          ))}
        </select>

        <label>Idade</label>
        <input
          type="number"
          placeholder="Digite sua idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />

        <label>Sexo</label>
        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="masc">Masculino</option>
          <option value="fem">Feminino</option>
          <option value="outro">Outro</option>
        </select>

        <label>Possui comorbidades?</label>
        <select onChange={(e) => setDoente(e.target.value === 'sim')}>
          <option value="">Selecione...</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>

        <label>Está Gestante?</label>
        <select value={gestante} onChange={(e) => setGestante(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>

        <label>Profissão</label>
        <select value={profissao} onChange={(e) => setProfissao(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="saude">Profissional de Saúde</option>
          <option value="educacao">Profissional de Educação</option>
          <option value="outra">Outra</option>
        </select>

        <button type="submit">Pesquisar</button>
      </form>

      {resultado && <p className="resultado"><b>Resultado:</b> {resultado}</p>}
    </div>
  );
}