import { AbrigoAnimais } from "./abrigo-animais";

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
      "RATO,OUTRO,SKATE", // ordem diferente, mas Loco não liga se houver companhia
      "BOLA",
      "Loco,Mimi" // Mimi (gato) = companhia
    );
    console.log(res.erro);
    expect(res.erro).toBeFalsy();
    // Ordenado alfabeticamente
    expect(res.lista).toContain("Loco - pessoa 1");
  });

  test("Empate: ambas as pessoas satisfazem -> abrigo", () => {
    const res = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(res.erro).toBeFalsy();
    expect(res.lista).toEqual(["Rex - abrigo"]);
  });

  test("Gatos não dividem seus brinquedos", () => {
    // Fofo e Mimi compartilham brinquedos (BOLA/LASER/RATO)
    // Só um gato pode usar um brinquedo favorito; o outro deve falhar/ir pro abrigo
    const res = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER,RATO",
      "BOLA,LASER,RATO",
      "Mimi,Fofo"
    );
    expect(res.erro).toBeFalsy();
    // Um dos gatos vai pro abrigo; o outro fica com alguém
    const adotados = res.lista.filter((x) => x.includes("pessoa"));
    const abrigos = res.lista.filter((x) => x.includes("abrigo"));
    expect(adotados.length).toBe(1);
    expect(abrigos.length).toBe(1);
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
});
