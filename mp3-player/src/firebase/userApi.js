import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const getAuthUserId = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe();
        resolve(user);
      } else {
        reject(new Error("Користувач не авторизований"));
      }
    });
  });
};

export const updateUserData = async (name, photoURL, phone) => {
  if (!auth.currentUser) {
    throw new Error("Користувач не авторизований");
  }

  try {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
      phoneNumber: phone
    });
    console.log("Профіль успішно оновлено");
    return {
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL
    };
  } catch (error) {
    console.error("Помилка під час оновлення профілю: ", error);
    throw new Error("Не вдалося оновити профіль");
  }
};