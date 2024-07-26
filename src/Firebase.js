// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBunjhzpbf2N4SQNpFaUBXevUs87S-0dYQ',
  authDomain: 'notes-c2e56.firebaseapp.com',
  projectId: 'notes-c2e56',
  storageBucket: 'notes-c2e56.appspot.com',
  messagingSenderId: '1042915822078',
  appId: '1:1042915822078:web:28f0b17c5ae492785e98af',
  measurementId: 'G-BNHNJ8FVPR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const notesCollection = collection(db, 'notes');

export { db, notesCollection, auth };
