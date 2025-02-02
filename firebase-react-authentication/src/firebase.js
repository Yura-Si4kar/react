import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhpCorWV_v0mL2H0qf4ceNPPfVzw3fuos",
  authDomain: "test-df6fe.firebaseapp.com",
  projectId: "test-df6fe",
  storageBucket: "test-df6fe.appspot.com",
  messagingSenderId: "30752465654",
  appId: "1:30752465654:web:53644e07c92a18b2d342d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
}

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
}