import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getDocs, setDoc, doc, getDoc, addDoc, getFirestore } from 'firebase/firestore';



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


const createCustomRecipe = async (userEmail, recipeName, ingredients, productionSteps) => {
    try {
        const docName = `${recipeName} by ${userEmail}`

        const docRef = await setDoc(doc(db, 'custom_recipes', docName), {
            userEmail,
            recipeName,
            ingredients,
            productionSteps
            });
         console.log("Recipe document written by: ", userEmail);
    } catch (error) {
        console.error("Error adding recipe: ", error.message);
    }
};

const createUser = async (email, firstName, lastName) => {
    try {
        await setDoc(doc(db, 'users', email), {
            firstName,
            lastName,
            email: email,
            // TODO: add personal variables for custom prefrences.
        });
    } catch (error) {
        console.log("cant save user data: ", error);
    }
    
};

export { db, auth, createUser, createCustomRecipe }; 
