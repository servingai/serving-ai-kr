// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkGS-4rZyuRjYJcdkpTHMX-jH-ODWQsU4",
    authDomain: "servingai-af0b7.firebaseapp.com",
    projectId: "servingai-af0b7",
    storageBucket: "servingai-af0b7.firebasestorage.app",
    messagingSenderId: "961797414957",
    appId: "1:961797414957:web:0ee940703bc2cc4e9158a4",
    measurementId: "G-8611SBRZW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
