import express from "express";
// Verifique se o caminho para o modelo Vaccine.js está correto
import Vaccine from "../src/models/Vaccine.js"; 

const router = express.Router();

// ROTA: GET /api/vaccines
// Rota PÚBLICA para buscar a lista de nomes de vacinas
router.get("/", async (req, res) => {
  try {
    // Busca todas as vacinas, mas retorna apenas o nome e o ID
    const vaccines = await Vaccine.find({}).select("_id name");
    res.json(vaccines);
  } catch (err) {
    console.error("Erro ao buscar lista pública de vacinas:", err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;