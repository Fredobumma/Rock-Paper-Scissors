import {
  createUserWithEmailAndPassword,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./httpService";

const token = async () => await auth.currentUser.getIdToken(true);

const signUp = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);

const signIn = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

// const onAuthChange = onAuthStateChanged(auth, (user) => user);

export { token, signUp, signIn };
