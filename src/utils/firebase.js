// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";
// import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWHC9Er2isFH0oW6L8OyxUiFVoXp1mwfk",
  authDomain: "fir-libreria.firebaseapp.com",
  projectId: "fir-libreria",
  storageBucket: "fir-libreria.appspot.com",
  messagingSenderId: "291037720806",
  appId: "1:291037720806:web:fb7ab8896e9df472978b27",
  measurementId: "G-ZJ9BMJVW2R",
};

firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

export default firebase;
