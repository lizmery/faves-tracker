// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "faves-tracker.firebaseapp.com",
  projectId: "faves-tracker",
  storageBucket: "faves-tracker.appspot.com",
  messagingSenderId: "948678164082",
  appId: "1:948678164082:web:7c1995d243dbc703f78ceb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);