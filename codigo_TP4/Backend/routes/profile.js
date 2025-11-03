import express from "express";
// Verifique se o caminho para o User.js está correto
import User from "../src/models/User.js"; 
// Verifique se o caminho para o vaccineEngine.js está correto
import { calculateVaccines } from "../src/utils/vaccineEngine.js"; 
// Verifique se o caminho para o authMiddleware.js está correto
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ROTA: GET /api/profile/:id
// Busca os dados de um usuário específico
router.get("/:id", protect, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: "Acesso não autorizado" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// ROTA: PUT /api/profile/:id
// Atualiza os dados do perfil E CALCULA AS NOVAS VACINAS
router.put("/:id", protect, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: "Acesso não autorizado" });
    }

    const profileData = req.body;
 
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
     return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    const alreadyTaken = currentUser.vacinasTomadas || [];

    const totalEligible = await calculateVaccines(profileData); 
 
    console.log("--- DEBUG: Resultado de calculateVaccines:", totalEligible); 
    
    const newAvailableList = Array.isArray(totalEligible) 
      ? totalEligible.filter((vacina) => !alreadyTaken.includes(vacina))
      : [];
    
    const updates = {
      ...profileData,
      vacinasDisponiveis: newAvailableList,
      profileCompleted: true
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(updatedUser);

  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// ROTA: POST /api/profile/take-vaccine
router.post("/take-vaccine", protect, async (req, res) => {
  const { userId, vacinaNome } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ msg: "Acesso não autorizado" });
  }
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { vacinasDisponiveis: vacinaNome },
        $push: { vacinasTomadas: vacinaNome }
      },
      { new: true }
    ).select("-password");
 
    res.json(updatedUser);

  } catch (err) {
    console.error("Erro ao marcar vacina como tomada:", err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;