// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMyaJd1719Sg0bo06pb79IBhL4N8J0498",
  authDomain: "bars-and-squares.firebaseapp.com",
  projectId: "bars-and-squares",
  storageBucket: "bars-and-squares.appspot.com",
  messagingSenderId: "3653382673",
  appId: "1:3653382673:web:12fd7d2657f67d1c63b7b0",
  measurementId: "G-QXWMF3KBB4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// const analytics = getAnalytics(app);