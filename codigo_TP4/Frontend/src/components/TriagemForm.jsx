import React, { useState } from "react";
import './TriagemForm.css'; 

export default function TriagemForm() {
  

  const [sintomasSelecionados, setSintomasSelecionados] = useState([]);
  const [resultado, setResultado] = useState("");

// 2. Definir as opções de sintomas
const sintomaOpcoes = [
  // Emergência (Hospital)
  { label: "Falta de ar severa", value: "falta de ar" }, // 'value' deve bater com o backend
  { label: "Dor no peito intensa", value: "dor no peito" },
  
  // Urgência (UPA)
  { label: "Febre Alta (acima de 38.5°C)", value: "febre alta" },
  { label: "Vômito ou Diarreia (persistente)", value: "vomito diarreia" },
  
  // Sintomas Comuns/Leves (Posto de Saúde / UBS)
  { label: "Febre (abaixo de 38.5°C)", value: "febre" },
  { label: "Tosse", value: "tosse" },
  { label: "Dor de garganta", value: "dor de garganta" },
  { label: "Dor no corpo", value: "dor no corpo" },
  { label: "Dor de cabeça", value: "dor de cabeca" },
  { label: "Coriza", value: "coriza" },
  { label: "Outro", value: "outro" }
];
  // 3. Função para atualizar o array quando um checkbox é clicado
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Adiciona o sintoma ao array
      setSintomasSelecionados(prev => [...prev, value]);
    } else {
      // Remove o sintoma do array
      setSintomasSelecionados(prev => prev.filter(sintoma => sintoma !== value));
    }
  };

  // 4. Atualizar a função de envio
  const enviar = async (e) => {
    e.preventDefault();

    const sintomasString = sintomasSelecionados.join(" ");

    const res = await fetch("http://localhost:5000/api/triagem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sintomas: sintomasString }), // Envia a string formatada
    });
    const data = await res.json();
    setResultado(data.recomendacao);
  };

  // --- VISUAL ---
  return (
    <div className="triagem-form-container">
      <h2>Triagem de Sintomas</h2>
      <form onSubmit={enviar}>
        
        <p>Selecione os sintomas que você está sentindo:</p>
        
        {/* 5. Mapear as opções para criar os checkboxes */}
        <div className="checkbox-container">
          {sintomaOpcoes.map((sintoma) => (
            <label key={sintoma.value} className="checkbox-label">
              <input
                type="checkbox"
                value={sintoma.value}
                checked={sintomasSelecionados.includes(sintoma.value)}
                onChange={handleCheckboxChange}
              />
              {sintoma.label}
            </label>
          ))}
        </div>

        <button type="submit" className="triagem-button">Analisar</button>
      </form>
      {resultado && <p><b>Recomendação:</b> {resultado}</p>}
    </div>
  );
}