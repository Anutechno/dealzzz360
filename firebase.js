// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3XaraxtO-2INw4A_9TBCaUNUwQ71LCvE",
  authDomain: "dealz360-9537a.firebaseapp.com",
  projectId: "dealz360-9537a",
  storageBucket: "dealz360-9537a.appspot.com",
  messagingSenderId: "553682902669",
  appId: "1:553682902669:web:7c4bb965689b3831b40cc4",
  measurementId: "G-J8BQ45G9VY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fb = getFirestore(app);