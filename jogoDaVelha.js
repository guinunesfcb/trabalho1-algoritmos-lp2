/*
Crie um jogo da velha em JavaScript. O código deverá usar a biblioteca readlineSync para receber dos jogadores as posições de suas jogadas
*/

import readlineSync from 'readline-sync'

let tabuleiro = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let jogadorAtual = 'X';
let jogoAcabou = false;

function exibirTabuleiro() {
    console.clear();
    console.log("== JOGO DA VELHA ==");
    console.log("");
    console.table(tabuleiro)
}

function verificarVencedor() {
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2] && tabuleiro[i][0] !== ' ') {
            return tabuleiro[i][0];
        }
    }

    for (let j = 0; j < 3; j++) {
        if (tabuleiro[0][j] === tabuleiro[1][j] && tabuleiro[1][j] === tabuleiro[2][j] && tabuleiro[0][j] !== ' ') {
            return tabuleiro[0][j];
        }
    }

    if (tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] && tabuleiro[0][0] !== ' ') {
        return tabuleiro[0][0];
    }
    if (tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] && tabuleiro[0][2] !== ' ') {
        return tabuleiro[0][2];
    }

    return null;
}

function verificarEmpate() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

while (!jogoAcabou) {
    exibirTabuleiro();

    console.log(`É a vez do jogador '${jogadorAtual}'`);

    let linha = readlineSync.questionInt('Digite o numero da linha (0, 1 ou 2): ');
    let coluna = readlineSync.questionInt('Digite o numero da coluna (0, 1 ou 2): ');

    if (linha < 0 || linha > 2 || coluna < 0 || coluna > 2 || tabuleiro[linha][coluna] !== ' ') {
        console.log('\nJogada inválida! A casa já está ocupada ou os valores estão incorretos. Pressione ENTER para tentar de novo.');
        readlineSync.question();
        continue;
    }

    tabuleiro[linha][coluna] = jogadorAtual;

    let vencedor = verificarVencedor();
    if (vencedor) {
        exibirTabuleiro();
        console.log(`FIM DE JOGO! O jogador '${vencedor}' venceu!`);
        jogoAcabou = true;
    } else if (verificarEmpate()) {
        exibirTabuleiro();
        console.log('FIM DE JOGO! Deu velha (empate)!');
        jogoAcabou = true;
    } else {
        jogadorAtual = (jogadorAtual === 'X') ? 'O' : 'X';
    }
}