let money = 500;
   //main deck
   let deck = [];
   //player hand
   let player = [];
   //dealer hand
   let dealer = [];
   updateMoney()
   startGame();
   //starts the game automatically
   function startGame(){
       //clears the deck
       deck = [];
       player = [];
       dealer = [];
       //adds 52 cards to deck
       for(let i = 0; i < 4; i++){
           for(let j = 1; j < 14; j++){
               deck.push(j);
           }
       }
       shuffleArray(deck);
       //draws starting cards
       draw(player,deck);
       draw(player,deck);
       draw(dealer,deck);
       draw(dealer,deck);
       checkBust();
  }
  //after dealer is done drawing cards
  function end(){
       if(value(player)>21){player = [0]}
       if(value(dealer)>21){dealer = [0]}
       if(value(player)>value(dealer)){
           money += 100; 
           document.getElementById('win').innerHTML = "Win!";
       }
       else if(value(player) == value(dealer)){
           money += 0;
           document.getElementById('win').innerHTML = "Tie";
       }
       else{
           money -= 100;
           document.getElementById('win').innerHTML = "Lose...";
       }
       updateMoney();
       var delayInMilliseconds = 1000; //1 second
       setTimeout(function() {
           startGame();
       }, delayInMilliseconds);
  }
  //after you bust or finish drawing
  function stand(){
      
       let bust = false;
       //checks who won
       if(value(player)>21){
           bust = true;
       }
       while(value(dealer)<value(player) && !bust){
           draw(dealer,deck)
       }
       if(value(dealer)==value(player)&&value(dealer)<17){
           draw(dealer,deck)
       }
       end();
  }
  //returns value of hand
  function value(hand){
       let aces = hand.indexOf(1);
       let x = 0;
       for(let i = 0;i<hand.length;i++){
           if(hand[i] >10){
               x+=10;
           }
           else{
           x+=hand[i]
           }
       }
       //makes aces 1 or 11
       if(x+10<=21 && aces > -1){
           x+=10
       }
       return x;
  }


  function draw(array, drawpile){
       //draws and updates text
       array.push(drawpile.pop())
       document.getElementById('playerHand').innerHTML = faceCardReplace("Player:" + player);
       document.getElementById('playerScore').innerHTML = value(player);
       document.getElementById('dealerHand').innerHTML = faceCardReplace("Dealer:" + dealer);
       document.getElementById('dealerScore').innerHTML = value(dealer);
       document.getElementById('win').innerHTML = "";
  }
  function checkBust(){
       if(value(player)>21){stand();}
  }


   function shuffleArray(array){
       //shuffles deck
       for(let i = 0; i < array.length; i++){
           let j = Math.floor(Math.random()*array.length);
           let temp = array[i];
           array[i] = array[j];
           array[j] = temp;
       }
   }
   function updateMoney(){
       document.getElementById('money').innerHTML = "$"+money;
   }
function faceCardReplace(str){
   //makes symbols instead of numbers for certain things
    str = str.replace(/11/g,"J");
    str = str.replace(/12/g,"Q");
    str = str.replace(/13/g,"K");
    str = str.replace(/1/g,"A");
    //previous thing turns 10 into A0...
    str = str.replace(/A0/g,"10");
    return str;
}