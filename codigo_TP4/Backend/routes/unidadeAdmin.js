import express from "express";
import Unidade from "../src/models/Unidade.js"; // Verifique o caminho
import { protect, admin } from "../middleware/authMiddleware.js"; // Verifique o caminho

const router = express.Router();

// Aplicar segurança de Admin a TODAS as rotas deste arquivo
router.use(protect, admin);

// GET: Listar todas
router.get("/", async (req, res) => {
  try {
    const unidades = await Unidade.find({});
    res.json(unidades);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// POST: Criar nova
router.post("/", async (req, res) => {
  try {
    const newUnidade = new Unidade(req.body);
    await newUnidade.save();
    res.status(201).json(newUnidade);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// PUT: Atualizar
router.put("/:id", async (req, res) => {
  try {
    const updatedUnidade = await Unidade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUnidade);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// DELETE: Deletar
router.delete("/:id", async (req, res) => {
  try {
    await Unidade.findByIdAndDelete(req.params.id);
    res.json({ msg: "Unidade deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;