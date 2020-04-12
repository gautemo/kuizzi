import * as firebase from "firebase/app";

import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC2zSi5L3hsAudpae05vWNMm2ggv8Z8cuY",
    authDomain: "kuizzi.firebaseapp.com",
    databaseURL: "https://kuizzi.firebaseio.com",
    projectId: "kuizzi",
    storageBucket: "kuizzi.appspot.com",
    messagingSenderId: "387785143932",
    appId: "1:387785143932:web:c07941800a49891c3a7bf9",
    measurementId: "G-FKDG7M6PG8"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const signInAnonymously = async () => await firebase.auth().signInAnonymously().catch(() => console.error(`Could not anonymously sign in. You probably can't play`, error));

const db = firebase.firestore();
const storage = firebase.storage().ref();

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

export { firebase, db, getCurrentUser, storage, signInAnonymously };