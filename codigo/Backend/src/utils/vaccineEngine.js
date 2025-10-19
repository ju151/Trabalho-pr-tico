// Esta função calcula as vacinas com base no perfil
export const calculateVaccines = (profile) => {
    const { idade, comorbidades, gestante, profissao } = profile;
    
    const available = new Set();
  
    // Lógica 1: Gripe
    if (idade >= 60 || gestante || comorbidades || profissao === 'saude') {
      available.add("Gripe");
    }
    
    // Lógica 2: Covid
    if (idade >= 18) {
      available.add("Covid (Dose 1)");
    }
    if (comorbidades && idade >= 12) {
      available.add("Covid (Reforço)");
    }
    
    // Lógica 3: Febre Amarela
    if (idade >= 1 && idade <= 59) {
      available.add("Febre Amarela");
    }
    
    // Lógica 4: Hepatite B (Quase todos podem)
    if (idade > 0) {
      available.add("Hepatite B");
    }
  
    // Converte o Set de volta para um Array
    return Array.from(available);
  }