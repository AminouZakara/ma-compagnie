import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCu0RijKep3WoGoIQH0GSS63F0gIGHCJnU",
    authDomain: "compagnies-48f05.firebaseapp.com",
    projectId: "compagnies-48f05",
    storageBucket: "compagnies-48f05.appspot.com",
    messagingSenderId: "954218532580",
    appId: "1:954218532580:web:2aec15110301c71fab66f1",
    measurementId: "G-2Y1W9N385Z"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);




export { auth, db };