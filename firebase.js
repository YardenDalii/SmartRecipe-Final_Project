import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Update this import
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app'; // Use 'compat' to enable compatibility mode
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import 'firebase/compat/storage'; // Import storage directly

const firebaseConfig = {
    apiKey: "AIzaSyCe6aWZMqrJqL1G8OIX2aFCeXtdK3K9ThE",
    authDomain: "smartrecipe-e767f.firebaseapp.com",
    projectId: "smartrecipe-e767f",
    storageBucket: "smartrecipe-e767f.appspot.com",
    messagingSenderId: "200937507860",
    appId: "1:200937507860:web:58882ebbe053dbed0aab01",
    measurementId: "G-BGJZL5CSNM"
};

let app;

if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}


let auth;

if (Platform.OS == 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage directly

export { db, auth, storage };