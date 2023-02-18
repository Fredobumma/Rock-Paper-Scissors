import {
  Home,
  Login,
  Register,
  ResetPassword,
  NotFound,
} from "../page-blocks/pages.js";

window.onload = function () {
  // <----------- IMPLEMENTING ROUTING -------------->
  const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
  };

  const routes = {
    "/": Home(),
    "/login": Login(),
    "/register": Register(),
    "/reset-password": ResetPassword(),
    "/not-found": NotFound(),
  };

  const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["/not-found"];
    document.getElementById("main-page").innerHTML = route;
  };

  //event listener
  window.onpopstate = handleLocation;
  window.route = route;
  handleLocation();

  // <-------------- IMPLEMENTING NAVBAR ------------->
  //variables
  const wrapper = document.getElementById("body-wrapper");
  const details = document.getElementsByTagName("details")[0];
  const summary = document.getElementsByTagName("summary")[0];

  //event listener
  wrapper.addEventListener("click", () => {
    wrapper.classList.remove("is-open");
    details.open = false;
  });
  summary.addEventListener("click", () => wrapper.classList.toggle("is-open"));

  // <--------------- IMPLEMENTING GAME HOMEPAGE -------------->
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

  //functions for operations
  const comp = (optionValues) =>
    optionValues[Math.floor(Math.random() * optionValues.length)];

  const gameResult = (optionValues) => {
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
  };

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

  newGame &&
    newGame.addEventListener("click", function () {
      playerOne.innerText = "";
      playerTwo.innerText = "";
      result.style.display = "none";
      newGame.style.display = "none";
    });
};
