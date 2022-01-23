/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
//generateWinningNumber

// document.addEventListener("click", function(){
//     document.body.style.backgroundColor = "red";
//   });

// document.addEventListener("mouseup",function(){
// let input = document.getElementById("userInput").getElementsByTagName("*");
// for(let i = 0; i < input.length; i++){

//     let currElement = input[i];
//     console.log(currElement);
//     console.log(currElement.id);
//     console.log(currElement.baseURI);
//     console.log(currElement.value);

// }})






function generateWinningNumber(){
    let value = Math.floor((Math.random()*100) + 1);
    console.log(value);
    return value;
    
}
//shuffle
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  function newGame(){
     
      let gameObj = {
          playersGuess:null,
          pastGuesses:[],
          winningNumber:generateWinningNumber(),
          difference:function() {
              let val = Math.abs(this.playersGuess - this.winningNumber);
              console.log(val);
              return val;
          },
          isLower:function(){
              if(this.playersGuess < this.winningNumber) {
                  return true;
              }
              return false;
          },

          playersGuessSubmission:function(number){

            if(!isNaN(number) && number>0 && number<101) {
                this.playersGuess = number;
            } 
            else {
            
                    throw 'That is an invalid guess.'
                }

             return this.checkGuess();
            
          },

          checkGuess: function(){
              
            
            if(this.difference() === 0) {
                return "You Win!"
            }

            if(this.pastGuesses.includes(this.playersGuess)) {
                return "You have already guessed that number."
            }

            if(this.playersGuess !== this.winningNumber) {
                this.pastGuesses.push(this.playersGuess);
                
            } else {
                this.pastGuesses.push(this.playersGuess);
            }
            if(this.pastGuesses.length === 5) {
                return "You Lose.";
            }
            if(this.difference() < 10) {
                return "You're burning up!"
                
            }
            if(this.difference() < 25) {
                return "You're lukewarm."
            }
            if(this.difference() < 50) {
                return "You're a bit chilly."
            } 
            if(this.difference() < 100) {
                return "You're ice cold!"
            }

          }
    }
  return gameObj;
}

let Game = newGame();

const userGuess = document.getElementById("guessInput");
const submitButton = document.getElementById("goButton");
const getMessage = document.getElementById("message");

submitButton.addEventListener("click",function(){
    let currGuess = userGuess.value;
    console.log(currGuess);
    let playersMessage = Game.playersGuessSubmission(currGuess);
    getMessage.innerText = playersMessage;
    let nextListItem = document.getElementById(`guess${Game.pastGuesses.length}`);
    nextListItem.innerText = currGuess;
})

resetgame.addEventListener("click",function(){
    Game = newGame();
    for(let i = 1; i < 6; i++) {
        let nextListItem = document.getElementById(`guess${i}`);
        nextListItem.innerText = "";
        
    }
    getMessage.innerText = "";
    
})
console.log(userGuess);