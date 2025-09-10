class AbrigoAnimais {
  constructor() {
    // Definindo os animais e seus brinquedos favoritos
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    // Brinquedos válidos
    this.brinquedosValidos = [
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE",
    ];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, animaisStr) {
    try {
      // Validar e processar entrada
      const pessoa1 = this.processarBrinquedos(brinquedosPessoa1);
      const pessoa2 = this.processarBrinquedos(brinquedosPessoa2);
      const animaisConsiderados = this.processarAnimais(animaisStr);

      // Processar adoções
      const resultados = this.processarAdocoes(
        pessoa1,
        pessoa2,
        animaisConsiderados
      );

      return { lista: resultados };
    } catch (error) {
      return { erro: error.message };
    }
  }

  processarBrinquedos(brinquedosStr) {
    if (!brinquedosStr.trim()) {
      return [];
    }

    const brinquedos = brinquedosStr.split(",").map((b) => b.trim());

    // Verificar se há duplicatas
    const brinquedosUnicos = new Set(brinquedos);
    if (brinquedos.length !== brinquedosUnicos.size) {
      throw new Error("Brinquedo inválido");
    }

    // Verificar se todos os brinquedos são válidos
    for (const brinquedo of brinquedos) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        throw new Error("Brinquedo inválido");
      }
    }

    return brinquedos;
  }

  processarAnimais(animaisStr) {
    if (!animaisStr.trim()) {
      return [];
    }

    const animais = animaisStr.split(",").map((a) => a.trim());

    // Verificar se há duplicatas
    const animaisUnicos = new Set(animais);
    if (animais.length !== animaisUnicos.size) {
      throw new Error("Animal inválido");
    }

    // Verificar se todos os animais são válidos
    for (const animal of animais) {
      if (!this.animais[animal]) {
        throw new Error("Animal inválido");
      }
    }

    return animais;
  }

  processarAdocoes(pessoa1, pessoa2, animaisConsiderados) {
    const resultados = [];
    const contadorAnimaisPessoa1 = { count: 0 };
    const contadorAnimaisPessoa2 = { count: 0 };
    const brinquedosUsadosGatos = new Set();

    for (const nomeAnimal of animaisConsiderados) {
      const animal = this.animais[nomeAnimal];
      let adotante = this.determinarAdotante(
        nomeAnimal,
        animal,
        pessoa1,
        pessoa2,
        contadorAnimaisPessoa1,
        contadorAnimaisPessoa2,
        brinquedosUsadosGatos,
        animaisConsiderados
      );

      resultados.push(`${nomeAnimal} - ${adotante}`);
    }

    // Ordenar alfabeticamente
    resultados.sort();
    return resultados;
  }

  determinarAdotante(
    nomeAnimal,
    animal,
    pessoa1,
    pessoa2,
    contador1,
    contador2,
    brinquedosUsadosGatos,
    todosAnimais
  ) {
    // Verificar se as pessoas já têm 3 animais
    const pessoa1PodeAdotar = contador1.count < 3;
    const pessoa2PodeAdotar = contador2.count < 3;

    if (!pessoa1PodeAdotar && !pessoa2PodeAdotar) {
      return "abrigo";
    }

    // Verificar se a pessoa pode satisfazer as necessidades do animal
    let pessoa1Satisfaz =
      pessoa1PodeAdotar &&
      this.pessoaSatisfazAnimal(
        nomeAnimal,
        animal,
        pessoa1,
        brinquedosUsadosGatos,
        todosAnimais
      );
    let pessoa2Satisfaz =
      pessoa2PodeAdotar &&
      this.pessoaSatisfazAnimal(
        nomeAnimal,
        animal,
        pessoa2,
        brinquedosUsadosGatos,
        todosAnimais
      );

    // Regra 4: Se ambas podem adotar, ninguém fica com o animal
    if (pessoa1Satisfaz && pessoa2Satisfaz) {
      return "abrigo";
    }

    if (pessoa1Satisfaz) {
      contador1.count++;
      // Se é gato, marcar brinquedos como usados
      if (animal.tipo === "gato") {
        animal.brinquedos.forEach((b) => brinquedosUsadosGatos.add(b));
      }
      return "pessoa 1";
    }

    if (pessoa2Satisfaz) {
      contador2.count++;
      // Se é gato, marcar brinquedos como usados
      if (animal.tipo === "gato") {
        animal.brinquedos.forEach((b) => brinquedosUsadosGatos.add(b));
      }
      return "pessoa 2";
    }

    return "abrigo";
  }

  pessoaSatisfazAnimal(
    nomeAnimal,
    animal,
    brinquedosPessoa,
    brinquedosUsadosGatos,
    todosAnimais
  ) {
    // Regra 3: Gatos não dividem brinquedos
    if (animal.tipo === "gato") {
      for (const brinquedo of animal.brinquedos) {
        if (brinquedosUsadosGatos.has(brinquedo)) {
          return false;
        }
      }
    }

    // Regra 6: Loco não se importa com ordem se tiver companhia
    if (nomeAnimal === "Loco") {
      // Verificar se há outros animais não-gato na lista (companhia válida)
      const temCompanhia = todosAnimais.some((nome) => {
        if (nome === "Loco") return false;
        const outroAnimal = this.animais[nome];
        return outroAnimal && outroAnimal.tipo !== "gato";
      });

      if (temCompanhia) {
        // Loco só precisa que a pessoa tenha seus brinquedos, independente da ordem
        return animal.brinquedos.every((brinquedo) =>
          brinquedosPessoa.includes(brinquedo)
        );
      }
    }

    // Regra 1 e 2: Verificar se a pessoa tem os brinquedos na ordem desejada
    return this.temBrinquedosNaOrdem(animal.brinquedos, brinquedosPessoa);
  }

  temBrinquedosNaOrdem(brinquedosDesejados, brinquedosPessoa) {
    let indicePessoa = 0;
    let indiceDesejado = 0;

    while (
      indicePessoa < brinquedosPessoa.length &&
      indiceDesejado < brinquedosDesejados.length
    ) {
      if (
        brinquedosPessoa[indicePessoa] === brinquedosDesejados[indiceDesejado]
      ) {
        indiceDesejado++;
      }
      indicePessoa++;
    }

    return indiceDesejado === brinquedosDesejados.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
