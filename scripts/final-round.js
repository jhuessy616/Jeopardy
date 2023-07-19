//! Importing placeholder Questions
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

// !Grabbing score from query/URL---------------------------------------------------------
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
let player1Score = urlParams.get("player1Score");
let player2Score = urlParams.get("player2Score");
// making them numbers
player1Score = +player1Score;
player2Score = +player2Score;
//!  Set up variables and using DOM------------------------------------------------
let betBtn = document.getElementById("placeBet");
let betForm = document.getElementById("betform");
let answerForm = document.getElementById("answerform");
let submitBtn = document.getElementById("submit");
let playerOneFinalDisplay = document.getElementById("player1");
let playerTwoFinalDisplay = document.getElementById("player2");
let playerOneBet = document.getElementById("playerOneBet");
let playerTwoBet = document.getElementById("playerTwoBet");
let playerOneAnswer = document.getElementById("playerOneAnswer");
let playerTwoAnswer = document.getElementById("playerTwoAnswer");
let finalQuestionDisplay = document.getElementById("finalquestiondisplay");
let correctAnswer;
let winner;

// ! Displays------------------------------------------------------------
// hiding the answer form until bets have been made
answerForm.style.display = "none";
// player displays in Label with current points
playerOneFinalDisplay.innerText = "Player 1: " + player1Score;
playerTwoFinalDisplay.innerText = "Player 2: " + player2Score;

// Grab the final category
let finalQuestion = placeholderQuestions.filter(
  (questions) => questions.category === "Final"
);

// ! Betting-----------------------------------------------------------------
betBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // grabbing bet values
  playerOneBet = playerOneBet.value;
  playerTwoBet = playerTwoBet.value;
  // Checking that a player didn't bet more than they have.
  if (playerOneBet > player1Score || playerTwoBet > player2Score) {
    return alert("You cannot bet more than your current total!");
  }
  // grabbing the question from the placeholder and displaying it
  finalQuestionDisplay.innerText = finalQuestion[0].question;
  // Hiding the betform and displaying the answer form.
  betForm.style.display = "none";
  answerForm.style.display = "flex";
});
// ! Submit event ---------------------------------------------------------------------
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // grabbing what is entered in the input
  playerOneAnswer = playerOneAnswer.value;
  playerTwoAnswer = playerTwoAnswer.value;
  // setting the correct answer to the answer in the placeholder question
  correctAnswer = finalQuestion[0].answer;
  // If answer is correct or incorrect for each player.
  if (playerOneAnswer == correctAnswer) {
    player1Score = player1Score + +playerOneBet;
  }
  if (playerOneAnswer != correctAnswer) {
    player1Score = player1Score - +playerOneBet;
  }
  if (playerTwoAnswer == correctAnswer) {
    player2Score = player2Score + +playerTwoBet;
  }
  if (playerTwoAnswer != correctAnswer) {
    player2Score = player2Score - +playerTwoBet;
  }
  //  Disappear answer form
  answerForm.style.display = "none";
  // Winners and messages
  if (player1Score > player2Score) {
    winner = "Player 1, you are the winner!";
  } else if (player2Score > player1Score) {
    winner = "Player 2, you are the winner!";
  } else {
    winner = "Player 1 and Player 2, you have tied!";
  }
  // Final Display
  finalQuestionDisplay.innerText =
    "The correct answer was " +
    correctAnswer +
    "!\n Congratulations " +
    winner +
    "\n Player 1, your final score was " +
    player1Score +
    ". Player 2, your final score was " +
    player2Score +
    ".";
});
