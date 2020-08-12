/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];

const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck(); // call function to form our master deck

const dealerMin = 17;

/*----- app's state (variables) -----*/
let money;

let playerHand; // tracks player values

let dealerHand; // tracks computer values

let shuffledDeck; // allows us to shuffle a deck and store it

let bet; // tracks user bet for use 

let win; // win logic tracker

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
    win = null;
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
        changeButtons();
        dealCards();
    } else if (!isNaN(e.target.innerText)) {
        bet = e.target.innerText;
        money = money - bet;
        changeButtons();
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

function dealCards() { // deal 2 cards from shuffled deck into playerHand and render to page
    playerHand = shuffledDeck.splice(-2, 2);
    dealerHand = [shuffledDeck.pop(), null];
    render();
};

function hit() { // add 1 card to playerHand from shuffledDeck, check win, render
    playerHand.push(shuffledDeck.pop());
    winner();
    render();
};

function dealerPlay() { // if dealer has 1 face down card, pop it, add 1 card, check win, render
    if (dealerHand.indexOf(null) == 1) {dealerHand.pop()};
    dealerHand.push(shuffledDeck.pop());
    winner();
    render();
};

function winner() {
    let playerValue = playerHand.reduce(function(acc, card) {
        acc += card.value;
    }, 0);
    let dealerValue = dealerHand.reduce(function(acc, card) {
        acc += card.value;
    }, 0);
    if (dealerHand.indexOf(null) == 1) {
        win = null;
    } else if (playerValue <= dealerValue || playerValue > 21) {
        win = 'dealer';
    } else {
        win = 'player';
    }
};

function render() { // render all values to page
    if (playerHand == null) { // render starting blank cards for player
        playerCards.innerHTML = `<div class="card back-blue"></div><div class="card back-blue"></div>`
    }    
    if (dealerHand == null) { // render strarting blank cards for dealer
        dealerCards.innerHTML = `<div class="card back-blue"></div><div class="card back-blue"></div>`
    }

};

function changeButtons() {

}

function restart() { // recall init to reset all state variables and board
    init();
};