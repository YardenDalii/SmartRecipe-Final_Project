import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCe6aWZMqrJqL1G8OIX2aFCeXtdK3K9ThE",
    authDomain: "smartrecipe-e767f.firebaseapp.com",
    projectId: "smartrecipe-e767f",
    storageBucket: "smartrecipe-e767f.appspot.com",
    messagingSenderId: "200937507860",
    appId: "1:200937507860:web:58882ebbe053dbed0aab01",
    measurementId: "G-BGJZL5CSNM"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };