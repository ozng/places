import * as firebase from 'firebase';
import "firebase/storage";
import { firebaseConfig } from './env.js'

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

const storage = firebase.storage();

export { auth, storage };