/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();

const dealerMin = 17;


/*----- app's state (variables) -----*/
let money;

let playerValue;

let dealerValue;

let shuffledDeck;

/*----- cached element references -----*/
const msg = document.getElementById('msg');

const moneyMsg = document.getElementById('money');

const dealerCards = document.getElementById('dealer-cards');

const playerCards = document.getElementById('player-cards');


/*----- event listeners -----*/



/*----- functions -----*/
// init();

// function init() {
//     money = 100;
//     playerValue = null;
//     dealerValue = null;
//     render();
// };

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
}
