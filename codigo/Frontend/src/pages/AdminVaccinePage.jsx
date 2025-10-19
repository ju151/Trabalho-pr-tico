import React, { useState, useEffect } from "react";
import "./AdminVaccinePage.css"; // Vamos criar este CSS

// Estado inicial para um formulário limpo
const initialState = {
  name: "",
  description: "",
  appliesToAll: false,
  priorityGroups: {
    minAge: null,
    maxAge: null,
    professions: "", // Usaremos string no form e converteremos para array
    comorbidades: false,
    gestante: false,
  },
};

export default function AdminVaccinePage() {
  const [vaccines, setVaccines] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null); // Controla se estamos editando ou criando

  // --- Funções de API ---
  
  // 1. Buscar todas as vacinas
  const fetchVaccines = async () => {
    const res = await fetch("http://localhost:5000/api/admin/vaccines");
    const data = await res.json();
    setVaccines(data);
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  // 2. Lidar com o Submit (Salvar ou Criar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Converter 'professions' de string ("saude, educacao") para array (["saude", "educacao"])
    const professionsArray = formData.priorityGroups.professions
      .split(',')
      .map(p => p.trim())
      .filter(p => p); // Remove vazios
      
    const dataToSubmit = {
      ...formData,
      priorityGroups: {
        ...formData.priorityGroups,
        professions: professionsArray,
      }
    };

    const url = editingId
      ? `http://localhost:5000/api/admin/vaccines/${editingId}`
      : "http://localhost:5000/api/admin/vaccines";
    
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSubmit),
    });

    setEditingId(null);
    setFormData(initialState);
    fetchVaccines(); // Recarrega a lista
  };

  // 3. Deletar uma vacina
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que quer deletar esta vacina?")) {
      await fetch(`http://localhost:5000/api/admin/vaccines/${id}`, {
        method: "DELETE",
      });
      fetchVaccines();
    }
  };

  // --- Funções do Formulário ---

  // 4. Lida com mudanças simples (name, description)
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 5. Lida com mudanças em 'priorityGroups'
  const handleRulesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      priorityGroups: {
        ...prev.priorityGroups,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  // 6. Prepara o formulário para edição
  const handleEdit = (vaccine) => {
    setEditingId(vaccine._id);
    setFormData({
      ...vaccine,
      // Converter array de volta para string
      priorityGroups: {
        ...vaccine.priorityGroups,
        professions: (vaccine.priorityGroups.professions || []).join(', ')
      }
    });
  };

  return (
    <div className="admin-page-container">
      <h1>Administração de Vacinas</h1>
      
      <div className="admin-content">
        
        {/* Coluna da Esquerda: Lista de Vacinas */}
        <div className="admin-list">
          <h2>Vacinas Cadastradas</h2>
          {vaccines.map(v => (
            <div key={v._id} className="admin-vaccine-card">
              <span>{v.name}</span>
              <div>
                <button onClick={() => handleEdit(v)}>Editar</button>
                <button onClick={() => handleDelete(v._id)}>Deletar</button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Coluna da Direita: Formulário */}
        <div className="admin-form">
          <h2>{editingId ? "Editar Vacina" : "Adicionar Nova Vacina"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome da Vacina</label>
            <input name="name" value={formData.name} onChange={handleFormChange} required />
            
            <label>Descrição</label>
            <textarea name="description" value={formData.description} onChange={handleFormChange} />

            <label><input type="checkbox" name="appliesToAll" checked={formData.appliesToAll} onChange={handleFormChange} /> Aplica-se a todos?</label>

            <fieldset>
              <legend>Grupos Prioritários (se não aplica a todos)</legend>
              <label>Idade Mínima</label>
              <input type="number" name="minAge" value={formData.priorityGroups.minAge || ''} onChange={handleRulesChange} />
              
              <label>Idade Máxima</label>
              <input type="number" name="maxAge" value={formData.priorityGroups.maxAge || ''} onChange={handleRulesChange} />
              
              <label>Profissões (separadas por vírgula)</label>
              <input type="text" name="professions" value={formData.priorityGroups.professions} onChange={handleRulesChange} placeholder="ex: saude, educacao" />
              
              <label><input type="checkbox" name="comorbidades" checked={formData.priorityGroups.comorbidades} onChange={handleRulesChange} /> Requer comorbidades?</label>
              <label><input type="checkbox" name="gestante" checked={formData.priorityGroups.gestante} onChange={handleRulesChange} /> Requer ser gestante?</label>
            </fieldset>

            <button type="submit">{editingId ? "Salvar Alterações" : "Criar Vacina"}</button>
            {editingId && <button type="button" onClick={() => { setFormData(initialState); setEditingId(null); }}>Cancelar Edição</button>}
          </form>
        </div>
      </div>
    </div>
  );
}