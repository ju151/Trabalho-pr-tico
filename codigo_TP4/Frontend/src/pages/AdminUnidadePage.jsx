import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // 1. Importar useAuth
import "./AdminVaccinePage.css"; // Reutilizando o CSS

const initialState = {
  type: "",
  name: "",
  title: "",
  summaryItems: "",
  fullDescription: "",
  indicadoPara: "",
  buttonStyle: "secondary",
};

export default function AdminUnidadePage() {
  const [unidades, setUnidades] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);
  const { token } = useAuth(); // 2. Pegar o 'token'

  // 1. Buscar unidades
  const fetchUnidades = async () => {
    if (!token) return; // Não faz nada se não houver token
    const res = await fetch("http://localhost:5000/api/admin/unidades", {
      // 3. Adicionar o "Authorization header"
      headers: { 
        "Authorization": `Bearer ${token}` 
      }
    });
    const data = await res.json();
    setUnidades(data);
  };

  useEffect(() => {
    fetchUnidades();
  }, [token]);

  // 2. Converter strings para arrays
  const formatData = (data) => {
    return {
      ...data,
      summaryItems: data.summaryItems.split(',').map(s => s.trim()).filter(s => s),
      indicadoPara: data.indicadoPara.split(',').map(s => s.trim()).filter(s => s),
    };
  };

  // 3. Lidar com o Submit (Salvar ou Criar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = formatData(formData);

    const url = editingId
      ? `http://localhost:5000/api/admin/unidades/${editingId}`
      : "http://localhost:5000/api/admin/unidades";
    
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      // 3. Adicionar o "Authorization header"
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(dataToSubmit),
    });

    setEditingId(null);
    setFormData(initialState);
    fetchUnidades(); // Recarrega a lista
  };

  // 4. Deletar
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza?")) {
      await fetch(`http://localhost:5000/api/admin/unidades/${id}`, {
        method: "DELETE",
        // 3. Adicionar o "Authorization header"
        headers: { 
          "Authorization": `Bearer ${token}` 
        }
      });
      fetchUnidades();
    }
  };
  
  // 5. Preparar para edição
  const handleEdit = (unidade) => {
    setEditingId(unidade._id);
    setFormData({
      ...unidade,
      summaryItems: (unidade.summaryItems || []).join(', '),
      indicadoPara: (unidade.indicadoPara || []).join(', '),
    });
  };

  // 6. Mudanças no formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    // ... (O seu JSX do formulário Admin não muda) ...
    <div className="admin-page-container">
      <h1>Administração de Unidades de Saúde</h1>
      
      <div className="admin-content">
        <div className="admin-list">
          <h2>Unidades Cadastradas</h2>
          {unidades.map(u => (
            <div key={u._id} className="admin-vaccine-card">
              <span>{u.name} (Tipo: {u.type})</span>
              <div>
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u._id)}>Deletar</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="admin-form">
          <h2>{editingId ? "Editar Unidade" : "Adicionar Nova Unidade"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Tipo/ID (ex: ubs, upa, hospital)</label>
            <input name="type" value={formData.type} onChange={handleFormChange} required placeholder="ID único, ex: 'ubs'" />
            
            <label>Nome do Card (ex: UBS)</label>
            <input name="name" value={formData.name} onChange={handleFormChange} required placeholder="Título do card, ex: 'UBS'" />
            
            <label>Título da Página (ex: UBS (Unidade Básica...))</label>
            <input name="title" value={formData.title} onChange={handleFormChange} required placeholder="Título completo da página de detalhes" />
            
            <label>Itens do Resumo (para o card, separados por vírgula)</label>
            <textarea name="summaryItems" value={formData.summaryItems} onChange={handleFormChange} placeholder="Item 1, Item 2, Item 3"/>
            
            <label>Descrição Completa (para a página de detalhes)</label>
            <textarea name="fullDescription" value={formData.fullDescription} onChange={handleFormChange} placeholder="Parágrafo de descrição..."/>

            <label>Itens "Indicado Para" (separados por vírgula)</label>
            <textarea name="indicadoPara" value={formData.indicadoPara} onChange={handleFormChange} placeholder="Indicação 1, Indicação 2, Indicação 3"/>

            <label>Estilo do Botão</label>
            <select name="buttonStyle" value={formData.buttonStyle} onChange={handleFormChange}>
              <option value="secondary">Cinza (Secondary)</option>
              <option value="primary">Preto (Primary)</option>
            </select>

            <button type="submit">{editingId ? "Salvar Alterações" : "Criar Unidade"}</button>
            {editingId && <button type="button" onClick={() => { setFormData(initialState); setEditingId(null); }}>Cancelar Edição</button>}
          </form>
        </div>
      </div>
    </div>
  );
}