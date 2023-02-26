import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./httpService";

// const user = auth;
const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (value) => localStorage.setItem(tokenKey, value);

const logoutJwt = () => localStorage.removeItem(tokenKey);

const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

const passwordUpdate = (currentUser, newPassword) =>
  updatePassword(currentUser, newPassword);

const updateUser = (currentUser, newUserObj) =>
  updateProfile(currentUser, newUserObj);

const toRecoverPassword = (email) => sendPasswordResetEmail(auth, email);

export {
  getJwt,
  signUp,
  signIn,
  passwordUpdate,
  updateUser,
  toRecoverPassword,
  loginWithJwt,
  logoutJwt,
};
