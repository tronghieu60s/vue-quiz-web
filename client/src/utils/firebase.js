import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const API_KEY = process.env.VUE_APP_FIREBASE_API_KEY;
const PROJECT_ID = process.env.VUE_APP_FIREBASE_PROJECT_ID;
const SENDER_ID = process.env.VUE_APP_FIREBASE_SENDER_ID;
const APP_ID = process.env.VUE_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
