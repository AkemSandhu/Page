let money = 500;
document.getElementById('money').innerHTML = "Money: $" + money;
let spinning = false;
const possibleValues = [1, 2, 3, 4, 5, 6, 7];
const slot = [[], [], [], [], []];
let mult = 1;

function spin(bet) {
    if (spinning || bet > money) {
        return; // Prevent spinning if already in progress or not enough money
    }

    spinning = true;
    mult = 1;
    money -= bet;
    document.getElementById('money').innerHTML = "Money: $" + money;

    random(); // Start the random spinning animation
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                slot[i][j] = possibleValues[Math.floor(Math.random() * possibleValues.length)];
            }
        }

        updateSlots();
        checkMatches(bet); // Check for matches and update money
        spinning = false; // Allow new spin after 1 second
    }, 3400);
}

function updateSlots() {
    document.getElementById('slot1').innerHTML = slot.map(row => row[0]).join("  ");
    document.getElementById('slot2').innerHTML = slot.map(row => row[1]).join("  ");
    document.getElementById('slot3').innerHTML = slot.map(row => row[2]).join("  ");
}

function checkMatches(bet) {
    let sevens = 1;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            if (slot[i][j] === 7) {
                sevens *= (sevens + 1);
            }
        }
    }

    // Highlight sevens
    highlightSevens();

    // Calculate winnings
    mult *= sevens;
    if (mult > 1) {
        money += mult * bet;
    }
    document.getElementById('money').innerHTML = "Money: $" + money;
}

function highlightSevens() {
    ['slot1', 'slot2', 'slot3'].forEach(slotId => {
        document.getElementById(slotId).innerHTML = document.getElementById(slotId).innerHTML.replace(/7/g, '<span style="color: red;">7</span>');
    });
}

function random() {
    for (let i = 0; i < 45; i++) {
        setTimeout(() => {
            document.getElementById('slot1').innerHTML = Array.from({ length: 5 }, () => Math.ceil(Math.random() * 7)).join("  ");
            document.getElementById('slot2').innerHTML = Array.from({ length: 5 }, () => Math.ceil(Math.random() * 7)).join("  ");
            document.getElementById('slot3').innerHTML = Array.from({ length: 5 }, () => Math.ceil(Math.random() * 7)).join("  ");
        }, i * 75);
    }
}
