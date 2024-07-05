import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtttye0dC-aZ2NarhCMWh84YnUHBnksQw",
  authDomain: "gaposa-bookshop.firebaseapp.com",
  projectId: "gaposa-bookshop",
  storageBucket: "gaposa-bookshop.appspot.com",
  messagingSenderId: "864437954404",
  appId: "1:864437954404:web:705c9ef641e3d9107c7c71"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);