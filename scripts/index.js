// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

let playBtn = document.getElementById("play");

playBtn.addEventListener("click", goToRoundOne);

function goToRoundOne() {
  window.location.href = `./round-1.html?round=1&player1Score=0&player2Score=0&currentPlayer=1`;
}
