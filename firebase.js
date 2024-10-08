import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'

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


const createUser = async (uid, email, firstName, lastName) => {
    try {
        await setDoc(doc(db, 'users', uid), {
            firstName,
            lastName,
            email,
            createdRecipes: 0,
            savedRecipes: 0
        });

        await setDoc(doc(db, 'custom_recipes', uid), {
            recipes: []
        }, { merge: true });

        await setDoc(doc(db, 'favorite_recipes', uid), {
            recipes: []
        }, { merge: true });

        console.log("|firebase - createUser| User created successfully");
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            Alert.alert(
                "Can't create user",
                `${email} already exists.`,
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        }
        else {
            Alert.alert(
                "Error",
                `Can't save user data: ${error.message}`,
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        }
        // console.error("Can't save user data: ", error);
    }
};

const addFavRecipe = async (user, recipeImage, recipeName, recipeUri, recipeURL) => {
    if (!user || !user.uid) {
        throw new Error('Invalid user object');
    }

    const newRecipe = {
        recipeImage,
        recipeName,
        recipeUri,
        recipeURL
    };

    try {
        const docRef = doc(db, 'favorite_recipes', user.uid);

        await setDoc(docRef, {
            recipes: arrayUnion(newRecipe)
        }, { merge: true });

        const userDoc = doc(db, 'users', user.uid);

        await updateDoc(userDoc, {
            savedRecipes: increment(1)
        });

        console.log("Recipe document updated successfully!");
    } catch (error) {
        Alert.alert(
            "Error",
            `Error adding recipe: ${error.message}`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
        // console.error("Error adding recipe: ", error.message);
    }
};

const deleteFavRecipe = async (user, recipeUri) => {
    if (!user || !user.uid) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'favorite_recipes', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const updatedRecipes = userData.recipes.filter(recipe => recipe.recipeUri !== recipeUri);

            await updateDoc(docRef, {
                recipes: updatedRecipes
            });

            const userDoc = doc(db, 'users', user.uid);

            await updateDoc(userDoc, {
                savedRecipes: increment(-1)
            });

            console.log("Recipe removed successfully!");
        } else {
            console.log("No favorite recipes found for this user.");
        }
    } catch (error) {
        Alert.alert(
            "Error",
            `Error removing recipe: ${error.message}`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
        // console.error("Error removing recipe: ", error.message);
    }
};

const fetchUserRecipes = async (user) => {
    if (!user || !user.uid) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'custom_recipes', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.recipes || [];
        } else {
            console.log('No custom recipes found for this user.');
            return [];
        }
    } catch (error) {
        Alert.alert(
            "Error",
            `Error fetching user recipes: ${error.message}`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
        // console.error('Error fetching user recipes:', error.message);
        return [];
    }
};

const createCustomRecipe = async (user, recipeName, ingredients, productionSteps) => {
    if (!user || !user.uid) {
        throw new Error('Invalid user object');
    }

    const newRecipe = {
        recipeName,
        ingredients,
        productionSteps
    };

    try {
        const docRef = doc(db, 'custom_recipes', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const existingRecipes = userData.recipes || [];

            const recipeExists = existingRecipes.some(recipe => recipe.recipeName === recipeName);

            if (recipeExists) {
                throw new Error(`${recipeName} already exists.`);
            }

            await updateDoc(docRef, {
                recipes: arrayUnion(newRecipe)
            });

            const userDoc = doc(db, 'users', user.uid);

            await updateDoc(userDoc, {
                createdRecipes: increment(1)
            });

            console.log("Recipe added successfully!");
        } else {
            await setDoc(docRef, {
                recipes: [newRecipe]
            });

            console.log("Recipe document created and added successfully!");
        }
    } catch (error) {
        // If you want to propagate the error to the caller, rethrow it
        throw new Error(`Error adding recipe: ${error.message}`);
    }
};


const updateCustomRecipe = async (user, oldRecipeName, newRecipe) => {
    if (!user || !user.uid) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'custom_recipes', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const existingRecipes = userData.recipes || [];

            // Check if the new recipe name already exists and is different from the old name
            const nameConflict = existingRecipes.some(recipe =>
                recipe.recipeName === newRecipe.recipeName && recipe.recipeName !== oldRecipeName
            );

            if (nameConflict) {
                throw new Error(`A recipe with the name "${newRecipe.recipeName}" already exists. Please choose a different name.`);
            }

            // Proceed to update the recipe
            const updatedRecipes = existingRecipes.map(recipe =>
                recipe.recipeName === oldRecipeName ? newRecipe : recipe
            );

            await updateDoc(docRef, {
                recipes: updatedRecipes
            });

            console.log("Recipe updated successfully!");
        } else {
            console.log("No custom recipes found for this user.");
        }
    } catch (error) {
        // Re-throw the error to handle it in the calling function, or show an alert here if necessary
        throw new Error(`Error updating recipe: ${error.message}`);
    }
};

const deleteCustomRecipe = async (user, recipeName) => {
    if (!user || !user.uid) {
        throw new Error('Invalid user object');
    }

    try {
        const docRef = doc(db, 'custom_recipes', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const updatedRecipes = userData.recipes.filter(recipe => recipe.recipeName !== recipeName);

            await updateDoc(docRef, {
                recipes: updatedRecipes
            });

            const userDoc = doc(db, 'users', user.uid);

            await updateDoc(userDoc, {
                createdRecipes: increment(-1)
            });

            console.log("Recipe deleted successfully!");
        } else {
            console.log("No custom recipes found for this user.");
        }
    } catch (error) {
        Alert.alert(
            "Error",
            `Error deleting recipe ${error.message}`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
        // console.error("Error deleting recipe: ", error.message);
    }
};

export { db, auth, createUser, createCustomRecipe, fetchUserRecipes, updateCustomRecipe, deleteCustomRecipe, addFavRecipe, deleteFavRecipe };