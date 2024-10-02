// Retrieve money from local storage or set default value
let money = parseInt(localStorage.getItem('userMoney')) || 500; 
let deck = [];
let player = [];
let dealer = [];
updateMoney();
startGame();

function startGame() {
    deck = [];
    player = [];
    dealer = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 14; j++) {
            deck.push(j);
        }
    }
    shuffleArray(deck);
    draw(player, deck);
    draw(player, deck);
    draw(dealer, deck);
    draw(dealer, deck);
    checkBust();
}

function end() {
    if (value(player) > 21) { player = [0]; }
    if (value(dealer) > 21) { dealer = [0]; }
    
    if (value(player) > value(dealer)) {
        money += 100;
        document.getElementById('win').innerHTML = "Win!";
    } else if (value(player) == value(dealer)) {
        document.getElementById('win').innerHTML = "Tie";
    } else {
        money -= 100;
        document.getElementById('win').innerHTML = "Lose...";
    }
    updateMoney();
    
    setTimeout(startGame, 1000);
}

function stand() {
    let bust = false;
    
    if (value(player) > 21) {
        bust = true;
    }
    
    while (value(dealer) < 17 && !bust) {
        draw(dealer, deck);
    }
    end();
}

function value(hand) {
    let aces = hand.filter(card => card === 1).length;
    let score = hand.reduce((total, card) => {
        return total + (card > 10 ? 10 : card);
    }, 0);
    
    while (score <= 11 && aces > 0) {
        score += 10;
        aces--;
    }
    
    return score;
}

function draw(array, drawpile) {
    array.push(drawpile.pop());
    document.getElementById('playerHand').innerHTML = faceCardReplace("Player: " + player.join(", "));
    document.getElementById('playerScore').innerHTML = "Score: " + value(player);
    document.getElementById('dealerHand').innerHTML = faceCardReplace("Dealer: " + dealer.join(", "));
    document.getElementById('dealerScore').innerHTML = "Score: " + value(dealer);
    document.getElementById('win').innerHTML = "";
}

function checkBust() {
    if (value(player) > 21) {
        stand();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateMoney() {
    localStorage.setItem('userMoney', money); // Update local storage
    document.getElementById('money').innerHTML = "Money: $" + money;
}

function faceCardReplace(str) {
    return str.replace(/11/g, "J").replace(/12/g, "Q").replace(/13/g, "K").replace(/1/g, "A").replace(/A0/g, "10");
}
