/*----- constants -----*/
// hold vlues that will remain the same throughout the program
const suits = ['s', 'c', 'd', 'h'];

const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck(); // call function to form our master deck

/*----- app's state (variables) -----*/
// declare variables to track the state of the game
let money; // holds player money

let playerHand; // tracks player hand

let playerValue; // tracks value of cards

let dealerHand; // tracks computer hand

let dealerValue; // tracks value of cards

let shuffledDeck; // allows us to shuffle a deck and store it

let bet; // tracks user bet for use 

let win; // win logic tracker

let double; // will track if double has been pressed

/*----- cached element references -----*/
// cache elements that will be called more than once
const msg = document.getElementById('msg'); // msg at top

const moneyMsg = document.getElementById('money'); // money tracker on screen

const betMsg = document.getElementById('bet'); // cache player bet

const dealerCards = document.getElementById('dealer-cards'); // dealers visible cards

const playerCards = document.getElementById('player-cards'); // player visible cards

const betButtons = document.getElementById('bet-buttons'); // cache buttons to change

const playButtons = document.getElementById('play-buttons'); // starts invisible

/*----- event listeners -----*/
// Add event listeners to page to track where a user clicks
document.getElementById('button-container').addEventListener('click', handlePlay); // listener on all 'game' buttons

document.getElementById('restart').addEventListener('click', restart); // listener for restart button

/*----- functions -----*/
// declare all functions used for running the app
init();

function init() { // declare state variables and shuffle deck, then render
    money = 100;
    bet = 0;
    playerHand = null;
    dealerHand = null;
    playerValue = null;
    dealerValue = null;
    win = null;
    shuffleDeck();
    changeButtons();
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

function handlePlay(e) { // handle click on target, will track all 'game' buttons and execute code based on inner HTML
    if (e.target.innerText == 'All In') { 
        if (money == 0) return;
        bet = money;
        money = 0;
        changeButtons();
        dealCards();
    } else if (!isNaN(e.target.innerText)) {
        bet = e.target.innerText;
        if (money < bet) {
            bet = 0;
            return;
        }
        money = money - bet;
        changeButtons();
        dealCards();
    } else if (e.target.innerText == 'Hit') {
        hit();
    } else if (e.target.innerText == 'Stay') {
        winner();
        dealerPlay();
    } else if (e.target.innerText == 'Double') {
        if (money == 0 || double) return;
        double = true;
        money -= bet;
        bet *= 2;
        render();
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
    while (dealerValue < 17) {
        dealerHand.push(shuffledDeck.pop());
        winner();
    }
    render();
};

function winner() { // convert cards to values and compare for winner 
    if (dealerHand.indexOf(null) == 1) {
        dealerValue = 0;
        dealerValue = dealerHand[0].value;
    } else {
        dealerValue = 0;
        dealerHand.forEach(function(card) {
            dealerValue += card.value;
        });
    }
    playerValue = 0;
    playerHand.forEach(function(card) {
        playerValue += card.value;
    })
    if (playerValue > 21) {
        win = "Dealer";
    } else if (dealerHand.indexOf(null) == 1) {
        win = null;
    } else if (dealerValue >= playerValue && dealerValue <= 21) {
        win = "Dealer";
    } else {
        win = "Player";
    }
};

function render() { // render all values to page
    if (playerHand == null) { // render starting blank cards for player
        playerCards.innerHTML = `<div class="card large back-blue"></div><div class="card large back-blue"></div>`;
    } else { // adding div with image class to cards div
        playerCards.innerHTML = '';
        const cardsHtml = playerHand.reduce(function(html, card) {
            return html + `<div class="card large ${card.face}"></div>`
        }, '');
        playerCards.innerHTML = cardsHtml;
    }
    if (dealerHand == null) { // render strarting blank cards for dealer
        dealerCards.innerHTML = `<div class="card large back-blue"></div><div class="card large back-blue"></div>`;
    } else if (dealerHand.indexOf(null) == 1) {
        firstCard = dealerHand[0].face;
        dealerCards.innerHTML = `<div class="card large ${firstCard}"></div><div class="card large back-blue"></div>`;
    } else { // adding div with image class to cards div
        dealerCards.innerHTML = '';
        const cardsHtml = dealerHand.reduce(function(html, card) {
            return html + `<div class="card large ${card.face}"></div>`
        }, '');
        dealerCards.innerHTML = cardsHtml;
    }
    renderMsgs();
    changeButtons();
};

function renderMsgs() { // based on winner and bet status, render messages to page and update variables for new rounds
    if (win == "Player") {
        msg.innerHTML = `${win} is the winner! Bet to play again`;
        money += (bet * 2);
        bet = 0;
        win = null;
        dealerValue = 0;
        playerValue = 0;
        shuffleDeck(); 
    } else if (win == "Dealer") {
        msg.innerHTML = `${win} is the winner! Bet to play again`;
        if (money == 0) {
            msg.innerHTML = `${win} is the winner! Restart?`;
        }
        bet = 0;
        win = null;
        dealerValue = 0;
        playerValue = 0;
        shuffleDeck();
    } else if (bet == 0) {
        msg.innerHTML = `Place your bet!`;
    } else {
        msg.innerHTML = `Make your move`;
    }
    betMsg.innerHTML = `Bet: $${bet}`;
    moneyMsg.innerHTML = `$${money}`;
};

function changeButtons() { // change which buttons are shown on page based on player bet
    if (bet !== 0) {
        betButtons.classList.add("hidden");
        playButtons.classList.remove("hidden");
    } else {
        betButtons.classList.remove("hidden");
        playButtons.classList.add("hidden");
    }
};

function restart() { // recall init to reset all state variables and board
    init();
};