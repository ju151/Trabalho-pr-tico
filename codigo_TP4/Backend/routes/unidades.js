import express from "express";
import Unidade from "../src/models/Unidade.js"; // Verifique o caminho

const router = express.Router();

// GET: Listar TODAS as unidades (para os cards da página "Onde devo ir?")
router.get("/", async (req, res) => {
  try {
    const unidades = await Unidade.find({});
    res.json(unidades);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// GET: Buscar UMA unidade pelo 'type' (para a página de detalhes)
router.get("/:type", async (req, res) => {
  try {
    const unidade = await Unidade.findOne({ type: req.params.type });
    if (!unidade) {
      return res.status(404).json({ msg: "Unidade não encontrada" });
    }
    res.json(unidade);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;