const imagens = [
    'red', 'blue', 'green', 'yellow', 'purple', 'pink',
    'red', 'blue', 'green', 'yellow', 'purple', 'pink'
];

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let primeiroCard = null;
let segundoCard = null;
let bloqueio = false;

function verificarPar() {
    if (!primeiroCard || !segundoCard) return;

    const $primeiroBack = primeiroCard.find('.back');
    const $segundoBack = segundoCard.find('.back');

    const corPrimeiro = $primeiroBack.css('background-color');
    const corSegundo = $segundoBack.css('background-color');

    if (corPrimeiro === corSegundo) {
        // Os cards são um par
        primeiroCard.off('click'); // Desativa o clique
        segundoCard.off('click'); // Desativa o clique
        // Reseta o estado para verificar novos pares
        primeiroCard = null;
        segundoCard = null;
        bloqueio = false;
    } else {
        // Os cards não são um par
        bloqueio = true; // Bloqueia novos cliques até que a animação termine
        setTimeout(() => {
            primeiroCard.removeClass('virado');
            segundoCard.removeClass('virado');
            primeiroCard = null;
            segundoCard = null;
            bloqueio = false;
        }, 750);
    }
}

$(document).ready(() => {
    const imagensEmbaralhadas = embaralhar(imagens);

    const $table = $(".table");

    imagensEmbaralhadas.forEach((imagem, index) => {
        const $card = $(
            `<li class="card">
            <div class="front"></div>
            <div class="back" style="background-color: ${imagem};"></div>
            </li>`
        );
        $table.append($card);
    });

    $(".card").click((event) => {
        const $card = $(event.currentTarget);
        
        if ($card.hasClass('virado') || bloqueio) return; // Se o card já estiver virado ou se estiver bloqueado, não faz nada
        
        $card.addClass('virado');

        if (!primeiroCard) {
            primeiroCard = $card;
        } else if (!segundoCard) {
            segundoCard = $card;
            verificarPar();
        }
    });
});
