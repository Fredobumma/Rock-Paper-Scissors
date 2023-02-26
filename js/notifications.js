import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  position: { x: "center", y: "top" },
  types: [
    {
      type: "info",
      background: "black",
      duration: 2000,
      className: "notifications notification-info",
    },
  ],
});

const getError = (message) => message.replace("auth/", "").replaceAll("-", " ");

const notifySuccess = (message) =>
  notyf.success({
    className: "notifications",
    dismissible: true,
    message: `${message}`,
  });

const notifyError = (message) =>
  notyf.error({
    background: "rgb(233, 21, 21)",
    className: "notifications",
    dismissible: true,
    message: `${getError(message)}`,
  });

const popupInfo = (message) =>
  notyf.open({ type: "info", message: `${message}`, duration: 0 });

// const dismissNotifications = notyf.dismissAll();

export { notifySuccess, notifyError, notyf, popupInfo };
