// ======================================================
// JOGO DA MEMÓRIA - Versão simplificada
// ======================================================

const cartoes = document.querySelectorAll('.memory-card');

let primeiraCarta = null;
let segundaCarta = null;
let podeClicar = true;
let paresEncontrados = 0;

const totalDePares = cartoes.length / 2;

function virarCarta() {
    if (!podeClicar) return;
    if (this === primeiraCarta) return;

    this.classList.add('flip');

    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;

    verificarPar();
}

function verificarPar() {
    const cartasIguais =
        primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

    if (cartasIguais) {
        manterParEncontrado();
    } else {
        desvirarCartas();
    }
}

function manterParEncontrado() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);

    paresEncontrados++;

    resetarJogada();

    if (paresEncontrados === totalDePares) {
        fimDeJogo();
    }
}

function desvirarCartas() {
    podeClicar = false;

    setTimeout(function() {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetarJogada();
    }, 1000);
}

function resetarJogada() {
    primeiraCarta = null;
    segundaCarta = null;
    podeClicar = true;
}

function embaralharCartas() {
    cartoes.forEach(function(card) {
       const posicaoAleatoria =
    Math.floor(Math.random() * cartoes.length);

card.style.order = posicaoAleatoria;

    });
}

function fimDeJogo() {
    alert('Parabéns! Você encontrou todos os pares!');
}

embaralharCartas();

cartoes.forEach(function(card) {
    card.addEventListener('click', virarCarta);
});
  