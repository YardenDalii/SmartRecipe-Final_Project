import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getDocs, setDoc, doc, getDoc, addDoc, getFirestore, updateDoc, deleteDoc  } from 'firebase/firestore';



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

const fetchUserRecipes = async (user) => {
    if (!user || !user.email) {
      throw new Error('Invalid user object');
    }
  
    try {
      const recipesRef = collection(db, 'custom_recipes');
      const q = query(recipesRef, where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const recipes = [];
  
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
  
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };


const getUserItem = async (user) => {
    try {
        const docRef = doc(db, 'users', user.email);
        return await getDoc(docRef);

    } catch(error) {
        console.error("cant find item: ", error);
        return;
    }
}

const updateRecipe = async (recipe) => {
    try {
        const docRef = doc(db, 'custom_recipes', recipe.id);
        await updateDoc(docRef, {
            recipeName: recipe.recipeName,
            ingredients: recipe.ingredients,
            productionSteps: recipe.productionSteps
        });
        console.log("Recipe updated successfully");
    } catch (error) {
        console.error("Error updating recipe: ", error.message);
    }
};

// Add the deleteRecipe function
const deleteRecipe = async (recipeId) => {
    try {
        const docRef = doc(db, 'custom_recipes', recipeId);
        await deleteDoc(docRef);
        console.log("Recipe deleted successfully");
    } catch (error) {
        console.error("Error deleting recipe: ", error.message);
    }
};

export { db, auth, createUser, createCustomRecipe, fetchUserRecipes, updateRecipe, deleteRecipe }; 
