import express from "express";
import User from "../src/models/User.js";
import { calculateVaccines } from "../src/utils/vaccineEngine.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const profileData = req.body;
      
      // 1. Buscar o usuário atual para ver as vacinas já tomadas
      const currentUser = await User.findById(req.params.id);
      if (!currentUser) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
      const alreadyTaken = currentUser.vacinasTomadas || []; // Pega a lista de tomadas
  
      // 2. Chamar nossa "Lógica de Vacinas" para saber o TOTAL elegível
      const totalEligible = calculateVaccines(profileData);
      
      // 3. FILTRAR a lista:
      // A nova lista de disponíveis = (Total Elegível) - (Já Tomadas)
      const newAvailableList = totalEligible.filter(
        (vacina) => !alreadyTaken.includes(vacina)
      );
      
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
      console.error(err);
      res.status(500).json({ msg: "Erro no servidor" });
    }
  });

router.post("/take-vaccine", async (req, res) => {
  const { userId, vacinaNome } = req.body;
  
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
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;