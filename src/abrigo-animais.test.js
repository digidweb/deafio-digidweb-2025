import { AbrigoAnimais } from "./abrigo-animais.js";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });
});

describe("Casos adicionais do desafio", () => {
  test("Exemplo do enunciado (válido): 'RATO,BOLA','RATO,NOVELO','Rex,Fofo'", () => {
    const res = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(res.erro).toBeFalsy();
    expect(res.lista.sort()).toEqual(
      ["Fofo - abrigo", "Rex - pessoa 1"].sort()
    );
  });

  test("Loco com companhia sendo GATO (deve aceitar) e sem exigir ordem", () => {
    // Pessoa 1 tem SKATE e RATO fora de ordem; Pessoa 2 não ajuda
    const res = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO,BOLA", // ordem diferente, mas Loco não liga se houver companhia
      "LASER", // pessoa 2 não tem os brinquedos do Loco
      "Loco,Mimi" // Mimi (gato) = companhia
    );
    expect(res.erro).toBeFalsy();
    // Ordenado alfabeticamente
    expect(res.lista).toContain("Loco - pessoa 1");
  });

  test("Gatos não dividem seus brinquedos", () => {
    // Cenário que realmente testa a regra dos gatos não dividirem brinquedos
    // Mimi precisa: ["BOLA", "LASER"]
    // Zero precisa: ["RATO", "BOLA"]
    // Ambos compartilham "BOLA" - só um pode ser adotado

    const res = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER,RATO", // pessoa 1 pode atender ambos os gatos
      "NOVELO,CAIXA", // pessoa 2 não pode atender nenhum gato
      "Mimi,Zero" // dois gatos que compartilham "BOLA"
    );

    expect(res.erro).toBeFalsy();
    console.log("Resultado:", res.lista); // Para debug

    // Primeiro gato (Mimi) será adotado pela pessoa 1
    // Segundo gato (Zero) não pode ser adotado porque "BOLA" já foi usada
    const adotados = res.lista.filter((x) => x.includes("pessoa"));
    const abrigos = res.lista.filter((x) => x.includes("abrigo"));

    expect(adotados.length).toBe(1); // Apenas Mimi é adotado
    expect(abrigos.length).toBe(1); // Zero vai para o abrigo
    expect(res.lista).toContain("Mimi - pessoa 1");
    expect(res.lista).toContain("Zero - abrigo");
  });

  // Teste alternativo que demonstra melhor o cenário do empate
  test("Empate real: ambas as pessoas podem adotar o mesmo animal", () => {
    const res = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA", // pode adotar Rex
      "RATO,BOLA", // também pode adotar Rex
      "Rex" // apenas um animal
    );

    expect(res.erro).toBeFalsy();
    expect(res.lista).toEqual(["Rex - abrigo"]); // Empate = abrigo
  });

  // Teste que demonstra o caso original que estava falhando
  test("Dois gatos com brinquedos iguais - ambas pessoas podem atender", () => {
    // Este é o caso que estava falhando no teste original
    const res = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER,RATO", // pode atender ambos os gatos
      "BOLA,LASER,RATO", // também pode atender ambos os gatos
      "Mimi,Fofo" // dois gatos
    );

    expect(res.erro).toBeFalsy();

    // Neste caso, devido ao empate (Regra 4), ambos vão para o abrigo
    // A regra dos gatos não se aplica porque nenhum gato é adotado
    expect(res.lista).toEqual(["Fofo - abrigo", "Mimi - abrigo"]);

    const adotados = res.lista.filter((x) => x.includes("pessoa"));
    const abrigos = res.lista.filter((x) => x.includes("abrigo"));

    expect(adotados.length).toBe(0); // Nenhum é adotado (empate)
    expect(abrigos.length).toBe(2); // Ambos vão para o abrigo
  });

  test("Limite de 3 animais por pessoa (o 4º não pode)", () => {
    // Pessoa 1 atende 4 animais em sequência; o 4º deve ir pro abrigo ou pessoa 2
    const res = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,CAIXA,NOVELO,SKATE",
      "RATO,BOLA,LASER,CAIXA,NOVELO,SKATE",
      "Rex,Bebe,Bola,Zero" // 4 animais
    );
    expect(res.erro).toBeFalsy();
    const p1 = res.lista.filter((x) => x.endsWith("pessoa 1"));
    expect(p1.length).toBeLessThanOrEqual(3);
  });

  // Teste adicional para verificar brinquedo inválido
  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,UNICORNIO", // UNICORNIO não é válido
      "BOLA,LASER",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  // Teste adicional para verificar duplicata de brinquedo
  test("Deve rejeitar brinquedos duplicados", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,RATO", // duplicata
      "BOLA,LASER",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  // Teste adicional para verificar duplicata de animal
  test("Deve rejeitar animais duplicados", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "LASER,NOVELO",
      "Rex,Rex" // duplicata
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });
});
