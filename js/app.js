/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];

const value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const dealerMin = 17;


/*----- app's state (variables) -----*/
let money;

let playerValue;

let dealerValue;

/*----- cached element references -----*/
const msg = document.getElementById('msg');

const dealerCards = document.getElementById('dealer-cards');

const playerCards = document.getElementById('player-cards');


/*----- event listeners -----*/



/*----- functions -----*/
init();

function init() {
    money = 100;
    playerValue = null;
    dealerValue = null;
    render();
};
