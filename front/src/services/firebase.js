import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAsyNfl_ckWd3EehrVfcSrlWNNmKJV3VNA",
    authDomain: "workshit-40cfb.firebaseapp.com",
    projectId: "workshit-40cfb",
    storageBucket: "workshit-40cfb.firebasestorage.app",
    messagingSenderId: "616049582743",
    appId: "1:616049582743:web:f75d0942e7c8329a36ffd2",
    measurementId: "G-9QLQYM7SEY"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();