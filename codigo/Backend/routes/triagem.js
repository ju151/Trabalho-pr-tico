import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { sintomas } = req.body;

  if (!sintomas) {
    return res.status(400).json({ mensagem: "Informe os sintomas." });
  }

  let recomendacao = "Procure uma UBS";
  if (sintomas.includes("falta de ar") || sintomas.includes("dor no peito")) {
    recomendacao = "Procure um hospital imediatamente";
  } else if (sintomas.includes("febre") || sintomas.includes("tosse")) {
    recomendacao = "Procure um postinho de saúde";
  }

  res.json({ recomendacao });
});

export default router;
