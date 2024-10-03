// Retrieve money from local storage or set default value
let money = parseInt(localStorage.getItem('userMoney')) || 500; 
document.getElementById('money').innerHTML = "Money: $" + money;
let spinning = false;
const possibleValues = [1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6, 7];
const slot = [[], [], [], [], []];
let mult = 1;

function spin(bet) {
    if (spinning || bet > money) {
        return; // Prevent spinning if already in progress or not enough money
    }

    spinning = true;
    mult = 1;
    money -= bet;
    updateMoneyDisplay();

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
                sevens *= 2;
            }
        }
    }

    // Highlight sevens
    highlightSevens();

    for(let i = 0; i<3; i++){
        let row = i;
        let column = 0;
        let current = slot[row][column];
        adjacent(row,column,current);
    }


    // Calculate winnings
    mult *= sevens;
    if (mult > 1) {
        money += mult * bet;
    }
    updateMoneyDisplay();
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

function updateMoneyDisplay() {
    localStorage.setItem('userMoney', money); // Update local storage
    document.getElementById('money').innerHTML = "Money: $" + money;
}
function adjacent(row,column,current){
    //checks for last row
    if(column!=4){
        //checks whether or not symbol is on the edge
        let j = -1;
        let k = 1;
        if(row==0){j=0}
        if(row==2){k=0}
       
        //checks for adjacent matches
        for(i = j; i<=k; i++){
            if(slot[column+1][row+i] == slot[column][row]){
                adjacent(row+i,column+1,slot[column][row])
                };
        }
    }
    //getting here means it got to the end succesfully
    else{
        //increases score based on how many correct symbols exist
        multCount = 0
        for(let i = 0; i<5; i++){
            for(let j = 0; j < 3; j++){
                if(slot[i][j]==current){
                    multCount+=1
                }
            }
        }
        //increases money
        mult *= multCount-3
        //highlights correct symbols
        document.getElementById('slot1').innerHTML = document.getElementById('slot1').innerHTML.replaceAll(''+current, '<span style="color: red;">'+current+'</span>');
        document.getElementById('slot2').innerHTML = document.getElementById('slot2').innerHTML.replaceAll(''+current, '<span style="color: red;">'+current+'</span>');
        document.getElementById('slot3').innerHTML = document.getElementById('slot3').innerHTML.replaceAll(''+current, '<span style="color: red;">'+current+'</span>');
    }
}

