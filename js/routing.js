import {
  Home,
  Login,
  Register,
  ResetPassword,
  RecoverPassword,
  DeleteCurrentUser,
  NotFound,
} from "../page-blocks/pages";

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

export const checkRoute = (pathname) => pathname in registeredRoutes;

export const route = (event, loggedUser) => {
  event = event || window.event;
  event.preventDefault();
  navigate("push", event.target.href);
  handleLocation(loggedUser);
};

export const handleLocation = (loggedUser) => {
  const pathname = window.location.pathname;
  const path =
    !loggedUser && pathname in registeredRoutes ? "/login" : pathname;

  const route = registeredRoutes[path] || routes[path] || routes["/not-found"];

  const urlPath = route === routes["/not-found"] ? "/not-found" : path;

  if (loggedUser && !(path in registeredRoutes)) {
    logoutJwt();
    window.location.reload();
  }

  window.history.pushState({}, "", urlPath);
  document.getElementById("main-page").innerHTML = route;
};

export const navigate = (stateType, destination) => {
  if (stateType === "push") window.history.pushState({}, "", destination);
  else window.history.replaceState({}, "", destination);

  window.location.reload();
};
