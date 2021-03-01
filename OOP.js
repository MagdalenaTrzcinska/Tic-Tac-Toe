class Game {
    start = document.querySelector('#start');
    reset = document.querySelector('#newGame');
    howMuchDiscovered = 0;

    whichPlayer = Math.floor(Math.random() * 2);
    cards = document.getElementsByClassName('card');

    whoTurn = document.getElementById('whoTurn');

    pairs = [0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        0, 4, 8,
        2, 4, 6,
        0, 3, 6,
        1, 4, 7,
        2, 5, 8];

    pkt = {
        OnePlayer: 0,
        TwoPlayer: 0,
        Tie: 0
    };
    constructor() {
        this.cards = [...this.cards];
    }

    starting() {
        this.start.addEventListener('click', this.onNewGame.bind(this));
        this.reset.addEventListener('click', this.removeGame.bind(this));
    }

    onNewGame() {
        document.querySelector('.article').style.display = 'block';
        document.querySelector('.header').style.display = 'none';
        this.newRound();
        this.addEventListenerToCards();
    }

    removeGame() {
        this.howMuchDiscovered = 0;
        document.querySelector('#first').innerHTML = 'Player 1: ';
        document.querySelector('#second').innerHTML = 'Player 2: ';
        document.querySelector('#tie').innerHTML = 'Tie: ';
        this.removeClass();
    }

    newRound() {
        setTimeout(() => {
            this.whichPlayer === 0 ? this.whoTurn.innerHTML = "FIRST PLAYER" : this.whoTurn.innerHTML = "SECOND PLAYER";
        }, 500);
    }

    addEventListenerToCards() {
        this.cards.forEach((card) => {
            card.addEventListener("click", this.clickCardTwoPlayers.bind(this));
        })
    }

    clickCardTwoPlayers(e) {
        e.target.classList.add('circle' + this.whichPlayer);
        this.howMuchDiscovered++;
        e.target.removeEventListener("click", this.clickCardTwoPlayers);


        if (this.verification("circle" + this.whichPlayer) === true) {
            this.addPkt(this.whichPlayer);
        } else {
            this.whichPlayer === 0 ? this.whichPlayer = 1 : this.whichPlayer = 0;
        }

        if (this.howMuchDiscovered === 9 && this.verification("circle0") === false && this.verification("circle1") === false) {
            this.pkt.Tie++;
            document.getElementById('tie').innerHTML = "Tie: " + this.pkt.Tie;
            setTimeout(this.removeClass.bind(this), 700);
        }

        this.newRound();

    }

    addPkt(whichPlayer) {
        if (whichPlayer === 0) {
            this.firstPlayerWon();
        }
        if (whichPlayer === 1) {
            this.secondPlayerWon();
        }
        setTimeout(this.removeClass.bind(this), 700);
    }

    removeClass() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.remove('circle0');
            this.cards[i].classList.remove('circle1');
        }

        this.addEventListenerToCards();
    }

    firstPlayerWon() {
        this.pkt.OnePlayer++;
        document.getElementById('first').innerHTML = "Player 1 : " + this.pkt.OnePlayer;
    }

    secondPlayerWon() {
        this.pkt.TwoPlayer++;
        document.getElementById('second').innerHTML = "Player 2 : " + this.pkt.TwoPlayer;
    }


    verification(active) {
        for (let i = 0; i < this.pairs.length; i = i + 3) {
            if (this.cards[this.pairs[i]].classList.contains(active) && this.cards[this.pairs[i + 1]].classList.contains(active)
                && this.cards[this.pairs[i + 2]].classList.contains(active)) {
                return true;
            }
        }
        return false;
    }
}

const game = new Game();
game.starting();
