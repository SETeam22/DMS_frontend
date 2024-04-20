// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5uin4fb0TSBV7Gk7QINMiAH1-SD_V9PY",
  authDomain: "deliverease-5fe55.firebaseapp.com",
  projectId: "deliverease-5fe55",
  storageBucket: "deliverease-5fe55.appspot.com",
  messagingSenderId: "954448094085",
  appId: "1:954448094085:web:aa498321d090b159acdaec",
  measurementId: "G-D4C2EL44Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
