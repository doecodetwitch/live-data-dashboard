import {initializeApp} from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite';

import { getAuth, connectAuthEmulator } from "firebase/auth";

// TODO: Use a configuration object
const app = initializeApp({
  apiKey: "AIzaSyCIEWz_2TYSwnwHaGb80BKoiVjAlBGirzo",
  authDomain: "live-data-dashboard.firebaseapp.com",
  databaseURL: "https://live-data-dashboard-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "live-data-dashboard",
  storageBucket: "live-data-dashboard.appspot.com",
  messagingSenderId: "820291713072",
  appId: "1:820291713072:web:8839dec959880267d695f5"
});

const db = getFirestore(app);
const auth = getAuth(app);
// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
  }

export { db, auth };