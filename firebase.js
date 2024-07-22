import { initializeApp } from 'firebase/app';
import { collection, query, where, getDocs, setDoc, doc, getDoc, addDoc, getFirestore, updateDoc, deleteDoc, arrayUnion  } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


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

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);


const createUser = async (email, firstName, lastName) => {

    try {
        await setDoc(doc(db, 'users', email), {
            firstName,
            lastName,
            email: email,
            // TODO: add personal variables for custom prefrences.
        });

        await setDoc(doc(db, 'custom_recipes', email), {
            userEmail: email,
            recipes: []
        }, { merge: true });

        await setDoc(doc(db, 'favorite_recipes', email), {
            userEmail: email,
            recipes: [],
        }, { merge: true });

        console.log("|firebase - createUser| User created succesfully");

    } catch (error) {
        console.log("cant save user data: ", error);
    }
    
};

// const fetchUserRecipes = async (user) => {
//     if (!user || !user.email) {
//       throw new Error('Invalid user object');
//     }

//     try {
//       const recipesRef = collection(db, 'custom_recipes');
//       const q = query(recipesRef, where('userEmail', '==', user.email));
//       const querySnapshot = await getDocs(q);
//       const recipes = [];
  
//       querySnapshot.forEach((doc) => {
//         recipes.push({ id: doc.id, ...doc.data() });
//       });
  
//       return recipes;
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//       return [];
//     }
//   };
const fetchUserRecipes = async (user) => {
    if (!user || !user.email) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'custom_recipes', user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.recipes || [];
        } else {
            console.log('No custom recipes found for this user.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching user recipes:', error.message);
        return [];
    }
};


const addFavRecipe = async (user, recipeImage, recipeName, recipeUri, recipeURL) => {
    if (!user || !user.email) {
        throw new Error('Invalid user object');
    }

    const newRecipe = {
        recipeImage,
        recipeName,
        recipeUri,
        recipeURL
    };

    try {
        const docRef = doc(db, 'favorite_recipes', user.email);

        // Always set the document with the merge option to avoid overwriting
        await setDoc(docRef, {
            userEmail: user.email,
            recipes: arrayUnion(newRecipe)
        }, { merge: true });

        console.log("Recipe document updated successfully!");
    } catch (error) {
        console.error("Error adding recipe: ", error.message);
    }
};


const deleteFavRecipe = async (user, recipeUri) => {
    if (!user || !user.email) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'favorite_recipes', user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const updatedRecipes = userData.recipes.filter(recipe => recipe.recipeUri !== recipeUri);

            // Update the document with the filtered recipes
            await updateDoc(docRef, {
                recipes: updatedRecipes
            });

            console.log("Recipe removed successfully!");
        } else {
            console.log("No favorite recipes found for this user.");
        }
    } catch (error) {
        console.error("Error removing recipe: ", error.message);
    }
};


// const createCustomRecipe = async (user, recipeName, ingredients, productionSteps) => {
//     if (!user || !user.email) {
//         throw new Error('Invalid user object');
//     }

//     const newRecipe = {
//         recipeName,
//         ingredients,
//         productionSteps
//     };

//     try {
//         const docRef = doc(db, 'custom_recipes', user.email);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             const userData = docSnap.data();

//             // Update the document with the filtered recipes
//             await updateDoc(docRef, {
//                 recipes: arrayUnion(newRecipe)
//             });

//             console.log("Recipe added successfully!");
//         }
//     } catch (error) {
//         console.error("Error adding recipe: ", error.message);
//     }
// };
const createCustomRecipe = async (user, recipeName, ingredients, productionSteps) => {
    if (!user || !user.email) {
      throw new Error('Invalid user object');
    }
  
    const newRecipe = {
      recipeName,
      ingredients,
      productionSteps
    };
  
    try {
      const docRef = doc(db, 'custom_recipes', user.email);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const existingRecipes = userData.recipes || [];
  
        const recipeExists = existingRecipes.some(recipe => recipe.recipeName === recipeName);
  
        if (recipeExists) {
            // Add alert
            Alert.alert(
                "Can't save recipe",
                `${recipeName} is already exist.`,
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            )
            return;
        }
  
        // Update the document with the new recipe
        await updateDoc(docRef, {
          recipes: arrayUnion(newRecipe)
        });
        
        Alert.alert(
            'Recipe Saved!',
            `${recipeName} has beed saved successfully.`,
            [
            { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        )

        console.log("Recipe added successfully!");
      } else {
        // If the document does not exist, create it with the new recipe
        await setDoc(docRef, {
          recipes: [newRecipe]
        });
  
        console.log("Recipe document created and added successfully!");
      }
    } catch (error) {
      console.error("Error adding recipe: ", error.message);
    }
  };



const updateCustomRecipe = async (user, oldRecipeName, newRecipe) => {
    if (!user || !user.email) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'custom_recipes', user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const updatedRecipes = userData.recipes.map(recipe => 
                recipe.recipeName === oldRecipeName ? newRecipe : recipe
            );

            // Update the document with the updated recipes
            await updateDoc(docRef, {
                recipes: updatedRecipes
            });

            console.log("Recipe updated successfully!");
        } else {
            // Add alert
            console.log("No custom recipes found for this user.");
        }
    } catch (error) {
        console.error("Error updating recipe: ", error.message);
    }
};


const deleteCustomRecipe = async (user, recipeName) => {
    if (!user || !user.email) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'custom_recipes', user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const updatedRecipes = userData.recipes.filter(recipe => recipe.recipeName !== recipeName);

            // Update the document with the filtered recipes
            await updateDoc(docRef, {
                recipes: updatedRecipes
            });

            console.log("Recipe deleted successfully!");
        } else {
            console.log("No custom recipes found for this user.");
        }
    } catch (error) {
        console.error("Error deleting recipe: ", error.message);
    }
};

export { db, auth, createUser, createCustomRecipe, fetchUserRecipes, updateCustomRecipe, deleteCustomRecipe, addFavRecipe, deleteFavRecipe }; 

