// Variáveis globais
let dsVersao = "1.0.0.0";
let listaNumSorte = []; // Array para armazenar números já sorteados
let numLimite = 100; // Limite máximo para o número secreto
let numeroSecreto = gerarNumAleatorio(); // Gera o primeiro número secreto
let tentativas = 1; // Contador de tentativas do jogador

/**
 * Exibe texto em um elemento HTML específico e o reproduz em áudio
 * @param {string} tag - Seletor do elemento HTML
 * @param {string} texto - Texto a ser exibido e reproduzido
 */
function exibirTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

/**
 * Inicializa as mensagens do jogo
 */
function exibirMensagemInicial() {
  exibirTexto("h1", "Jogo do número secreto");
  exibirTexto("p", "Escolha um número entre 1 e 100");
}

// Chama a função de inicialização ao carregar o jogo
exibirMensagemInicial();

/**
 * Verifica se o chute do jogador está correto
 * e atualiza a interface do jogo
 */
function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    // Caso acerte o número
    exibirTexto("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativas";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTexto("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    // Caso erre o número
    if (chute > numeroSecreto) {
      exibirTexto("p", "O número secreto é menor.");
    } else {
      exibirTexto("p", "O número secreto é Maior");
    }
    tentativas++;
    limparCampo();
  }
}

/**
 * Gera um número aleatório único entre 1 e numLimite
 * @returns {number} Número aleatório gerado
 */
function gerarNumAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numLimite + 1);
  let qtElemento = listaNumSorte.length;

  // Reinicia a lista se todos os números possíveis já foram sorteados
  if (qtElemento == numLimite) {
    listaNumSorte = [];
  }

  // Verifica se o número já foi sorteado anteriormente
  if (listaNumSorte.includes(numeroEscolhido)) {
    return gerarNumAleatorio(); // Recursão para gerar novo número
  } else {
    listaNumSorte.push(numeroEscolhido);
    console.log(listaNumSorte);
    return numeroEscolhido;
  }
}

/**
 * Limpa o campo de input do jogador
 */
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

/**
 * Reinicia o jogo para uma nova partida
 */
function reinciarJogo() {
  numeroSecreto = gerarNumAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
