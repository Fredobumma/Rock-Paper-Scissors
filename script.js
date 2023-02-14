//variables
const inputOptions = document.getElementsByClassName("input-options");
const options = Object.entries(inputOptions);
const inputSelection = document.getElementsByClassName("selection");
const selections = Object.entries(inputSelection).map(
  (selection) => selection[1]
);
const playerOne = selections[0];
const playerTwo = selections[1];
const result = document.getElementById("result");
const newGame = document.getElementById("new-game");

//event listener
options.map((option) =>
  option[1].addEventListener("click", function () {
    if (playerOne.innerText) return null;

    const optionsArray = options.map((option) => option[1].innerText);
    playerOne.innerText = option[1].innerText;
    playerTwo.innerText = comp(optionsArray);
    result.innerText = gameResult(optionsArray);
    result.style.display = "block";
    newGame.style.display = "block";
  })
);

newGame.addEventListener("click", function () {
  playerOne.innerText = "";
  playerTwo.innerText = "";
  result.style.display = "none";
  newGame.style.display = "none";
});

//functions for different operations
function comp(optionValues) {
  return optionValues[Math.floor(Math.random() * optionValues.length)];
}

function gameResult(optionValues) {
  const you = playerOne.innerText;
  const computer = playerTwo.innerText;

  if (
    (you === optionValues[0] && computer === optionValues[0]) ||
    (you === optionValues[1] && computer === optionValues[1]) ||
    (you === optionValues[2] && computer === optionValues[2])
  ) {
    result.style.color = "gray";
    return "It's a tie!";
  }
  if (
    (you === optionValues[0] && computer === optionValues[1]) ||
    (you === optionValues[1] && computer === optionValues[2]) ||
    (you === optionValues[2] && computer === optionValues[0])
  ) {
    result.style.color = "red";
    return "You Lose 😪";
  }
  result.style.color = "green";
  return "You Win 😁";
}
