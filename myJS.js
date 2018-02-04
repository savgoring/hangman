
(function () {
    "use strict";
    var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages;

    function setup() {
        /* GAME RULES  */
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        lives = 7;
        words = ["school", "homework", "bcit", "student"];
        messages = {
            win: 'youre a winner!',
            lose: 'sorry better luck next time!',
            guessed: ' already guessed, please try again...',
            validLetter: 'Please enter a letter from A-Z'
        };
        /* END OF GAME RULES */

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;
        

        /* CHOOSE WORD */
        currentWord = words[Math.floor(Math.random() * words.length)];
   

       
        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.innerHTML = 'You have ' + lives + ' lives remaining';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        /* make sure guess button is enabled */
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        /* set up display of letters in current word */
        
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    /* START GAME */
    window.onload = setup();

    /* buttons */
    document.getElementById("restart").onclick = setup;

    /* RESET  */
    guessInput.onclick = function () {
        this.value = '';
    };

    /* MAIN GUESS */
    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        /* CHECKING FOR VALUE  */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (availableLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }
               
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                /* GUESS INVALID AND ALREADY GUESSED */
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    if (lives === 0) gameOver();
                }
            }
            /* WRONG LETER */
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        /* NO VALUE ENTERED */
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());