import {
  signUp,
  signIn,
  getJwt,
  passwordUpdate,
  updateUser,
  toRecoverPassword,
  loginWithJwt,
  logoutJwt,
} from "./services/authService";
import { deleteData, getData, setData } from "./services/httpService";
import { notifySuccess, notifyError, notyf, popupInfo } from "./notifications";
import { useJwtDecode } from "./useJwtDecode";
import { Navbar_guest, Navbar_authUser } from "./../page-blocks/navbar";
import {
  Home,
  Login,
  Register,
  ResetPassword,
  RecoverPassword,
  DeleteCurrentUser,
  NotFound,
} from "../page-blocks/pages.js";
import { addScore } from "./utilities";

window.onload = function () {
  // <----------- IMPLEMENTING ROUTING -------------->
  //variables
  const loggedUser = getJwt() ? useJwtDecode(getJwt()) : null;
  const menu = document.getElementsByClassName("menu")[0];
  menu.innerHTML = loggedUser ? Navbar_authUser() : Navbar_guest();

  const links = document.getElementsByTagName("a");
  const backButton = document.getElementsByClassName("back-button");

  const routes = {
    "/login": Login(),
    "/register": Register(),
    "/password-recovery": RecoverPassword(),
    "/not-found": NotFound(),
  };

  const registeredRoutes = {
    "/": Home(),
    "/reset-password": ResetPassword(),
    "/delete-account": DeleteCurrentUser(),
  };

  //functions for different operations
  const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    navigate("push", event.target.href);
    handleLocation();
  };

  const handleLocation = () => {
    const pathname = window.location.pathname;
    const path =
      !loggedUser && pathname in registeredRoutes ? "/login" : pathname;

    const route =
      registeredRoutes[path] || routes[path] || routes["/not-found"];

    const urlPath = route === routes["/not-found"] ? "/not-found" : path;

    if (loggedUser && !(path in registeredRoutes)) {
      logoutJwt();
      window.location.reload();
    }

    window.history.pushState({}, "", urlPath);
    document.getElementById("main-page").innerHTML = route;
  };
  handleLocation();

  const handleBack = () => {
    navigate("push", "/");
  };

  const handlePopState = () => {
    handleLocation();
    window.location.reload();
  };

  const navigate = (stateType, destination) => {
    if (stateType === "push") window.history.pushState({}, "", destination);
    else window.history.replaceState({}, "", destination);

    window.location.reload();
  };

  //event listener
  window.onpopstate = handlePopState;
  Array.from(links).map(
    (link) =>
      link.innerText !== "Reset Score" && link.addEventListener("click", route)
  );
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

  // <--------------- IMPLEMENTING GAME SCORE -------------->
  const username = document.getElementById("user");
  const firstScore = document.getElementById("user-score");
  const secondScore = document.getElementById("comp-score");

  const handleScores = async () => {
    popupInfo("loading game data, Please wait...");
    username.innerText = loggedUser.name;

    try {
      const dataObj = await getData("users", loggedUser.email);
      const { userScore, computerScore } = dataObj.exists()
        ? dataObj.data()
        : {};
      localStorage.setItem("user-score", userScore || 0);
      localStorage.setItem("comp-score", computerScore || 0);

      // TODO: refactor here
      firstScore.innerText = localStorage.getItem("user-score");
      secondScore.innerText = localStorage.getItem("comp-score");
    } catch (error) {
      notyf.dismissAll();
      setTimeout(() => notifyError(error.code), 1000);
    }
    notyf.dismissAll();
  };

  window.location.pathname === "/" && handleScores();

  // <--------------- IMPLEMENTING GAME PAGE -------------->
  //variables
  const resetScore = document.getElementsByClassName("reset-score");
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
      addScore("comp-score", secondScore);
      result.style.color = "red";
      return "You Lose 😪";
    }
    addScore("user-score", firstScore);
    result.style.color = "green";
    return "You Win 😁";
  };

  const computer = (optionValues) =>
    optionValues[Math.floor(Math.random() * optionValues.length)];

  const handleOptionPick = async (option) => {
    if (playerOne.innerHTML) return null;

    const optionsArray = Array.from(options).map((opt) => opt.innerHTML);

    playerOne.innerHTML = option.innerHTML;
    playerTwo.innerHTML = computer(optionsArray);
    const output = handleGameResult(optionsArray);
    result.innerText = output;

    result.classList.add("show-results");
    newGame.classList.add("show-results");

    try {
      await setData("users", loggedUser.email, {
        userScore: localStorage.getItem("user-score"),
        computerScore: localStorage.getItem("comp-score"),
      });
    } catch (error) {
      notyf.dismissAll();
      setTimeout(() => notifyError(error.code), 1000);
      return;
    }

    if (output === "You Win 😁")
      firstScore.innerText = localStorage.getItem("user-score");

    if (output === "You Lose 😪")
      secondScore.innerText = localStorage.getItem("comp-score");
  };

  const handleGameReset = () => {
    playerOne.innerHTML = "";
    playerTwo.innerHTML = "";
    result.classList.remove("show-results");
    newGame.classList.remove("show-results");
  };

  const handleResetScore = async () => {
    try {
      await setData("users", loggedUser.email, {
        userScore: 0,
        computerScore: 0,
      });
    } catch (error) {
      notyf.dismissAll();
      setTimeout(() => notifyError(error.code), 1000);
      return;
    }

    localStorage.setItem("user-score", 0);
    localStorage.setItem("comp-score", 0);
  };

  //event listener
  Array.from(options).map((option) =>
    option.addEventListener("click", () => handleOptionPick(option))
  );
  Array.from(resetScore).map((el) =>
    el.addEventListener("click", handleResetScore)
  );
  newGame && newGame.addEventListener("click", handleGameReset);

  // <-------------- IMPLEMENTING AUTH ---------------->
  //variables;
  const forms = document.getElementsByClassName("form");
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
  const checkbox = document.getElementById("checkbox");
  const logOut = document.getElementsByClassName("log-out");

  //functions for different operations
  const callServer = async (event) => {
    popupInfo("please wait");
    let currentUser;
    const { target } = event;

    try {
      const { user } = await formTypes
        .find((el) => forms[0].classList.contains(el.nameId))
        .getAuthService(target);

      currentUser = user;
      const { email } = currentUser;

      if (forms[0].classList.contains("sign-up"))
        await updateUser(currentUser, { displayName: target[0].value });

      await setData("users", email, {
        displayName: currentUser.displayName,
        email,
        password:
          target[2].value.length >= 8 ? target[2].value : target[1].value,
      });
    } catch (error) {
      notyf.dismissAll();
      setTimeout(() => notifyError(error.code), 1000);
      return;
    }

    notyf.dismissAll();
    loginWithJwt(currentUser.accessToken);
    return currentUser;
  };

  const handleSign_Up_In = async (event) => {
    event.preventDefault();
    const user = await callServer(event);
    if (!user) return;

    setTimeout(() => {
      notifySuccess("login success");
      navigate("replace", "/");
    }, 1000);
  };

  const changePassword = async (event) => {
    event.preventDefault();
    const { target } = event;

    try {
      const user = await callServer(event);
      if (!user) return;

      await passwordUpdate(user, target[2].value);
      await setData("users", user.email, { password: target[2].value });
    } catch (error) {
      notyf.dismissAll();
      setTimeout(() => notifyError(error.code), 1000);
      return;
    }

    setTimeout(() => {
      notifySuccess("reset success");
      navigate("replace", "/");
    }, 1000);
  };

  const passwordRecovery = async (event) => {
    event.preventDefault();
    popupInfo("please wait");

    try {
      await toRecoverPassword(event.target[0].value);
      notyf.dismissAll();
    } catch (error) {
      notyf.dismissAll();
      setTimeout(() => notifyError(error.code), 1000);
      return;
    }

    setTimeout(() => {
      notifySuccess("recovery email sent");
      navigate("push", "/login");
    }, 1000);
  };

  const deleteAccount = async (event) => {
    event.preventDefault();

    try {
      const user = await callServer(event);
      if (!user) return;

      const { email: inputEmail } = useJwtDecode(user.accessToken);
      if (inputEmail !== loggedUser.email) {
        notyf.dismissAll();
        setTimeout(() => notifyError("wrong account credentials"), 1000);
        return;
      }

      await user.delete();
      await deleteData("users", currentEmail);
      logoutJwt();
    } catch (error) {
      notyf.dismissAll();
      setTimeout(() => notifyError(error.code), 1000);
      return;
    }

    setTimeout(() => {
      notifySuccess("account deleted");
      navigate("replace", "/register");
    }, 1000);
  };

  const passwordVisibility = () => {
    const passwords = [
      document.getElementById("password"),
      document.getElementById("new-password"),
    ];
    passwords
      .filter((el) => el)
      .forEach((el) => {
        if (el && el.type === "password") return (el.type = "text");
        el.type = "password";
      });
  };

  const handleLogOut = () => {
    logoutJwt();
    localStorage.removeItem("user-score");
    localStorage.removeItem("comp-score");
    notifySuccess("logout success");
    navigate("replace", "/login");
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
  Array.from(logOut).forEach((out) =>
    out.addEventListener("click", handleLogOut)
  );
  checkbox && checkbox.addEventListener("click", passwordVisibility);
};
