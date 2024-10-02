// Set initial amount of money if not already set
if (!localStorage.getItem('userMoney')) {
    localStorage.setItem('userMoney', 1000); // Set initial amount, e.g., $100
}