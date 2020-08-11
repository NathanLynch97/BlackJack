/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();

const dealerMin = 17;


/*----- app's state (variables) -----*/
let money;

let playerHand;

let dealerHand;

let shuffledDeck;

let bet;

/*----- cached element references -----*/
const msg = document.getElementById('msg');

const moneyMsg = document.getElementById('money');

const dealerCards = document.getElementById('dealer-cards');

const playerCards = document.getElementById('player-cards');


/*----- event listeners -----*/
document.getElementById('button-container').addEventListener('click', handlePlay);


/*----- functions -----*/
init();

function init() {
    money = 100;
    bet = 0;
    playerHand = null;
    dealerHand = null;
    shuffleDeck();
    render();
};

function buildMasterDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            });
        });
    });
    return deck;
};

function shuffleDeck() {
    const tempDeck = [...masterDeck]
    shuffledDeck = [];
    while(tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1) [0]);
    }
};

function handlePlay(e) {
    if (e.target.innerText == 'All In') {
        bet = money;
        money = 0;
        dealCards();
    } else if (!isNaN(e.target.innerText)) {
        bet = e.target.innerText;
        money = money - bet;
        dealCards();
    } else if (e.target.innerText == 'Hit') {
        hit();
    } else if (e.target.innerText == 'Stay') {
        dealerPlay();
    } else if (e.target.innerText == 'Double') {
        bet *= 2;
    } else {
        return;
    }
};

function dealCards() {

};

function hit() {

};

function dealerPlay() {

};

function render() {
    
}