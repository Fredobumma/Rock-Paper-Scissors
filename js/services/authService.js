import {
  createUserWithEmailAndPassword,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
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

const passwordUpdate = (currentUser, newPassword) =>
  updatePassword(currentUser, newPassword);

const userUpdate = (currentUser, newUserObj) =>
  updateProfile(currentUser, newUserObj);
// const onAuthChange = onAuthStateChanged(auth, (user) => user);

export {
  signUp,
  signIn,
  passwordUpdate,
  userUpdate,
  getJwt,
  loginWithJwt,
  auth,
};
