// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5RkZzss8HaSvq26-eaWVY-RQc0-6b3VA",
    authDomain: "netflix-gpt-b7aaf.firebaseapp.com",
    projectId: "netflix-gpt-b7aaf",
    storageBucket: "netflix-gpt-b7aaf.appspot.com",
    messagingSenderId: "204973776670",
    appId: "1:204973776670:web:0ea20adb9dba3133b9b30f",
    measurementId: "G-60H9S71HF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();