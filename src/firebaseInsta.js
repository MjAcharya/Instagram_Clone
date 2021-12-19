import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCYSmSRPNPVpml9ShiSjggw0Jd1QdkYJC8",
    authDomain: "instagram-clone-11e15.firebaseapp.com",
    databaseURL: "https://instagram-clone-11e15-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-11e15",
    storageBucket: "instagram-clone-11e15.appspot.com",
    messagingSenderId: "388546431857",
    appId: "1:388546431857:web:97ef3b9b66bcc90a5b44d0",
    measurementId: "G-K1M643V7XG"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
