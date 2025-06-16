// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-708b1.firebaseapp.com",
  projectId: "mern-blog-708b1",
  storageBucket: "mern-blog-708b1.firebasestorage.app",
  messagingSenderId: "162404743053",
  appId: "1:162404743053:web:194c7d772225457220afc4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
