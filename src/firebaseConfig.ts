import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcvV0IJhVsXCEufYSlRrQvjKd7INk9EE8",
  authDomain: "foundly-7ccfa.firebaseapp.com",
  projectId: "foundly-7ccfa",
  storageBucket: "foundly-7ccfa.appspot.com",
  messagingSenderId: "1095905968116",
  appId: "1:1095905968116:web:d40437e147cfa7ef9d83a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
