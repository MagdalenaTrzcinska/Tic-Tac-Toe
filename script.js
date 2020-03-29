let whichPlayer;
let pktOnePlayer, pktTwoPlayer, pktTie, position, cards, howMuchDiscovered, whoTurn;


pktOnePlayer = 0;
pktTwoPlayer = 0;
pktTie = 0;
whoTurn = document.getElementById('whoTurn');
cards = document.getElementsByClassName('card');
cards = [...cards];
howMuchDiscovered = 0;


function newGame() {
    document.querySelector('.article').style.display = 'block';
    document.querySelector('.header').style.display = 'none';

    document.querySelector('#first').innerHTML = 'Player 1: ';
    document.querySelector('#second').innerHTML = 'Player 2: ';
    document.querySelector('#tie').innerHTML = 'Tie: ';
    removeClass();
    newRound();


}

function removeClass() {
    whichPlayer = Math.floor(Math.random() * 2);
    howMuchDiscovered = 0;

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('circle0');
        cards[i].classList.remove('circle1');
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", clickCardTwoPlayers);
    }
}


function newRound() {
    setTimeout(function () {
        if (whichPlayer === 0) {
            whoTurn.innerHTML = "FIRST PLAYER";
        } else {
            whoTurn.innerHTML = "SECOND PLAYER";
        }
    }, 500);

}

function clickCardTwoPlayers() {

    this.classList.add('circle' + whichPlayer);
    howMuchDiscovered++;
    this.removeEventListener("click", clickCardTwoPlayers);
    if (verification("circle" + whichPlayer) === true) {
        if (whichPlayer == 0) {
            pktOnePlayer++;
            document.getElementById('first').innerHTML = "Player 1 : " + pktOnePlayer;

            setTimeout(removeClass, 700);

        }
        if (whichPlayer == 1) {
            pktTwoPlayer++;
            document.getElementById('second').innerHTML = "Player 2 : " + pktTwoPlayer;
            setTimeout(removeClass, 700);
            whichPlayer = 0;
        } 

    }else {
        whichPlayer == 0 ? whichPlayer = 1 : whichPlayer = 0;
    }

    if (howMuchDiscovered === 9 && verification("circle0") === false && verification("circle1") === false) {
        pktTie++;
        document.getElementById('tie').innerHTML = "Tie: " + pktTie;
        setTimeout(removeClass, 700);

    }


    newRound();
}

const pairs = [0, 1, 2,
    3, 4, 5,
    6, 7, 8,
    0, 4, 8,
    2, 4, 6,
    0, 3, 6,
    1, 4, 7,
    2, 5, 8];

function verification(active) {

    for (let i = 0; i < pairs.length; i = i + 3) {
        if (cards[pairs[i]].classList.contains(active) && cards[pairs[i + 1]].classList.contains(active) && cards[pairs[i + 2]].classList.contains(active)) {
            return true;
        }
    }
    return false;
}

