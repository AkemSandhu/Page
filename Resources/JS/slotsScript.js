let money = 500;
       document.getElementById('money').innerHTML = "$"+money
       let spinning = false;
       //array of possible slot values, each individual of the 15 slots has these odds, and dont share a pool
       const possibleValues = [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,7];
       const slot = [[],[],[],[],[]];
       let mult = 1;
       function spin(bet){
           //checks if slot is already spinning
           if(spinning == false){
               spinning = true;
               mult = 1;
               money -= bet
               document.getElementById('money').innerHTML = "$"+money
               random();
               setTimeout(function(){
                   //assigns values to slots
                   for(let i = 0; i<5; i++){
                       for(let j = 0; j < 3; j++){
                           slot[i][j] = possibleValues[Math.floor(Math.random()*possibleValues.length)];
                       }
                   }
                   //updates text
                   document.getElementById('slot1').innerHTML = slot[0][0] + "  " + slot[1][0] + "  " + slot[2][0] + "  " + slot[3][0] + "  " + slot[4][0];
                   document.getElementById('slot2').innerHTML = slot[0][1] + "  " + slot[1][1] + "  " + slot[2][1] + "  " + slot[3][1] + "  " + slot[4][1];
                   document.getElementById('slot3').innerHTML = slot[0][2] + "  " + slot[1][2] + "  " + slot[2][2] + "  " + slot[3][2] + "  " + slot[4][2];
                  
                   //checking for matches
                   for(let i = 0; i<3; i++){
                       let row = i;
                       let column = 0;
                       let current = slot[row][column];
                       adjacent(row,column,current);
                   }
                   //checking for sevens
                   let sevens = 1;
                   for(let i = 0; i<5; i++){
                       for(let j = 0; j < 3; j++){
                           if(slot[i][j]==7){
                               sevens *= (sevens+1);
                           }
                       }
                   }
                   //highlight sevens
                   document.getElementById('slot1').innerHTML = document.getElementById('slot1').innerHTML.replaceAll('7', '<span style="color: red;">'+7+'</span>');
                   document.getElementById('slot2').innerHTML = document.getElementById('slot2').innerHTML.replaceAll('7', '<span style="color: red;">'+7+'</span>');
                   document.getElementById('slot3').innerHTML = document.getElementById('slot3').innerHTML.replaceAll('7', '<span style="color: red;">'+7+'</span>');
                  
                   //increases money
                   mult*=sevens;
                   if(mult != 1){
                       money += mult*bet;
                   }
                   //updates money
                   document.getElementById('money').innerHTML = "$"+money
                   //adds delay before respin
                   setTimeout(function() {
                       spinning = false;
                   }, 500);
               },3400)
              
           }
           else{


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
       function random(){
           for(let i = 0; i < 45; i++){
               //randomizes the slots to simulate spinning
               setTimeout(() =>{
                   document.getElementById('slot1').innerHTML = Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  ";
                   document.getElementById('slot2').innerHTML = Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  ";
                   document.getElementById('slot3').innerHTML = Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  " + Math.ceil(Math.random()*7) + "  ";
               },i*75)
           }
       }
       }