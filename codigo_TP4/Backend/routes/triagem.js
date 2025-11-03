import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  // O 'sintomas' virá como uma string, ex: "febre alta dor de garganta"
  const { sintomas } = req.body;

  if (!sintomas) {
    return res.status(400).json({ mensagem: "Informe os sintomas." });
  }

  // --- LÓGICA DE TRIAGEM ATUALIZADA (Hierárquica) ---

  // 1. Emergência (Risco de Vida -> HOSPITAL)
  if (sintomas.includes("falta de ar") || sintomas.includes("dor no peito")) {
    res.json({ recomendacao: "Procure um Hospital imediatamente." });
    return; // Para a execução
  }

  // 2. Urgência (Não pode esperar -> UPA)
  if (sintomas.includes("febre alta") || sintomas.includes("vomito diarreia")) {
    res.json({ recomendacao: "Procure uma UPA (Unidade de Pronto Atendimento)." });
    return;
  }

  // 3. Sintomas Gripais / Comuns (Atendimento Rápido -> POSTO DE SAÚDE)
  if (
    sintomas.includes("febre") ||
    sintomas.includes("tosse") ||
    sintomas.includes("dor de garganta") ||
    sintomas.includes("dor no corpo") ||
    sintomas.includes("coriza")
  ) {
    res.json({ recomendacao: "Procure um Posto de Saúde." });
    return;
  }

  // 4. Sintomas Leves / Outros (Atendimento Básico -> UBS)
  // (Se não se encaixou em nada acima, mas marcou 'dor de cabeca' ou 'outro')
  res.json({ recomendacao: "Procure uma UBS (Unidade Básica de Saúde) para avaliação." });
});

export default router;