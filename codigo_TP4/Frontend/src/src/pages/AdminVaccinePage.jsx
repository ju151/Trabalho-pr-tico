import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // 1. Importar useAuth
import "./AdminVaccinePage.css"; 

const initialState = {
  name: "",
  description: "",
  appliesToAll: false,
  priorityGroups: {
    minAge: null,
    maxAge: null,
    professions: "", 
    comorbidades: false,
    gestante: false,
  },
};

export default function AdminVaccinePage() {
  const [vaccines, setVaccines] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);
  const { token } = useAuth(); // 2. Pegar o 'token'

  // 1. Buscar todas as vacinas
  const fetchVaccines = async () => {
    if (!token) return; // Não faz nada se não houver token
    const res = await fetch("http://localhost:5000/api/admin/vaccines", {
      // 3. Adicionar o "Authorization header"
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    setVaccines(data);
  };

  useEffect(() => {
    fetchVaccines();
  }, [token]); // Executa quando o token carregar

  // 2. Lidar com o Submit (Salvar ou Criar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const professionsArray = formData.priorityGroups.professions
      .split(',')
      .map(p => p.trim())
      .filter(p => p);
      
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
      // 3. Adicionar o "Authorization header"
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
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
        // 3. Adicionar o "Authorization header"
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      fetchVaccines();
    }
  };

  // --- Funções do Formulário (Não mudam) ---

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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

  const handleEdit = (vaccine) => {
    setEditingId(vaccine._id);
    setFormData({
      ...vaccine,
      priorityGroups: {
        ...vaccine.priorityGroups,
        professions: (vaccine.priorityGroups.professions || []).join(', ')
      }
    });
  };

  return (
    // ... (O seu JSX do formulário Admin não muda) ...
    <div className="admin-page-container">
      <h1>Administração de Vacinas</h1>
      
      <div className="admin-content">
        
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