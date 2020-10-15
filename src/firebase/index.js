import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// const FIREBASE_CONFIG = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAbT3SOh6HTuacHFsH0gwdJXbUE9OLOWXE",
  authDomain: "field-expense-tracker.firebaseapp.com",
  databaseURL: "https://field-expense-tracker.firebaseio.com",
  projectId: "field-expense-tracker",
  storageBucket: "field-expense-tracker.appspot.com",
  messagingSenderId: "491728642138",
  appId: "1:491728642138:web:0c230f1c2931b3b4fbf863",
  measurementId: "G-PX4E80Y1GV"
};

firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAUTH = firebase.auth();
export const firestoreDB = firebase.firestore();
export const signout = firebaseAUTH.signOut();

export default firebase;