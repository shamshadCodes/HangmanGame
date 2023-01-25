import words from "./words.js";

// Select a random word from the array
const word = words[Math.floor(Math.random() * words.length)];

// Create an array of underscores the same length as the word
const wordArray = Array(word.length).fill("_");

// Create an array to store the incorrect guesses
const incorrectGuesses = [];

// Create a variable to store the number of guesses
let guesses = 0;

// Create a variable to store the number of incorrect guesses
let incorrectGuessesCount = 0;

// Create a variable to store the game status
let gameOver = false;

// Get the elements from the HTML
const wordElement = document.getElementById("word");
const incorrectGuessesElement = document.getElementById("incorrect-guesses");
const hangmanElement = document.getElementById("hangman");
const form = document.querySelector("form");

// Update the word element with the current word array
wordElement.textContent = wordArray.join(" ");

// Handle the form submit event
form.addEventListener("submit", event => {
  event.preventDefault();

  // Get the guess from the input field
  const guess = event.target.elements.guess.value.toLowerCase();

  // Check if the game is over
  if (gameOver) {
    alert("Game over! Please start a new game.");
    return;
  }

  // Check if the guess is a valid letter
  if (!/^[a-z]$/.test(guess)) {
    alert("Please enter a valid letter.");
    return;
  }

  // Check if the letter has already been guessed
  if (incorrectGuesses.includes(guess) || wordArray.includes(guess)) {
    alert("You've already guessed that letter. Please try again.");
    return;
  }

  // Check if the letter is in the word
  if (word.includes(guess)) {
    // Update the word array with the correct letter
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        wordArray[i] = guess;
      }
    }

    // Update the word element with the current word array
    wordElement.textContent = wordArray.join(" ");

    // Check if the player has won
    if (!wordArray.includes("_")) {
      alert("Congratulations! You won!");
      gameOver = true;
    }
  } else {
    // Add the letter to the incorrect guesses array
    incorrectGuesses.push(guess);

    // Update the incorrect guesses element with the current array
    incorrectGuessesElement.textContent = incorrectGuesses.join(" ");

    // Increment the number of incorrect guesses
    incorrectGuessesCount++;

    // Update the hangman element
    hangmanElement.innerHTML = `
      <img src="hangman${incorrectGuessesCount}.png" alt="Hangman">
    `;

    // Check if the player has lost
    if (incorrectGuessesCount === 6) {
      alert(`Sorry, you lost. The word was "${word}"`);
