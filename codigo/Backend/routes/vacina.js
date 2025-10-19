import express from "express";
import { calculateVaccines } from "../src/utils/vaccineEngine.js"; // Verifique este caminho!

const router = express.Router();

router.post("/", async (req, res) => {
  // 1. Pegar os dados do formulário público
  // Note que o form envia "doente", mas o motor espera "comorbidades"
  const { idade, vacina, doente, sexo, gestante, profissao } = req.body;

  // 2. Criar um objeto de perfil "anônimo" para o motor de lógica
  const anonymousProfile = {
    idade: Number(idade),
    comorbidades: doente, // Mapeando 'doente' para 'comorbidades'
    sexo: sexo,
    gestante: gestante,
    profissao: profissao,
  };

  console.log("Perfil anônimo recebido:", anonymousProfile);

  try {
    // 3. Calcular TODAS as vacinas que este perfil anônimo pode tomar
    const eligibleVaccines = await calculateVaccines(anonymousProfile);

    console.log("Vacinas elegíveis calculadas:", eligibleVaccines);

    // 4. Verificar se a vacina que o usuário selecionou ESTÁ na lista de elegíveis
    if (eligibleVaccines.includes(vacina)) {
      res.json({ 
        elegivel: true, 
        justificativa: "Elegível, com base nas regras atuais." 
      });
    } else {
      res.json({ 
        elegivel: false, 
        justificativa: "Não elegível no momento." 
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor ao calcular elegibilidade." });
  }
});

export default router;