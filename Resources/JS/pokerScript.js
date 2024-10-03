let phase = 0;
let money = parseInt(localStorage.getItem('userMoney')) || 500; // Retrieve money from localStorage
document.getElementById("Money").innerHTML = "$" + money;
let pot = 0;
let deck = [];
let player = [];
let middle = [];
let dealer1 = [];
let dealer2 = [];
let dealer3 = [];

class Card {
    constructor(value, suit) {
        this.value = value; // Number on card
        this.suit = suit;   // Spades, hearts, clubs, diamonds
    }
}

// Start of game
function firstBet() {
    // Check if enough money exists
    if (money >= 100) {
        // Resets everything
        document.getElementById("start").disabled = true;
        document.getElementById("Win").innerHTML = "";
        document.getElementById("Player").innerHTML = "";
        document.getElementById("Enemy 1").innerHTML = "";
        document.getElementById("Enemy 2").innerHTML = "";
        document.getElementById("Enemy 3").innerHTML = "";
        document.getElementById("Middle").innerHTML = "";
        phase = 0;
        pot = 80;
        document.getElementById("pot").innerHTML = "Pot: $" + pot;
        money -= 20;
        updateMoneyDisplay(); // Update display and localStorage

        // Clear cards
        deck = [];
        player = [];
        middle = [];
        dealer1 = [];
        dealer2 = [];
        dealer3 = [];

        // Creates deck
        let suits = ["♠️", "♥️", "♣️", "♦️"];
        for (let i in suits) {
            for (let j = 1; j < 14; j++) {
                deck.push(new Card(j, suits[i]));
            }
        }

        // Draw cards
        shuffleArray(deck);
        draw(player, 2);
        draw(dealer1, 2);
        draw(dealer2, 2);
        draw(dealer3, 2);

        // Shows your hand
        showHand("Player", player);
        // Minimum is 20;
        document.getElementById("betAmount").value = "20";
        document.getElementById("betAmount").max = money;
        document.getElementById("confirmBet").disabled = false;
        phase = 1;
    } else {
        document.getElementById("Money").innerHTML = "$" + money + "  NOT ENOUGH MONEY";
    }
}

function secondBet() {
    // Adds bet to pool
    let bet = document.getElementById("betAmount").value;
    pot += (pay(bet) * 4);
    document.getElementById("pot").innerHTML = "Pot: $" + pot;

    // First draws 3
    if (phase == 1) {
        draw(middle, 3);
        showHand("Middle", middle);
        document.getElementById("betAmount").value = "20";
        document.getElementById("betAmount").max = money;
        phase = 2;
    }
    // Then draws 1
    else if (phase == 2) {
        draw(middle, 1);
        showHand("Middle", middle);
        document.getElementById("betAmount").value = "20";
        document.getElementById("betAmount").max = money;
        phase = 3;
    }
    // Then draws 1
    else if (phase == 3) {
        draw(middle, 1);
        showHand("Middle", middle);
        document.getElementById("betAmount").value = "20";
        document.getElementById("betAmount").max = money;
        document.getElementById("confirmBet").disabled = false;
        phase = 4;
    }
    // Compare hands
    else if (phase == 4) {
        document.getElementById("confirmBet").disabled = true;
        // Gets highest score
        let winningScore = Math.max(
            score(player.concat(middle))[0],
            score(dealer1.concat(middle))[0],
            score(dealer2.concat(middle))[0],
            score(dealer3.concat(middle))[0]
        );

        // Shows hands and shows what hand everyone got
        showHand("Enemy 1", dealer1);
        showHand("Enemy 2", dealer2);
        showHand("Enemy 3", dealer3);
        document.getElementById("Player").innerHTML += score(player.concat(middle))[1];
        document.getElementById("Enemy 1").innerHTML += score(dealer1.concat(middle))[1];
        document.getElementById("Enemy 2").innerHTML += score(dealer2.concat(middle))[1];
        document.getElementById("Enemy 3").innerHTML += score(dealer3.concat(middle))[1];

        // If you win you get money, otherwise you don't
        if (winningScore == score(player.concat(middle))[0]) {
            money += pot;
            document.getElementById("Win").innerHTML = "Win!";
        } else {
            document.getElementById("Win").innerHTML = "Loss...";
        }
        updateMoneyDisplay(); // Update display and localStorage
        document.getElementById("start").disabled = false;
    }
}

// Adds a card to a hand
function draw(array, count) {
    for (let i = 0; i < count; i++) {
        array.push(deck.pop());
    }
}

// Shuffles
function shuffleArray(array) {
    // Shuffles deck
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Fold
function fold() {
    document.getElementById("start").disabled = false;
    document.getElementById("confirmBet").disabled = true;
    showHand("Enemy 1", dealer1);
    showHand("Enemy 2", dealer2);
    showHand("Enemy 3", dealer3);
    while(middle.length<5){
        draw(middle,1);
    }
    showHand("Middle", middle);

}

// Displays hand based on id, and replaces things with letters
function showHand(id, array) {
    let str = "";
    for (let i = 0; i < array.length; i++) {
        str += array[i].value;
        str += array[i].suit;
        str += "  ";
    }
    str = str.replace(/11/g, "J");
    str = str.replace(/12/g, "Q");
    str = str.replace(/13/g, "K");
    str = str.replace(/1/g, "A");
    // Previous thing turns 10 into A0...
    str = str.replace(/A0/g, "10");
    document.getElementById(id).innerHTML = id + ": " + str;
}

// Gets how much money you are betting
function pay(bet) {
    // Need at least 20$ for each betting phase, so limits spending
    if (bet > (money - 20 * (4 - phase))) {
        bet = money - 20 * (4 - phase);
    }
    // Min is 20
    if (bet < 20) { bet = 20; }
    // No decimals
    money -= Math.floor(bet);
    updateMoneyDisplay(); // Update display and localStorage
    return (Math.floor(bet));
}

// Updates money display and localStorage
function updateMoneyDisplay() {
    localStorage.setItem('money', money); // Update local storage
    document.getElementById("Money").innerHTML = "$" + money; // Update displayed money
}

// Calculates score
function score(array) {
    // Breaks into values and suits
    let values = [];
    let suits = [];
    for (let i in array) {
        values.push(array[i].value);
        suits.push(array[i].suit);
    }
    // Finds most common suit
    let flushSuit = mode(suits, true);
    // Creates array of just 1 suit
    let flushArray = [];
    for (let i in array) {
        if (array[i].suit == flushSuit) {
            flushArray.push(array[i].value);
        }
    }
    // Checks for all the hands
    if (flushArray.includes(1) && flushArray.includes(10) && flushArray.includes(11) && flushArray.includes(12) && flushArray.includes(13)) {
        return [10000, "Royal flush"];
    } else if (straight(flushArray)[0] == true) {
        return [(9000 + straight(flushArray)[1]), "  Straight flush"];
    } else if (mode(values, false) >= 4) {
        return [(8000 + mode(values, true)), "  Four of a kind"];
    } else if (mode(values, false) == 3 && modeTwo(values)[1] > 1) {
        return [(7000 + mode(values, true)), "  Full house"];
    } else if (flushArray.length >= 5) {
        return [(6000 + mode(flushArray, true)), "  Flush"];
    } else if (straight(values)[0] == true) {
        return [(5000 + straight(values)[1]), "  Straight"];
    } else if (mode(values, false) == 3) {
        return [(4000 + mode(values, true)), "  Three of a kind"];
    } else if (mode(values, false) == 2 && modeTwo(values)[1] > 1) {
        return [(3000 + mode(values, true)), "  Two pair"];
    } else if (mode(values, false) == 2) {
        return [(2000 + mode(values, true)), "  Pair"];
    } else {
        return [(1000 + mode(values, true)), "  High card"];
    }
}

// Finds the most common value/suit of a hand
function mode(array, element) {
    let bestStreak = 0;
    let bestElement = array[0];
    let currentStreak = 0;
    let currentElement = array[0];
    // Checks every symbol in the array
    for (let i = 0; i < array.length; i++) {
        currentElement = array[i];
        currentStreak = 1;
        // Checks if every other symbol is the same or not
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] == array[j]) {
                currentStreak++;
            }
        }
        // Ace --> 14 instead of 1
        if (currentElement == 1) { currentElement = 14; }
        // If current element has highest streak, replace the best with current
        if ((currentStreak > bestStreak) || (currentStreak == bestStreak && currentElement > bestElement)) {
            bestStreak = currentStreak;
            bestElement = currentElement;
        }
    }
    // Returns element or streak
    return element ? bestElement : bestStreak;
}

// Finds the second mode for two pair and full house
function modeTwo(array) {
    let modeOne = mode(array, true);
    // Create copy of array without first mode
    let temp = [];
    for (let i in array) {
        if (array[i] != modeOne) {
            temp.push(array[i]);
        }
    }
    return [mode(temp, true), mode(temp, false)];
}

// Checks if array has a straight
function straight(array) {
    let current = 0;
    let streak = 1;
    let maxStreak = 1;
    let max = 0;
    // Checks every element
    for (let i = 0; i < array.length; i++) {
        current = array[i];
        // Repeats 4 times
        for (let j = 0; j < 4; j++) {
            // Looks at all elements and finds one that is 1 higher
            for (let k = 0; k < array.length; k++) {
                if (current == array[k] - 1 || (current == 13 && array[k] == 1)) {
                    current = array[k];
                    streak++;
                    // If this is the 5th element in a row, it becomes the maximum
                    if (streak == 5 && (array[k] > max && max != 1) || array[k] == 1) {
                        max = array[k];
                    }
                    break;
                }
            }
        }
        // Records the highest streak
        if (maxStreak < streak) {
            maxStreak = streak;
        }
        streak = 1;
    }
    // Sees if it is a straight
    return maxStreak >= 5 ? [true, max == 1 ? 14 : max] : [false];
}

function back() {
    localStorage.setItem('money', money); // Update local storage
}