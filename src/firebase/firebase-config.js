import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZ7433YeVfCy4hsiSK0o5g7YH2Kw2V3fM",
    authDomain: "react-udemy2020.firebaseapp.com",
    databaseURL: "https://react-udemy2020.firebaseio.com",
    projectId: "react-udemy2020",
    storageBucket: "react-udemy2020.appspot.com",
    messagingSenderId: "556433695845",
    appId: "1:556433695845:web:7945ec6f85e5da544fd28c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}