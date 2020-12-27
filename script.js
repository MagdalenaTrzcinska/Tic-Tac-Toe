let cards, howMuchDiscovered, whoTurn, whichPlayer, pkt;
pkt = {
    OnePlayer: 0,
    TwoPlayer: 0,
    Tie: 0
};
whoTurn = document.getElementById('whoTurn');
cards = document.getElementsByClassName('card');
cards = [...cards];
howMuchDiscovered = 0;
whichPlayer = Math.floor(Math.random() * 2);
const pairs = [0, 1, 2,
    3, 4, 5,
    6, 7, 8,
    0, 4, 8,
    2, 4, 6,
    0, 3, 6,
    1, 4, 7,
    2, 5, 8];


function onNewGame() {
    document.querySelector('.article').style.display = 'block';
    document.querySelector('.header').style.display = 'none';
    newRound();
    addEventListenerToCards();
}

function removeGame() {
    howMuchDiscovered = 0;
    document.querySelector('#first').innerHTML = 'Player 1: ';
    document.querySelector('#second').innerHTML = 'Player 2: ';
    document.querySelector('#tie').innerHTML = 'Tie: ';
    removeClass();
}

function removeClass() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('circle0');
        cards[i].classList.remove('circle1');
    }
    addEventListenerToCards();
}

function addEventListenerToCards() {
    cards.forEach((card) => {
        card.addEventListener("click", clickCardTwoPlayers);
    })
}

function newRound() {
    setTimeout(() => {
        whichPlayer === 0 ? whoTurn.innerHTML = "FIRST PLAYER" : whoTurn.innerHTML = "SECOND PLAYER";
    }, 500);
}

function clickCardTwoPlayers() {
    this.classList.add('circle' + whichPlayer);
    howMuchDiscovered++;
    this.removeEventListener("click", clickCardTwoPlayers);
    if (verification("circle" + whichPlayer) === true) {
        addPkt(whichPlayer);
    } else {
        whichPlayer === 0 ? whichPlayer = 1 : whichPlayer = 0;
    }

    if (howMuchDiscovered === 9 && verification("circle0") === false && verification("circle1") === false) {
        pkt.Tie++;
        document.getElementById('tie').innerHTML = "Tie: " + pkt.Tie;
        setTimeout(removeClass, 700);
    }
    newRound();
}

function verification(active) {
    for (let i = 0; i < pairs.length; i = i + 3) {
        if (cards[pairs[i]].classList.contains(active) && cards[pairs[i + 1]].classList.contains(active)
            && cards[pairs[i + 2]].classList.contains(active)) {
            return true;
        }
    }
    return false;
}

function addPkt(whichPlayer) {
    if (whichPlayer === 0) {
        firstPlayerWon();
    }
    if (whichPlayer === 1) {
        secondPlayerWon();
    }
    setTimeout(removeClass, 700);
}

function firstPlayerWon() {
    pkt.OnePlayer++;
    document.getElementById('first').innerHTML = "Player 1 : " + pkt.OnePlayer;
}

function secondPlayerWon() {
    pkt.TwoPlayer++;
    document.getElementById('second').innerHTML = "Player 2 : " + pkt.TwoPlayer;
}
