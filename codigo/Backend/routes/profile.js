import express from "express";
import User from "../src/models/User.js"; 
import { calculateVaccines } from "../src/utils/vaccineEngine.js"; 

const router = express.Router();

// ROTA: GET /api/profile/:id
// Busca os dados de um usuário específico
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // .select("-password") remove a senha
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error("Erro ao buscar perfil:", err); // Log de erro adicionado
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// ROTA: PUT /api/profile/:id
// Atualiza os dados do perfil E CALCULA AS NOVAS VACINAS
router.put("/:id", async (req, res) => {
  try {
    const profileData = req.body;
    
    // 1. Buscar o usuário atual para ver as vacinas já tomadas
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    const alreadyTaken = currentUser.vacinasTomadas || []; // Pega a lista de tomadas

    // 2. Chamar nossa "Lógica de Vacinas" (agora com 'await')
    const totalEligible = await calculateVaccines(profileData); // <-- CORREÇÃO APLICADA AQUI
    
    // Log de debug que adicionamos (pode ser removido depois)
    console.log("--- DEBUG: Resultado de calculateVaccines:", totalEligible); 
    
    // 3. FILTRAR a lista:
    // A nova lista de disponíveis = (Total Elegível) - (Já Tomadas)
    // Garantir que totalEligible é um array antes de filtrar
    const newAvailableList = Array.isArray(totalEligible) 
      ? totalEligible.filter((vacina) => !alreadyTaken.includes(vacina))
      : []; // Se não for array, usa lista vazia para evitar erro
    
    // 4. Preparar os dados para salvar no banco
    const updates = {
      ...profileData, // Salva idade, sexo, etc.
      vacinasDisponiveis: newAvailableList, // Salva a nova lista FILTRADA
      profileCompleted: true // Marca o perfil como salvo
    };

    // 5. Encontra e atualiza o usuário no banco
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates, // Salva os dados atualizados
      { new: true } // Retorna o documento atualizado
    ).select("-password");

    res.json(updatedUser); // Devolve o usuário completo para o frontend

  } catch (err) {
    console.error("Erro ao atualizar perfil:", err); // Log de erro adicionado
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.post("/take-vaccine", async (req, res) => {
  const { userId, vacinaNome } = req.body;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { vacinasDisponiveis: vacinaNome }, // $pull remove da lista
        $push: { vacinasTomadas: vacinaNome } // $push adiciona na lista
      },
      { new: true }
    ).select("-password");
    
    res.json(updatedUser);

  } catch (err) {
    console.error("Erro ao marcar vacina como tomada:", err); // Log de erro adicionado
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;