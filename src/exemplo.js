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

console.log("✅ Exemplos executados com sucesso!");
