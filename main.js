import wordList from './words.js';

/**Hangman Game in Javascript
* @see https://github.com/shamshadCodes/HangmanGame
* @author shamshadCodes
**/

class Hangman {
    constructor (elId) {
        this.elId = elId;
        this.words = wordList
    }

    reset() {
        this.STOPPED = false;
        this.MISTAKES = 0;
        this.GUESSES = [];
        this.WORD = this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedWord());
    }

    guess(letter) {
        letter = letter.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(letter) > -1) {
            return;
        }

        this.GUESSES.push(letter);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedWord());
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(letter) < 0) {
            this.MISTAKES++;
            this.showElementByIdWithContent(this.elId + "_" + this.MISTAKES, null);
            if (this.MISTAKES === 6) {
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD);
                this.STOPPED = true;
            }
        } else if (this.WORD.indexOf(this.getGuessedWord()) !== -1) {
            this.showElementByIdWithContent(this.elId + "_end", "You made it!<br/>The word was: " + this.WORD);
            this.STOPPED = true;
        }
    }

    showElementByIdWithContent(elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    }

    hideElementByClass(elClass) {
        let elements = document.getElementsByClassName(elClass);
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    }

    getGuessedWord() {
        let result = "";
        for (let i = 0; i < this.WORD.length; i++) {
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                this.WORD[i] : "_" ;
        }
        return result;
    }
}

let hangman = new Hangman('hangm');

//Adding the 'Reset' button event listener
function loadAndCreateButton() {
    const btnStart = document.getElementById("btn-start");
    btnStart.addEventListener("click", () => hangman.reset());
}

window.addEventListener("load", loadAndCreateButton);

//Adding the input box event listener
const input = document.getElementById("guess")

input.addEventListener("keyup", (event) => {
    hangman.guess(event.target.value);
    event.target.value = "";
});