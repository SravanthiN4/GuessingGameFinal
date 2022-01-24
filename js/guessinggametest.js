
//This function generates the random winning number

function generateWinningNumber() {
	let winningNumber = Math.floor(Math.random() * 100 + 1);
	console.log(winningNumber);
	return winningNumber;
}

// this function creates a gameObject that compares the players Guesses 
// and outputs the expected message as per the different combinations

function newGame() {
	let gameObj = {
		playersGuess: '',
		pastGuesses: [],
		winningNumber: generateWinningNumber(),

		difference: function() {
			let val = Math.abs(this.playersGuess - this.winningNumber);
			return val;
		},

		playersGuessSubmission: function(number) {
            if(!isNaN(number) && number > 0 && number < 101) {
                this.playersGuess = number;
            } else {
                throw `That's an invalid guess`
            }
			return this.checkGuess();
		},

		checkGuess: function() {
			if (this.difference() === 0) {
				return 'You Win!';
			}

			if (this.pastGuesses.indexOf(this.playersGuess) !== -1) {
				return 'You have already guessed that number.';
			}

			if (this.playersGuess !== this.winningNumber) {
				this.pastGuesses.push(this.playersGuess);
			}

			if (this.pastGuesses.length === 5) {
				return 'You Lose.';
			}

			if (this.difference() < 10) {
				return "You're burning up!";
			}

			if (this.difference() < 25) {
				return "You're lukewarm.";
			}

			if (this.difference() < 50) {
				return "You're a bit chilly.";
			}

			if (this.difference() < 100) {
				return "You're ice cold!";
			}
		}
	};

	return gameObj;
}

//Call the newGame function here 
let Game = newGame();


//Identify UI elements
const userGuess = document.getElementById('guessInput');
const submitButton = document.getElementById('goButton');
const getMessage = document.getElementById('message');


        
//On clicking submit button 
submitButton.addEventListener('click', function() {
    
	let currGuess = userGuess.value;
	console.log(currGuess);
	let playersMessage = Game.playersGuessSubmission(currGuess);
	getMessage.innerText = playersMessage;
    const lis = document.querySelectorAll('li');
    console.log(lis);
    
    for(let i = 0; i < lis.length; i++) {
        if(Game.pastGuesses[i] === undefined) {
            lis[i].innerText = ""
        }else {
        lis[i].innerText = Game.pastGuesses[i];
        }
    }
    
}
   
);

//reset game functionality
resetgame.addEventListener("click",function(){
    Game = newGame();
    for(let i = 1; i < 6; i++) {
        let nextListItem = document.getElementById(`guess${i}`);
        nextListItem.innerText = "";
        
    }
    getMessage.innerText = "";
    
})

