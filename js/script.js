import {
  signUp,
  signIn,
  getJwt as authUser,
  passwordUpdate,
  updateUser,
  toRecoverPassword,
  loginWithJwt,
  logoutJwt,
} from "./services/authService";
import {
  Home,
  Login,
  Register,
  ResetPassword,
  RecoverPassword,
  DeleteCurrentUser,
  NotFound,
} from "../page-blocks/pages.js";

window.onload = function () {
  // <----------- IMPLEMENTING ROUTING -------------->
  //variables
  const links = document.getElementsByTagName("a");
  const backButton = document.getElementsByClassName("back-button");
  const routes = {
    "/": Home(),
    "/login": Login(),
    "/register": Register(),
    "/reset-password": ResetPassword(),
    "/password-recovery": RecoverPassword(),
    "/delete-account": DeleteCurrentUser(),
    "/not-found": NotFound(),
  };

  //functions for different operations
  const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    window.location.reload();
    handleLocation();
  };

  const handleLocation = () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["/not-found"];
    !routes[path] && window.history.pushState({}, "", "/not-found");
    document.getElementById("main-page").innerHTML = route;
  };
  handleLocation();

  const handleBack = () => {
    window.history.pushState({}, "", "/");
    window.location.reload();
  };

  const handlePopState = () => {
    handleLocation();
    window.location.reload();
  };

  //event listener
  window.onpopstate = handlePopState;
  Array.from(links).map((link) => link.addEventListener("click", route));
  Array.from(backButton).map((button) =>
    button.addEventListener("click", handleBack)
  );

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
  const handleGameResult = (optionValues) => {
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

  const handleOptionPick = (option) => {
    if (playerOne.innerHTML) return null;

    const optionsArray = Array.from(options).map((opt) => opt.innerHTML);
    playerOne.innerHTML = option.innerHTML;
    playerTwo.innerHTML = computer(optionsArray);
    result.innerText = handleGameResult(optionsArray);
    result.classList.add("show-results");
    newGame.classList.add("show-results");
  };

  const handleGameReset = () => {
    playerOne.innerHTML = "";
    playerTwo.innerHTML = "";
    result.classList.remove("show-results");
    newGame.classList.remove("show-results");
  };

  //event listener
  Array.from(options).map((option) =>
    option.addEventListener("click", () => handleOptionPick(option))
  );
  newGame && newGame.addEventListener("click", handleGameReset);

  // <-------------- IMPLEMENTING AUTH ---------------->
  //variables;
  const forms = document.getElementsByClassName("form");
  console.log(forms[0]);
  const formTypes = [
    {
      nameId: "sign-up",
      getAuthService: (target) => signUp(target[1].value, target[2].value),
    },
    {
      nameId: "sign-in",
      getAuthService: (target) => signIn(target[0].value, target[1].value),
    },
  ];

  //functions for different operations
  const callServer = async (event) => {
    let currentUser;
    const { target } = event;

    try {
      const { user } = await formTypes
        .find((el) => forms[0].classList.contains(el.nameId))
        .getAuthService(target);

      currentUser = user;
    } catch (error) {
      console.log(error.code);
      return;
    }

    if (forms[0].classList.contains("sign-up")) {
      try {
        await updateUser(currentUser, { displayName: target[0].value });
      } catch (error) {
        console.log(error.code);
        return;
      }
    }

    loginWithJwt(currentUser.accessToken);
    return currentUser;
  };

  const handleSign_Up_In = async (event) => {
    event.preventDefault();
    const user = await callServer(event);
    if (!user) return;

    window.history.replaceState({}, "", "/");
    window.location.reload();
  };

  const changePassword = async (event) => {
    event.preventDefault();

    try {
      const user = await callServer(event);
      if (!user) return;

      // user.password = target[2].value;
      await passwordUpdate(user, event.target[2].value);
    } catch (error) {
      console.log(error.code);
      return;
    }

    window.history.back();
  };

  const passwordRecovery = async (event) => {
    event.preventDefault();

    try {
      await toRecoverPassword(event.target[0].value);
    } catch (error) {
      console.log(error.code);
    }

    window.history.pushState({}, "", "/login");
    window.location.reload();
  };

  const deleteAccount = async (event) => {
    event.preventDefault();

    try {
      const user = await callServer(event);
      if (!user) return;
      if (user.accessToken !== authUser())
        return console.log("Wrong account credentials");

      await user.delete();
      logoutJwt();
    } catch (error) {
      console.log(error.code);
      return;
    }

    window.history.replaceState({}, "", "/register");
    window.location.reload();
  };

  //event listener
  const eventListeners = [
    { nameId: "reset-password", func: changePassword },
    { nameId: "delete-account", func: deleteAccount },
    { nameId: "recover-password", func: passwordRecovery },
  ];

  Array.from(forms).forEach((form) => {
    const listener = eventListeners.find((el) =>
      form.classList.contains(el.nameId)
    );
    form.addEventListener(
      "submit",
      listener ? listener.func : handleSign_Up_In
    );
  });
};
