import Vaccine from "../models/Vaccine.js"; // Ou ../src/models/Vaccine.js

// A função AGORA é "async" porque busca no banco
export const calculateVaccines = async (profile) => { 
  const { idade, comorbidades, gestante, profissao } = profile;
  
  // 1. Buscar TODAS as regras de vacina do banco de dados
  const allVaccines = await Vaccine.find({});
  
  // Linha de Debug que adicionámos antes (pode manter ou remover)
  console.log("--- DEBUG: Vacinas lidas do Banco de Dados ---", allVaccines); 
  
  const available = new Set();

  // 2. Iterar sobre CADA regra de vacina vinda do banco
  for (const vaccine of allVaccines) {
    const rules = vaccine.priorityGroups;

    // 3. VERIFICAR A REGRA 'appliesToAll' PRIMEIRO
    if (vaccine.appliesToAll) {
      available.add(vaccine.name);
      continue; // Pula para a próxima vacina
    }
    
    // 4. Se não aplica a todos, verificar as regras de grupos prioritários (lógica "OU")
    
    // Regra de Idade Mínima
    if (rules.minAge !== null && idade >= rules.minAge) {
      available.add(vaccine.name);
      continue;
    }
    // Regra de Idade Máxima
    if (rules.maxAge !== null && idade <= rules.maxAge) {
      available.add(vaccine.name);
      continue;
    }
    
    // Regra de Comorbidades
    if (rules.comorbidades === true && comorbidades === true) {
      available.add(vaccine.name);
      continue;
    }
    
    // Regra de Gestante
    if (rules.gestante === true && gestante === true) {
      available.add(vaccine.name);
      continue;
    }
    
    // Regra de Profissão
    if (rules.professions && rules.professions.length > 0 && rules.professions.includes(profissao)) {
      available.add(vaccine.name);
      continue;
    }
  }

  // Converte o Set de volta para um Array
  return Array.from(available);
}