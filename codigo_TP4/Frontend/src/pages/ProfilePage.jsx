import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // 1. Importar useAuth
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  // 2. Pegar o 'token' e o 'userId' do Contexto
  const { userId, token } = useAuth(); 

  // 1. FUNÇÃO PARA BUSCAR OS DADOS DO PERFIL
  const fetchProfile = async () => {
    if (!userId) {
      setError("Usuário não logado.");
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${userId}`, {
        // 3. Adicionar o "Authorization header"
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Não foi possível carregar o perfil.");
      const data = await res.json();
      setProfile(data);
      setIsEditing(!data.profileCompleted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. BUSCAR OS DADOS QUANDO A PÁGINA CARREGA
  useEffect(() => {
    // Só busca o perfil se o token já estiver carregado
    if (token) { 
      fetchProfile();
    }
  }, [userId, token]); // Executa quando o token ou userId mudam

  // 3. FUNÇÃO PARA ATUALIZAR O FORMULÁRIO
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 4. FUNÇÃO PARA SALVAR O PERFIL (FORMULÁRIO)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${userId}`, {
        method: "PUT",
        // 3. Adicionar o "Authorization header"
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Falha ao atualizar.");
      
      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setSuccess("Perfil atualizado com sucesso!");
      setIsEditing(false); // Trava o formulário

    } catch (err) {
      setError(err.message);
    }
  };
  
  // 5. FUNÇÃO PARA O BOTÃO "JÁ TOMEI"
  const handleTakeVaccine = async (vacinaNome) => {
    if (isEditing) return;
    try {
      const res = await fetch("http://localhost:5000/api/profile/take-vaccine", {
        method: "POST",
        // 3. Adicionar o "Authorization header"
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId, vacinaNome }),
      });
      if (!res.ok) throw new Error("Falha ao mover vacina.");
      const updatedProfile = await res.json();
      setProfile(updatedProfile); 
    } catch (err) {
      setError(err.message);
    }
  };

  // --- RENDERIZAÇÃO ---
  if (loading) return <div>Carregando perfil...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return <div>Perfil não encontrado.</div>;

  return (
    <div className="profile-container">
      <h2>Perfil de {profile.email}</h2>
      
      <form className="profile-form" onSubmit={handleFormSubmit}>
        <h3>Complete seus dados</h3>
        
        <label>Idade</label>
        {isEditing ? (
          <input type="number" name="idade" value={profile.idade || 0} onChange={handleFormChange} />
        ) : (
          <p className="profile-text">{profile.idade || "Não informado"}</p>
        )}
        
        <label>Sexo</label>
        {isEditing ? (
          <select name="sexo" value={profile.sexo || ""} onChange={handleFormChange}>
            <option value="">Selecione...</option>
            <option value="masc">Masculino</option>
            <option value="fem">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        ) : (
          <p className="profile-text">{profile.sexo || "Não informado"}</p>
        )}
        
        <label>Profissão</label>
        {isEditing ? (
          <select name="profissao" value={profile.profissao || ""} onChange={handleFormChange}>
            <option value="">Selecione...</option>
            <option value="saude">Profissional de Saúde</option>
            <option value="educacao">Profissional de Educação</option>
            <option value="outra">Outra</option>
          </select>
        ) : (
          <p className="profile-text">{profile.profissao || "Não informado"}</p>
        )}
        
        <label className="profile-checkbox">
          <input
            type="checkbox"
            name="comorbidades"
            checked={profile.comorbidades || false}
            onChange={handleFormChange}
            disabled={!isEditing}
          />
          Possui comorbidades?
        </label>
        
        <label className="profile-checkbox">
          <input
            type="checkbox"
            name="gestante"
            checked={profile.gestante || false}
            onChange={handleFormChange}
            disabled={!isEditing}
          />
          É gestante?
        </label>

        {success && <p className="profile-success">{success}</p>}
        
        {isEditing ? (
          <button type="submit" className="save-button">
            Salvar Perfil
          </button>
        ) : (
          <button 
            type="button"
            className="edit-button" 
            onClick={() => setIsEditing(true)}
          >
            Editar Perfil
          </button>
        )}
      
      </form> 

      <hr />
      
      {profile.profileCompleted && (
        <div className="vaccine-lists">
          <div className="vaccine-list">
            <h3>Vacinas Disponíveis</h3>
            {profile.vacinasDisponiveis.length === 0 ? (
              <p>Nenhuma vacina disponível.</p>
            ) : (
              profile.vacinasDisponiveis.map(vacina => (
                <div key={vacina} className="vaccine-card">
                  <span>{vacina}</span>
                  <button onClick={() => handleTakeVaccine(vacina)}>
                    Já tomei
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="vaccine-list">
            <h3>Vacinas Já Tomadas</h3>
            {profile.vacinasTomadas.length === 0 ? (
              <p>Nenhuma vacina registrada.</p>
            ) : (
              profile.vacinasTomadas.map(vacina => (
                <div key={vacina} className="vaccine-card taken">
                  <span>✓ {vacina}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}