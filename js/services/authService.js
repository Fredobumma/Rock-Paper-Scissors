import {
  createUserWithEmailAndPassword,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "./httpService";

// const user = auth;
const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (value) => localStorage.setItem(tokenKey, value);

// const token = async () => await auth.currentUser.getIdToken(true);

const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

const resetPassword = (newPassword) =>
  updatePassword(auth.currentUser, newPassword);
// const onAuthChange = onAuthStateChanged(auth, (user) => user);

export { signUp, signIn, resetPassword, getJwt, loginWithJwt };
