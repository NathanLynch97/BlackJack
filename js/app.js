/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck(); // call function to form our master deck

const dealerMin = 17;


/*----- app's state (variables) -----*/
let money;

let playerHand; // tracks player values

let dealerHand; // tracks computer values

let shuffledDeck; // allows us to shuffle a deck and store it

let bet; // tracks user bet for use 

/*----- cached element references -----*/
const msg = document.getElementById('msg'); // msg at top

const moneyMsg = document.getElementById('money'); // money tracker on screen

const dealerCards = document.getElementById('dealer-cards'); // dealers visible cards

const playerCards = document.getElementById('player-cards'); // player visible cards


/*----- event listeners -----*/
document.getElementById('button-container').addEventListener('click', handlePlay);

document.getElementById('restart').addEventListener('click', restart);

/*----- functions -----*/
init();

function init() { // declare state variables and shuffle deck, then render
    money = 100;
    bet = 0;
    playerHand = null;
    dealerHand = null;
    shuffleDeck();
    render();
};

function buildMasterDeck() { // for each to use every possible value of both arrays to form 52 card deck
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

function shuffleDeck() { // copy master deck and create new shuffled version
    const tempDeck = [...masterDeck]
    shuffledDeck = [];
    while(tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1) [0]);
    }
};

function handlePlay(e) { // handle click based on inner html of target
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

};

function restart() { // recall init to reset all state variables and board
    init();
};