import { firebase } from "@firebase/app";
import "@firebase/firestore";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDFX1ZKO2fBGcNFLTglwLFZomvQckBNde0",
  authDomain: "coffee-6969.firebaseapp.com",
  databaseURL: "https://coffee-6969.firebaseio.com",
  projectId: "coffee-6969",
  storageBucket: "coffee-6969.appspot.com",
  messagingSenderId: "758583633868"
};
const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();