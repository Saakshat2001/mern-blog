// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3b59b.firebaseapp.com",
  projectId: "mern-blog-3b59b",
  storageBucket: "mern-blog-3b59b.appspot.com",
  messagingSenderId: "170926074880",
  appId: "1:170926074880:web:a278c1737018c578c43ce5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
