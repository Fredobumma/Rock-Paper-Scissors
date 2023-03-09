// <--------- Import the functions you need from the SDKs you need --------->
import { initializeApp } from "firebase/app";
// import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const {
  API_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: API_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// <--------- Initialize Firebase --------->
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
const auth = getAuth(app);
const db = getFirestore(app);

// <--------- C-R-U-D Operations --------->
// const addData = (document, data) => addDoc(collection(db, document), data);

const setData = (document, _id, data) =>
  setDoc(doc(db, document, _id), data, { merge: true });

const getData = (document, _id) => getDoc(doc(db, document, _id));

// const getAllData = (document) =>
//   getDocs(collection(db, document)).forEach((_doc) => {
//     /* doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data()); */
//   });

const deleteData = (document, _id) => deleteDoc(doc(db, document, _id));

export { auth, getData, setData, deleteData };
