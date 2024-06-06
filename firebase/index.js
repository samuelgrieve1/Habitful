import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc} from "firebase/firestore";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgFkpJiWpQFSdI-ArOYEh-8Y0dZWpvpD0",
  authDomain: "habitful-c5e3c.firebaseapp.com",
  projectId: "habitful-c5e3c",
  storageBucket: "habitful-c5e3c.appspot.com",
  messagingSenderId: "950077612794",
  appId: "1:950077612794:web:45a614283bb2d964975f43",
  measurementId: "G-9HLZZ5673P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, doc, addDoc, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc }
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
