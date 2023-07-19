// !Importing questions---------------------------------------------------

import placeholderQuestions from "./placeholder-questions.js";

// !Grabbing scores,current player, and round from query/URL---------------------------------------------------------
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

let player1Score = urlParams.get("player1Score");
let player2Score = urlParams.get("player2Score");
// making them numbers
player1Score = +player1Score;
player2Score = +player2Score;

let currentPlayer = urlParams.get("currentPlayer");

// set round
let round = urlParams.get("round");
round = +round;

//  !Set up variables-----------------------------------------------
let correctAnswer = "";
let questionValue = "";
// set answer count to 0, this will keep track of passes and incorrect answers so questions can't be infinetly guessed or past
let answerCount = 0;
// for checking if all questions have been called on
let totalQuestions = 0;

// !Players Turn-------------------------------------------------------------
// where we will display it
let playerTurnDisplay = document.getElementById("player-turn");
// display who's turn it is
playerTurnDisplay.innerText =
  "It is currently Player " + currentPlayer + "'s turn";

// !Question and Answer--------------------------------------------------
// player answer is what is entered in the input field
let playerAnswer = document.getElementById("answer");
// where the question of each card will be displayed
let questionDisplay = document.getElementById("question");



// ! Buttons and grid --------------------------------------------------
let guessBtn = document.getElementById("guess");
let passBtn = document.getElementById("pass");
let round2Btn = document.getElementById("nextround");
let finalRoundBtn = document.getElementById("nextround");
// Button events
round2Btn.addEventListener("click", goToNextPage);
finalRoundBtn.addEventListener("click", goToNextPage);
guessBtn.onclick = guessAnswer;
passBtn.onclick = () => {
  setPlayer();
  updatePassCount();
};
// Locking buttons to start
guessBtn.disabled = true;
playerAnswer.disabled = true;
passBtn.disabled = true;
round2Btn.disabled = true;
finalRoundBtn.disabled = true;
// grid is unlocked so question can be picked
let gridIsLocked = false;

//  !Player Scores and display------------------------------------------
// player 1's score display
const playerOneScoreDisplay = document.getElementById("player1Score");
// player 2's score display
const playerTwoScoreDisplay = document.getElementById("player2Score");
// having the score display display player score
playerOneScoreDisplay.innerText = player1Score;
playerTwoScoreDisplay.innerText = player2Score;

// !Filtering questions -------------------------------------------
let natureQuestions = placeholderQuestions.filter(
  (questions) => questions.category === "Nature"
);

let animalQuestions = placeholderQuestions.filter(
  (questions) => questions.category === "Animals"
);

let computerQuestions = placeholderQuestions.filter(
  (questions) => questions.category === "Computers"
);

let mythologyQuestions = placeholderQuestions.filter(
  (questions) => questions.category === "Mythology"
);

let historyQuestions = placeholderQuestions.filter(
  (questions) => questions.category === "History"
);

let generalQuestions = placeholderQuestions.filter(
  (questions) => questions.category === "General"
);
// !Adding click events to the grid of questions ------------------------------------------
addClickEvents(".nature", natureQuestions);
addClickEvents(".animals", animalQuestions);
addClickEvents(".computers", computerQuestions);
addClickEvents(".mythology", mythologyQuestions);
addClickEvents(".history", historyQuestions);
addClickEvents(".general", generalQuestions);

// !Functions--------------------------------------------------------------------

// Function to add click event, grabbing each associated question, answer, and value.
function addClickEvents(className, questionCategory) {
  for (let i = 0; i < document.querySelectorAll(className).length; i++) {
    document
      .querySelectorAll(className)
      [i].addEventListener("click", function () {
        // if Player has already picked a question.
        if (gridIsLocked) {
          return alert("You must guess or pass!");
        }
        // If this question has already been previosuly picked
        if (this.innerText == "X") {
          return (questionDisplay.innerText =
            "Already picked, please choose a different question.");
        }
        // setting the value to the value on the grid
        questionValue = this.innerText;
        // grabbing answer and question from the placeholder questions
        // !if round 2
        if (round == 2) {
          const { question, answer } = questionCategory[i + 5];
          // displaying the question
          questionDisplay.innerText = question;
          // setting correct answer to the answer provided
          correctAnswer = answer;
        } else {
          const { question, answer } = questionCategory[i];
          questionDisplay.innerText = question;
          correctAnswer = answer;
        }

        // putting an X on the selected question
        this.innerText = "X";
        // counting the total questions that have been selected
        totalQuestions++;
        console.log(totalQuestions);
        //  Enabling buttons and lock the grid
        toggleButtons();
      });
  }
}

// Guess Answer. Answer has been guessed, different responses for right or wrong.
function guessAnswer() {
  // If answer is correct. Add value to current player's score. Display the answer.
  if (
    playerAnswer.value.toLowerCase().trim() ==
    correctAnswer.toLowerCase().trim()
  ) {
    if (currentPlayer == 1) {
      player1Score = player1Score + +questionValue;
      playerOneScoreDisplay.innerText = player1Score;
    } else {
      player2Score = player2Score + +questionValue;
      playerTwoScoreDisplay.innerText = player2Score;
    }
    // Give feedback that correct
    questionDisplay.innerText =
      "That is correct! Player " +
      currentPlayer +
      " it is still your turn, please choose another question.";

    toggleButtons();

    // reset counter
    answerCount = 0;
  }
  //  If answer is wrong. Subtract value from current player's score, switch players. and count the wrong answers/passes.
  else {
    if (currentPlayer == 1) {
      player1Score = player1Score - +questionValue;
      playerOneScoreDisplay.innerText = player1Score;
    } else {
      player2Score = player2Score - +questionValue;
      playerTwoScoreDisplay.innerText = player2Score;
    }

    setPlayer();

    // Display if incorrect answer
    questionDisplay.innerText =
      "That is incorrect. Player " + currentPlayer + " can steal the question.";

    // Controlling it so questions can't be passed or answered indefinitely.
    updatePassCount();
  }
  // Update the display to the correct player

  playerTurnDisplay.innerText =
    "It is currently Player " + currentPlayer + "'s turn";
  nextRound();
  clearAnswer();
}

//  Update Player turn
function setPlayer() {
  currentPlayer == 1 ? (currentPlayer = 2) : (currentPlayer = 1);

  // Display player turn
  playerTurnDisplay.innerText =
    "It is currently Player " + currentPlayer + "'s turn";
}

// Update Pass Count
function updatePassCount() {
  // Update incorrect answers/passes
  answerCount++;

  if (answerCount > 1) {
    questionDisplay.innerText =
      "The correct answer was " +
      correctAnswer +
      ".\n The question has been passed or answered incorrectly by each player. Player " +
      currentPlayer +
      " please pick a new question.";
    // disable buttons
    toggleButtons();
    // reset answer count to 0
    answerCount = 0;
  }
  //  check to see if ready to move to the next round
  nextRound();
}

// Moves to next round checks which round we are on
// Points set to 5000/10000 because it is a little more than half of what the entire board is worth
function nextRound() {
  if (round == 1) {
    if (player1Score >= 5000 || player2Score >= 5000 || totalQuestions == 30) {
      questionDisplay.innerText =
        "That is correct! It is now time to move to Round Two.\n Click the Next Round button to continue.";
      disableAll();
      unlockNextRound();
    }
  } else {
    if (
      player1Score >= 10000 ||
      player2Score >= 10000 ||
      totalQuestions == 30
    ) {
      questionDisplay.innerText =
        "That is correct! It is now time to move to the Final Round.\n Click the Final Round button to continue.";
      disableAll();
      unlockNextRound();
    }
  }
}

function clearAnswer() {
  answer.value = "";
}
function clearQuestion() {
  questionDisplay.innerText = "";
}
function toggleButtons() {
  guessBtn.disabled ? (guessBtn.disabled = false) : (guessBtn.disabled = true);
  playerAnswer.disabled
    ? (playerAnswer.disabled = false)
    : (playerAnswer.disabled = true);
  passBtn.disabled ? (passBtn.disabled = false) : (passBtn.disabled = true);
  gridIsLocked ? (gridIsLocked = false) : (gridIsLocked = true);
}
function disableAll() {
  guessBtn.disabled = true;
  playerAnswer.disabled = true;
  passBtn.disabled = true;
  gridIsLocked = true;
}

function unlockNextRound() {
  round2Btn.disabled = false;
  finalRoundBtn.disabled = false;
}

// Next page function that has scores in the url to be able to access them on the next page
function goToNextPage() {
  round++;
  if (round == 2) {
    window.location.href = `./round-2.html?round=${round}&player1Score=${player1Score}&player2Score=${player2Score}&currentPlayer=${currentPlayer}`;
  } else {
    window.location.href = `./final-round.html?player1Score=${player1Score}&player2Score=${player2Score}&currentPlayer=${currentPlayer}`;
  }
}
