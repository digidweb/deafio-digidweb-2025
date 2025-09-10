import { AbrigoAnimais } from "./abrigo-animais.js";

// Criar instância do abrigo
const abrigo = new AbrigoAnimais();

console.log("🏠 Sistema de Adoção do Abrigo de Animais\n");

// Exemplo 1: Caso válido do desafio
console.log("📋 Exemplo 1 - Caso Válido:");
console.log("Pessoa 1: RATO,BOLA");
console.log("Pessoa 2: RATO,NOVELO");
console.log("Animais: Rex,Fofo");

const resultado1 = abrigo.encontraPessoas(
  "RATO,BOLA",
  "RATO,NOVELO",
  "Rex,Fofo"
);
console.log("Resultado:", JSON.stringify(resultado1, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 2: Caso inválido do desafio
console.log("📋 Exemplo 2 - Animal Inválido:");
console.log("Pessoa 1: CAIXA,RATO");
console.log("Pessoa 2: RATO,BOLA");
console.log("Animais: Lulu");

const resultado2 = abrigo.encontraPessoas("CAIXA,RATO", "RATO,BOLA", "Lulu");
console.log("Resultado:", JSON.stringify(resultado2, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 3: Caso com brinquedo inválido
console.log("📋 Exemplo 3 - Brinquedo Inválido:");
console.log("Pessoa 1: RATO,UNICORNIO");
console.log("Pessoa 2: BOLA,LASER");
console.log("Animais: Rex");

const resultado3 = abrigo.encontraPessoas(
  "RATO,UNICORNIO",
  "BOLA,LASER",
  "Rex"
);
console.log("Resultado:", JSON.stringify(resultado3, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 4: Caso complexo - Regra dos gatos
console.log("📋 Exemplo 4 - Regra dos Gatos (não dividem brinquedos):");
console.log("Pessoa 1: BOLA,LASER");
console.log("Pessoa 2: RATO,BOLA");
console.log("Animais: Mimi,Zero");

const resultado4 = abrigo.encontraPessoas(
  "BOLA,LASER",
  "RATO,BOLA",
  "Mimi,Zero"
);
console.log("Resultado:", JSON.stringify(resultado4, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 5: Loco com companhia
console.log("📋 Exemplo 5 - Loco com Companhia:");
console.log("Pessoa 1: RATO,BOLA,SKATE (pode pegar Rex + Loco)");
console.log("Pessoa 2: LASER,CAIXA");
console.log("Animais: Loco,Rex");
console.log("💡 Rex vai para Pessoa 1 (tem RATO,BOLA)");
console.log(
  "   Loco vai para Pessoa 1 também (tem RATO,SKATE + companhia do Rex)"
);
console.log("   Resultado: ambos com a mesma pessoa!");

const resultado = abrigo.encontraPessoas(
  "RATO,BOLA,SKATE",
  "LASER,CAIXA",
  "Loco,Rex"
);
console.log("Resultado:", JSON.stringify(resultado, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 5: Loco sem companhia
console.log("📋 Exemplo 6 - Loco sem Companhia:");
console.log("Pessoa 1: RATO,SKATE");
console.log("Pessoa 2: BOLA,LASER");
console.log("Animais: Loco,Rex");

const resultado5 = abrigo.encontraPessoas(
  "RATO,SKATE",
  "BOLA,LASER",
  "Loco,Rex"
);
console.log("Resultado:", JSON.stringify(resultado5, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 6: Animal duplicado
console.log("📋 Exemplo 7 - Animal Duplicado:");
console.log("Pessoa 1: RATO,BOLA");
console.log("Pessoa 2: LASER,CAIXA");
console.log("Animais: Rex,Mimi,Rex"); // Rex aparece duas vezes

const resultado6 = abrigo.encontraPessoas(
  "RATO,BOLA",
  "LASER,CAIXA",
  "Rex,Mimi,Rex"
);
console.log("Resultado:", JSON.stringify(resultado6, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 7: Brinquedo duplicado na Pessoa 1
console.log("📋 Exemplo 8 - Brinquedo Duplicado (Pessoa 1):");
console.log("Pessoa 1: RATO,BOLA,RATO"); // RATO aparece duas vezes
console.log("Pessoa 2: LASER,CAIXA");
console.log("Animais: Rex,Mimi");

const resultado7 = abrigo.encontraPessoas(
  "RATO,BOLA,RATO",
  "LASER,CAIXA",
  "Rex,Mimi"
);
console.log("Resultado:", JSON.stringify(resultado7, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 8: Brinquedo duplicado na Pessoa 2
console.log("📋 Exemplo 9 - Brinquedo Duplicado (Pessoa 2):");
console.log("Pessoa 1: RATO,BOLA");
console.log("Pessoa 2: LASER,LASER,CAIXA"); // LASER aparece duas vezes
console.log("Animais: Rex");

const resultado8 = abrigo.encontraPessoas(
  "RATO,BOLA",
  "LASER,LASER,CAIXA",
  "Rex"
);
console.log("Resultado:", JSON.stringify(resultado8, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

// Exemplo 9: Múltiplos animais duplicados
console.log("📋 Exemplo 10 - Múltiplos Animais Duplicados:");
console.log("Pessoa 1: RATO,BOLA");
console.log("Pessoa 2: LASER");
console.log("Animais: Fofo,Zero,Mimi,Fofo,Zero"); // Fofo e Zero aparecem duas vezes

const resultado9 = abrigo.encontraPessoas(
  "RATO,BOLA",
  "LASER",
  "Fofo,Zero,Mimi,Fofo,Zero"
);
console.log("Resultado:", JSON.stringify(resultado9, null, 2));
console.log("\n" + "=".repeat(50) + "\n");

console.log("✅ Todos os exemplos executados com sucesso!");
