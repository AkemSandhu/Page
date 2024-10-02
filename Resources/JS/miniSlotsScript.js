const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const moneyElement = document.getElementById("money");
const numbers = [0, 3, 4, 1, 2, 5, 6, 7, 8];
let randomSlot1;
let randomSlot2;
let sevenOne = false;
let sevenTwo = false;
let win = -1;
let slotIndex1;
let slotIndex2;
let slotIndex3;
let isSpinning = false;

// Retrieve money from local storage or set default value
let money = parseInt(localStorage.getItem('userMoney')) || 1000;
moneyElement.innerText = money;

const slots = [slot1, slot2, slot3];

function chords(index) {
    return [index % 3, Math.floor(index / 3)];
}

function button() {
    if (isSpinning || money < 50) {
        return;
    }

    money -= 50;
    updateMoneyDisplay();

    if (Math.floor(Math.random() * 10) === 1) {
        money += 100;
        win = Math.floor(Math.random() * 6) + 3;
    } else if (Math.floor(Math.random() * 50) === 1) {
        money += 500;
        win = 1;
    } else if (Math.floor(Math.random() * 500) === 1) {
        money += 1000;
        win = 2;
    } else if (Math.floor(Math.random() * 1000) === 1) {
        money += 10000;
        win = 0;
    } else if (Math.floor(Math.random() * 5) === 1) {
        money += 25;
        sevenOne = true;
        randomSlot1 = Math.floor(Math.random() * 3);
    } else if (Math.floor(Math.random() * 10) === 1) {
        money += 50;
        sevenTwo = true;
        randomSlot1 = Math.floor(Math.random() * 3);
        randomSlot2 = Math.floor(Math.random() * 3);
        while (randomSlot1 === randomSlot2) {
            randomSlot2 = Math.floor(Math.random() * 3);
        }
    }

    setTimeout(() => {
        roll(0);
    }, 0);

    setTimeout(() => {
        roll(1);
    }, 1000);

    setTimeout(() => {
        roll(2);
    }, 2000);

    setTimeout(() => {
        isSpinning = false;
        win = -1;
        sevenOne = false;
        sevenTwo = false;
        updateMoneyDisplay();
    }, 6600);
}

function roll(slotId) {
    let slot = slots[slotId];
    isSpinning = true;
    for (let i = 0; i < 44; i++) {
        setTimeout(() => {
            let slotIndex = numbers[Math.floor(Math.random() * numbers.length)];
            let slotChords = chords(slotIndex);
            slotChords[0] *= -400;
            slotChords[1] *= -400;

            slot.style.marginLeft = slotChords[0] + "px";
            slot.style.marginTop = slotChords[1] + "px";
        }, i * 100);
    }

    setTimeout(() => {
        if (win !== -1) {
            let slotChords = chords(numbers[win]);
            slotChords[0] *= -400;
            slotChords[1] *= -400;

            slot.style.marginLeft = slotChords[0] + "px";
            slot.style.marginTop = slotChords[1] + "px";
        } else if (sevenOne) {
            if (randomSlot1 === slotId) {
                let slotChords = chords(0);
                slotChords[0] *= -400;
                slotChords[1] *= -400;

                slot.style.marginLeft = slotChords[0] + "px";
                slot.style.marginTop = slotChords[1] + "px";
            }
        } else if (sevenTwo) {
            if (randomSlot1 === slotId || randomSlot2 === slotId) {
                let slotChords = chords(0);
                slotChords[0] *= -400;
                slotChords[1] *= -400;

                slot.style.marginLeft = slotChords[0] + "px";
                slot.style.marginTop = slotChords[1] + "px";
            }
        } else if (slotId === 0) {
            slotIndex1 = numbers[Math.floor(Math.random() * (numbers.length - 1)) + 1];
            let slotChords = chords(slotIndex1);
            slotChords[0] *= -400;
            slotChords[1] *= -400;

            slot.style.marginLeft = slotChords[0] + "px";
            slot.style.marginTop = slotChords[1] + "px";
        } else if (slotId === 1) {
            slotIndex2 = numbers[Math.floor(Math.random() * (numbers.length - 1)) + 1];
            while (slotIndex1 === slotIndex2) {
                slotIndex2 = numbers[Math.floor(Math.random() * (numbers.length - 1)) + 1];
            }

            let slotChords = chords(slotIndex2);
            slotChords[0] *= -400;
            slotChords[1] *= -400;

            slot.style.marginLeft = slotChords[0] + "px";
            slot.style.marginTop = slotChords[1] + "px";
        } else if (slotId === 2) {
            slotIndex3 = numbers[Math.floor(Math.random() * (numbers.length - 1)) + 1];
            while (slotIndex1 === slotIndex3 || slotIndex2 === slotIndex3) {
                slotIndex3 = numbers[Math.floor(Math.random() * (numbers.length - 1)) + 1];
            }

            let slotChords = chords(slotIndex3);
            slotChords[0] *= -400;
            slotChords[1] *= -400;

            slot.style.marginLeft = slotChords[0] + "px";
            slot.style.marginTop = slotChords[1] + "px";
        }
    }, 4500);
}

function updateMoneyDisplay() {
    localStorage.setItem('userMoney', money); // Update local storage
    moneyElement.innerText = money; // Update displayed money
}