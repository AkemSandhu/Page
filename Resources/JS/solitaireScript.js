class Card {
    constructor(arrayName, cardNumber, cardColor, cardSuit) {
      this.arrayName = arrayName;
      this.cardNumber = cardNumber;
      this.cardColor = cardColor;
      this.cardSuit = cardSuit;
    }


    setArrayName(arrayName) {
      this.arrayName = arrayName;
    }


    getArrayName() {
      return this.arrayName;
    }


    setCardNumber(cardNumber) {
      this.cardNumber = cardNumber;
    }


    getCardNumber() {
      return this.cardNumber;
    }


    setCardColor(cardColor) {
      this.cardColor = cardColor;
    }


    getCardColor() {
      return this.cardColor;
    }


    setCardSuit(cardSuit) {
      this.cardSuit = cardSuit;
    }


    getCardSuit() {
      return this.cardSuit;
    }


    printData() {
      return(
        `Array: ${this.arrayName}, Card: ${this.cardNumber}, Color: ${this.cardColor}, Suit: ${this.cardSuit}`
      );
    }
  }


  class Solitaire {
    constructor() {
      this.drawPile = [];
      this.discardPile = [];
      this.cardLines = [Array.from({ length: 7 }, () => [])]; //seven card lines, where colors alternate
      this.completePile = Array.from({ length: 4 }, () => []); //where cards go, starting at the ace, following suit
      this.heartArray = [];
      this.diamondArray = [];
      this.clubArray = [];
      this.spadeArray = [];
      this.testHeart = [];
      this.testDiamond = [];
      this.testClub = [];
      this.testSpade = [];
      this.cardLine1 = [];
      this.cardLine2 = [];
      this.cardLine3 = [];
      this.cardLine4 = [];
      this.cardLine5 = [];
      this.cardLine6 = [];
      this.cardLine7 = [];
      this.selectedArray = "";
      this.fillArray(); //creates all card objects and sends them to the drawPile array, in order
     
    }


    fillArray() {
      const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      for (let suit of suits) {
        for (let number = 1; number <= 13; number++) {
          const color =
            suit === "Hearts" || suit === "Diamonds" ? "r" : "b";
          this.drawPile.push(new Card("DrawPile", number, color, suit));
        }
      }
      this.testHeart.push(new Card("placeholder", "placeholder", "r", "Hearts"));
      this.testDiamond.push(new Card("placeholder", "placeholder", "r", "Diamonds"));
      this.testClub.push(new Card("placeholder", "placeholder", "b", "Clubs"));
      this.testSpade.push(new Card("placeholder", "placeholder", "b", "Spades"));
      this.discardPile.push(new Card("discardPile", "", "", ""));
      this.cardLine1.push(new Card("cardLine1","","",""));
      this.cardLine2.push(new Card("cardLine2","","",""));
      this.cardLine3.push(new Card("cardLine3","","",""));
      this.cardLine4.push(new Card("cardLine4","","",""));
      this.cardLine5.push(new Card("cardLine5","","",""));
      this.cardLine6.push(new Card("cardLine6","","",""));
      this.cardLine7.push(new Card("cardLine7","","",""));
      this.selectedArray="discardPile";
    }


    changeCardSpace(oldArray, newArray) {
        console.log("test");
        const card = oldArray.shift();
        card.setArrayName(toString(newArray))
        newArray.unshift(card);
    }


    drawPileClick() {
      if (this.drawPile.length > 0) {
        const card = this.drawPile.shift();
        card.setArrayName("discardPile");
        this.discardPile.unshift(card);
        this.selectedArray="discardPile";
      }
    }
    remakeDrawPile(){
      const card = this.discardPile.shift();
          this.drawPile.unshift(card);
    }


    readArrayLengths() {
      console.log("drawPile cards:"+this.drawPile.length);
      console.log("discardPile cards:"+this.discardPile.length);
      console.log("heartPile cards:"+this.heartArray.length);
      console.log("diamondPile cards:"+this.diamondArray.length);
      console.log("clubPile cards:"+this.clubArray.length);
      console.log("spadePile cards:"+this.spadeArray.length);
      console.log("cardLine1 cards:"+this.cardLine1.length);
      console.log("cardLine2 cards:"+this.cardLine2.length);
      console.log("cardLine3 cards:"+this.cardLine3.length);
      console.log("cardLine4 cards:"+this.cardLine4.length);
      console.log("cardLine5 cards:"+this.cardLine5.length);
      console.log("cardLine6 cards:"+this.cardLine6.length);
      console.log("cardLine7 cards:"+this.cardLine7.length);
    }
 


    completePileClick(card) {
      const completePileIndex = this.completePile.findIndex(
        (pile) =>
          pile.length > 0 && pile[0].getCardSuit() === card.getCardSuit()
      );
     
      if (completePileIndex !== -1) {
        const topCard = this.completePile[completePileIndex][0];
        if (card.getCardNumber() === topCard.getCardNumber() + 1) {
          this.completePile[completePileIndex].unshift(card);
        }
      }
    }


   
  }
 
  function shuffle(array) {
    for(var i = array.length; i > 1; i--) {
      var r = Math.floor(Math.random() * i);
      var temp = array[r];
      array[r] = array[i-1];
      array[i-1] = temp;
      //console.log(array[i])
    }
  }
  function drawPileClick() //flips card
    {
      if(solitaire.drawPile.length <= 0){
        console.log("Shuffleing deck");
        for(x=solitaire.discardPile.length;x>1;x--){
          solitaire.remakeDrawPile();
        }
      }else{
        document.getElementById("drawPileID").style.position = "absolute";
        var elem = document.getElementById("drawPileID");
        console.log(solitaire.drawPile[0].printData());
        solitaire.drawPileClick();
        document.getElementById("discardPileID").style.position = "absolute";
        var elem = document.getElementById("discardPileID");
        elem.value = solitaire.discardPile[0].printData(); 
        //solitaire.readArrayLengths();
      }
    }
  function discardPileClick() //flips card
  {
      document.getElementById("discardPileID").style.position = "absolute";
      var elem = document.getElementById("discardPileID");
      elem.value = solitaire.discardPile[0].printData(); 
      if(solitaire.selectedArray!="discardPile"){
      solitaire.selectedArray="discardPile"
      }else{
        solitaire.selectedArray=""
      }
      if(solitaire.discardPile[0].getCardNumber() == 13){
        console.log("test");
      }
      //solitaire.readArrayLengths();
  }
  function heartPileClick() //flips card
  {
    completePileOptimazation(solitaire.testHeart[0].getCardSuit(), solitaire.heartArray, "heartPileID");
  }
  function diamondPileClick() //flips card
  {
    completePileOptimazation(solitaire.testDiamond[0].getCardSuit(), solitaire.diamondArray, "diamondPileID");
  }
  function clubPileClick() //flips card
  {
    completePileOptimazation(solitaire.testClub[0].getCardSuit(), solitaire.clubArray, "clubPileID");
  }
  function spadePileClick() //flips card
  {
    completePileOptimazation(solitaire.testSpade[0].getCardSuit(), solitaire.spadeArray, "spadePileID");
  }
  function cardLine1Click() //flips card
  {
    if(solitaire.selectedArray==""){
      solitaire.selectedArray="cardLine1"
    }else{
      if(solitaire.discardPile.length>1){
        if (
          solitaire.cardLine1[0].getCardColor() !== solitaire.discardPile[0].getCardColor() &&
          solitaire.cardLine1[0].getCardNumber() === solitaire.discardPile[0].getCardNumber() + 1
          ){
            document.getElementById("cardLine1ID").style.position = "absolute";
            var elem = document.getElementById("cardLine1ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine1);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }else if(solitaire.discardPile[0].getCardNumber() == 13 && solitaire.cardLine1.length==1){
            document.getElementById("cardLine1ID").style.position = "absolute";
            var elem = document.getElementById("cardLine1ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine1);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }
      }
    }
  }
  function cardLine2Click() //flips card
  {
    if(solitaire.selectedArray==""){
      solitaire.selectedArray="cardLine2"
    }else{
      if(solitaire.discardPile.length>1){
        if (
          solitaire.cardLine2[0].getCardColor() !== solitaire.discardPile[0].getCardColor() &&
          solitaire.cardLine2[0].getCardNumber() === solitaire.discardPile[0].getCardNumber() + 1
          ){
            document.getElementById("cardLine2ID").style.position = "absolute";
            var elem = document.getElementById("cardLine2ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine2);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }else if(solitaire.discardPile[0].getCardNumber() == 13 && solitaire.cardLine2.length==1){
            document.getElementById("cardLine2ID").style.position = "absolute";
            var elem = document.getElementById("cardLine2ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine2);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }
      }
    }
  }
  function cardLine3Click() //flips card
  {
    if(solitaire.selectedArray==""){
      solitaire.selectedArray="cardLine3"
    }else{
      if(solitaire.discardPile.length>1){
        if (
          solitaire.cardLine3[0].getCardColor() !== solitaire.discardPile[0].getCardColor() &&
          solitaire.cardLine3[0].getCardNumber() === solitaire.discardPile[0].getCardNumber() + 1
          ){
            document.getElementById("cardLine3ID").style.position = "absolute";
            var elem = document.getElementById("cardLine3ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine3);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }else if(solitaire.discardPile[0].getCardNumber() == 13 && solitaire.cardLine3.length==1){
            document.getElementById("cardLine3ID").style.position = "absolute";
            var elem = document.getElementById("cardLine3ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine3);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }
      }
    }
  }
  function cardLine4Click() //flips card
  {
    if(solitaire.selectedArray==""){
      solitaire.selectedArray="cardLine4"
    }else{
      if(solitaire.discardPile.length>1){
        if (
          solitaire.cardLine4[0].getCardColor() !== solitaire.discardPile[0].getCardColor() &&
          solitaire.cardLine4[0].getCardNumber() === solitaire.discardPile[0].getCardNumber() + 1
          ){
            document.getElementById("cardLine4ID").style.position = "absolute";
            var elem = document.getElementById("cardLine4ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine4);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }else if(solitaire.discardPile[0].getCardNumber() == 13 && solitaire.cardLine4.length==1){
            document.getElementById("cardLine4ID").style.position = "absolute";
            var elem = document.getElementById("cardLine4ID");
            elem.value = solitaire.discardPile[0].printData(); 
            solitaire.changeCardSpace(solitaire.discardPile, solitaire.cardLine4);
            document.getElementById("discardPileID").style.position = "absolute";
            var elem = document.getElementById("discardPileID");
            elem.value = solitaire.discardPile[0].printData();
          }
      }
    }
  }
  function completePileOptimazation(testSuit, suitArray, pileID){
      if(solitaire.selectedArray=="discardPile"){
      if(solitaire.discardPile.length > 1){
        console.log("discard has two or more cards");
        if(solitaire.discardPile[0].getCardSuit() == testSuit){
          console.log("discard has heart");
          if(suitArray.length < 1){
            console.log("heart array has less then one card");
            if(solitaire.discardPile[0].getCardNumber() == 1){
              console.log("card is ace");
              document.getElementById(pileID).style.position = "absolute";
              var elem = document.getElementById(pileID);
              elem.value = solitaire.discardPile[0].printData(); 
              solitaire.changeCardSpace(solitaire.discardPile, suitArray);
              document.getElementById("discardPileID").style.position = "absolute";
              var elem = document.getElementById("discardPileID");
              elem.value = solitaire.discardPile[0].printData();
            }
          }else{
            console.log("heart array has more then one card");
            if(solitaire.discardPile[0].getCardNumber()==suitArray[0].getCardNumber()+1){
              document.getElementById(pileId).style.position = "absolute";
              var elem = document.getElementById(pileID);
              elem.value = solitaire.discardPile[0].printData(); 
              solitaire.changeCardSpace(solitaire.discardPile, suitArray);
              document.getElementById("discardPileID").style.position = "absolute";
              var elem = document.getElementById("discardPileID");
              elem.value = solitaire.discardPile[0].printData();
            }
          }
        }
      }
    } else {
      switch(solitaire.selectedArray){
        case "cardLine1":
            if(solitaire.cardLine1.length > 1){
            console.log("cardLine1 has two or more cards");
            if(solitaire.cardLine1[0].getCardSuit() == testSuit){
              console.log("cardLine1 has heart");
              if(suitArray.length < 1){
                console.log("heart array has less then one card");
                if(solitaire.cardLine1[0].getCardNumber() == 1){
                  console.log("card is ace");
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine1[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine1, suitArray);
                  document.getElementById("cardLine1ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine1ID");
                  elem.value = solitaire.cardLine1[0].printData();
                }
              }else{
                console.log("heart array has more then one card");
                if(solitaire.cardLine1[0].getCardNumber()==suitArray[0].getCardNumber()+1){
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine1[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine1, suitArray);
                  document.getElementById("cardLine1ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine1ID");
                  elem.value = solitaire.cardLine1[0].printData();
                }
              }
            }
          }
          break;
          case "cardLine2":
            if(solitaire.cardLine2.length > 1){
            console.log("cardLine2 has two or more cards");
            if(solitaire.cardLine2[0].getCardSuit() == testSuit){
              console.log("cardLine2 has heart");
              if(suitArray.length < 1){
                console.log("heart array has less then one card");
                if(solitaire.cardLine2[0].getCardNumber() == 1){
                  console.log("card is ace");
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine2[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine2, suitArray);
                  document.getElementById("cardLine2ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine2ID");
                  elem.value = solitaire.cardLine2[0].printData();
                }
              }else{
                console.log("heart array has more then one card");
                if(solitaire.cardLine2[0].getCardNumber()==suitArray[0].getCardNumber()+1){
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine2[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine2, suitArray);
                  document.getElementById("cardLine2ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine2ID");
                  elem.value = solitaire.cardLine2[0].printData();
                }
              }
            }
          }
          break;
          case "cardLine3":
            if(solitaire.cardLine3.length > 1){
            console.log("cardLine3 has two or more cards");
            if(solitaire.cardLine3[0].getCardSuit() == testSuit){
              console.log("cardLine3 has heart");
              if(suitArray.length < 1){
                console.log("heart array has less then one card");
                if(solitaire.cardLine3[0].getCardNumber() == 1){
                  console.log("card is ace");
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine3[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine3, suitArray);
                  document.getElementById("cardLine3ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine3ID");
                  elem.value = solitaire.cardLine3[0].printData();
                }
              }else{
                console.log("heart array has more then one card");
                if(solitaire.cardLine3[0].getCardNumber()==suitArray[0].getCardNumber()+1){
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine3[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine3, suitArray);
                  document.getElementById("cardLine3ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine3ID");
                  elem.value = solitaire.cardLine3[0].printData();
                }
              }
            }
          }
          break;
          case "cardLine4":
            if(solitaire.cardLine4.length > 1){
            console.log("cardLine4 has two or more cards");
            if(solitaire.cardLine4[0].getCardSuit() == testSuit){
              console.log("cardLine4 has heart");
              if(suitArray.length < 1){
                console.log("heart array has less then one card");
                if(solitaire.cardLine4[0].getCardNumber() == 1){
                  console.log("card is ace");
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine4[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine4, suitArray);
                  document.getElementById("cardLine4ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine4ID");
                  elem.value = solitaire.cardLine4[0].printData();
                }
              }else{
                console.log("heart array has more then one card");
                if(solitaire.cardLine4[0].getCardNumber()==suitArray[0].getCardNumber()+1){
                  document.getElementById(pileID).style.position = "absolute";
                  var elem = document.getElementById(pileID);
                  elem.value = solitaire.cardLine4[0].printData(); 
                  solitaire.changeCardSpace(solitaire.cardLine4, suitArray);
                  document.getElementById("cardLine4ID").style.position = "absolute";
                  var elem = document.getElementById("cardLine4ID");
                  elem.value = solitaire.cardLine4[0].printData();
                }
              }
            }
          }
          break;
          default:
          break;
      }
    }
  }
  const solitaire = new Solitaire();
  shuffle(solitaire.drawPile);