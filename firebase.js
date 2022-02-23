import * as firebase from 'firebase';
import "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyDIn1_N_W_rCcNkYa-klAlUcQhYWABBC1A",
    authDomain: "adroit-nuance-315720.firebaseapp.com",
    databaseURL: "https://adroit-nuance-315720-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "adroit-nuance-315720",
    storageBucket: "adroit-nuance-315720.appspot.com",
    messagingSenderId: "631511442516",
    appId: "1:631511442516:web:7c5ed645044067692f39c1",
    measurementId: "G-24792FE8K4"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

const storage = firebase.storage();

export { auth, storage };