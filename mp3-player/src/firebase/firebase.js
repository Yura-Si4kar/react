import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM5C6oAgxwj2hDr7Yjvt4upS5UMPHvA6k",
  authDomain: "mp3-player-b44ae.firebaseapp.com",
  projectId: "mp3-player-b44ae",
  storageBucket: "mp3-player-b44ae.appspot.com",
  messagingSenderId: "606418815170",
  appId: "1:606418815170:web:bf052d9c6e4eb0d887135b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Отримуємо доступ до сховища Firebase
export const storage = getStorage();
