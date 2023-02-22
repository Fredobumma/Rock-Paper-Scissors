import {
  signUp,
  signIn,
  getJwt as authUser,
  passwordUpdate,
  userUpdate,
  loginWithJwt,
} from "./services/authService";
import {
  Home,
  Login,
  Register,
  ResetPassword,
  NotFound,
} from "../page-blocks/pages.js";

window.onload = function () {
  // <----------- IMPLEMENTING ROUTING -------------->
  //variables
  const links = document.getElementsByTagName("a");

  const routes = {
    "/": Home(),
    "/login": Login(),
    "/register": Register(),
    "/reset-password": ResetPassword(),
    "/not-found": NotFound(),
  };

  //functions for different operations
  const route = (event) => {
    event = event || window.event;
    // event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
  };

  const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["/not-found"];
    !routes[path] && window.history.pushState({}, "", "/not-found");
    document.getElementById("main-page").innerHTML = route;
  };
  handleLocation();

  //event listener
  window.onpopstate = handleLocation;
  Array.from(links).map((m) => m.addEventListener("click", route));

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
  const options = document.getElementsByClassName("input-options");
  const [playerOne, playerTwo] = document.getElementsByClassName("selection");
  const result = document.getElementById("result");
  const newGame = document.getElementById("new-game");

  //functions for different operations
  const gameResult = (optionValues) => {
    const you = playerOne.innerHTML;
    const comp = playerTwo.innerHTML;

    if (
      (you === optionValues[0] && comp === optionValues[0]) ||
      (you === optionValues[1] && comp === optionValues[1]) ||
      (you === optionValues[2] && comp === optionValues[2])
    ) {
      result.style.color = "gray";
      return "It's a tie!";
    }
    if (
      (you === optionValues[0] && comp === optionValues[1]) ||
      (you === optionValues[1] && comp === optionValues[2]) ||
      (you === optionValues[2] && comp === optionValues[0])
    ) {
      result.style.color = "red";
      return "You Lose 😪";
    }
    result.style.color = "green";
    return "You Win 😁";
  };

  const computer = (optionValues) =>
    optionValues[Math.floor(Math.random() * optionValues.length)];

  const optionPick = (option) => {
    if (playerOne.innerHTML) return null;

    const optionsArray = Array.from(options).map((opt) => opt.innerHTML);
    playerOne.innerHTML = option.innerHTML;
    playerTwo.innerHTML = computer(optionsArray);
    result.innerText = gameResult(optionsArray);
    result.classList.add("show-results");
    newGame.classList.add("show-results");
  };

  const resetGame = () => {
    playerOne.innerHTML = "";
    playerTwo.innerHTML = "";
    result.classList.remove("show-results");
    newGame.classList.remove("show-results");
  };

  //event listener
  Array.from(options).map((option) =>
    option.addEventListener("click", () => optionPick(option))
  );
  newGame && newGame.addEventListener("click", resetGame);

  // <-------------- IMPLEMENTING AUTH ---------------->
  //variables;
  const form = document.getElementsByClassName("form")[0];

  const formTypes = [
    {
      id: "sign-up",
      getAuthService: (target) =>
        signUp(target[1].value, target[2].value, target[0].value),
    },
    {
      id: "sign-in",
      getAuthService: (target) => signIn(target[0].value, target[1].value),
    },
  ];

  //functions for different operations
  const callServer = async (event) => {
    event.preventDefault();
    let currentUser;
    const { target } = event;

    try {
      const { user } = await formTypes
        .find((el) => form.classList.contains(el.id))
        .getAuthService(target);

      currentUser = user;
    } catch (error) {
      console.log(error.code);
      return;
    }

    if (form.classList.contains("sign-up")) {
      try {
        await userUpdate(currentUser, { displayName: target[0].value });
      } catch (error) {
        console.log(error.code);
        return;
      }
    }

    loginWithJwt(currentUser.accessToken);
    return currentUser;
  };

  const submit = async (event) => {
    const user = await callServer(event);
    if (!user) return;

    window.history.replaceState({}, "", "/");
    document.getElementById("main-page").innerHTML = routes["/"];
  };

  const update = async (event) => {
    const { target } = event;

    try {
      const user = await callServer(event);
      if (!user) return;

      user.password = target[2].value;
      await passwordUpdate(user, target[2].value);
    } catch (error) {
      console.log(error.code);
      return;
    }

    window.history.back();
  };

  //event listener
  form &&
    form.addEventListener(
      "submit",
      form.classList.contains("reset-password") ? update : submit
    );
};
