// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mernproject5thesem.firebaseapp.com",
  projectId: "mernproject5thesem",
  storageBucket: "mernproject5thesem.appspot.com",
  messagingSenderId: "494704108594",
  appId: "1:494704108594:web:6206677eb0bf2e341c482b",
  measurementId: "G-FW1PRPQQGH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);