// import React, { useState, useEffect } from 'react';
// import { Alert } from 'react-native';
// import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Button, Linking } from 'react-native';
// import styles from '../stylesheets/HomePageStyles';
// import { Entypo, Feather } from '@expo/vector-icons';
// import NavigationBar from '../app/NavigationBar';
// import ProfilePage from './ProfilePage'; // Import the ProfilePage component
// import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles
// import { fetchRecipesByMealType } from '../utils/recipeService';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { db, auth, addFavRecipe, deleteFavRecipe } from '../firebase'; // Import Firebase auth
// import { doc, getDoc } from 'firebase/firestore';

// const HomePage = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [mealType, setMealType] = useState('');
//   const [user, setUser] = useState(null); // State to hold user information
//   const [fullName, setFullName] = useState(''); // State to hold user's full name
//   const navigation = useNavigation();


//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         setUser(user);

//         try {
//           const docRef = doc(db, 'users', user.email);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const userData = docSnap.data();
//             setFullName(`${userData.firstName} ${userData.lastName}`);
//           } else {
//             console.error('User document not found');
//           }
//         } catch (error) {
//           console.error('Error fetching user:', error);
//         }
//       } else {
//         setUser(null);
//         setFullName('');
//       }
//     });

//     return () => unsubscribe();
//   }, []);


//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const currentHour = new Date().getHours();
//       let mealType = '';

//       if (currentHour >= 5 && currentHour < 12) {
//         mealType = 'Breakfast';
//       } else if (currentHour >= 12 && currentHour < 16) {
//         mealType = 'Lunch';
//       } else if (currentHour >= 16 && currentHour < 22) {
//         mealType = 'Dinner';
//       }

//       setMealType(mealType);

//       try {
//         const fetchedRecipes = await fetchRecipesByMealType(mealType);
//         setRecipes(fetchedRecipes);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleProfilePress = () => {
//     // if (isGuest) {
//     //   alert('You need to be logged in to access the profile.');
//     //   return;
//     // }
//     setModalVisible(true); // Show the modal
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false); // Hide the modal
//   };

//   const handleOpenURL = (url) => {
//     Linking.openURL(url);
//   };

//   const handleAddFavorite = async (user, image, label, uri, url) => {
//     try {
//       await addFavRecipe(user, image, label, uri, url);
//       Alert.alert(
//         'Recipe Added!',
//         `${label} has beed added to favorites.`,
//         [
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ],
//         { cancelable: false }
//       )
//       console.log('Recipe added to favorites');
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//     }
//   };

//   const handleRemoveFavorite = async (user, uri) => {
//     try {
//       await deleteFavRecipe(user, uri);
//       console.log('Recipe removed from favorites');
//     } catch (error) {
//       console.error('Error removing from favorites:', error);
//     }
//   };
  
//   const handleLogout = () => {
//     // if (isGuest) {
//     //   navigation.navigate('LoginPage');
//     //   return;
//     // }

//     auth.signOut()
//       .then(() => {
//         // Sign-out successful.
//         setUser(null);
//         setFullName('');
//         navigation.navigate('LoginPage'); // Assuming you have a login page to navigate to
//       })
//       .catch((error) => {
//         console.error('Error signing out:', error);
//       });
//   };

//   const renderRecipeItem = ({ item, index }) => {
//     // TODO: add a star button to add into favorites - only if user is authenticated.
//     const { recipe } = item;
//     return (
//       <View key={index} style={styles.recipeCard}>
//         <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
//         <Text style={styles.recipeTitle}>{recipe.label}</Text>
//         <TouchableOpacity onPress={() => handleOpenURL(recipe.url)}>
//           <Text style={styles.recipeUrl}>{recipe.url}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navIcon} onPress={() => handleAddFavorite(user, recipe.image, recipe.label, recipe.uri, recipe.url)}>
//           <Feather name="star" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navIcon} onPress={() => handleRemoveFavorite(user, recipe.uri)}>
//           <Feather name="minus" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     );
//   };
  
//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <Button onPress={handleLogout} title="Logout" color="#e74c3c" />
//       ),
//     });
//   }, [navigation]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Welcome {fullName}!</Text>
//       </View>
//       <Text style={styles.subHeader}>Recommended Recipes for {mealType}</Text>
//       <FlatList
//         data={recipes}
//         renderItem={renderRecipeItem}
//         keyExtractor={(item, index) => `recipe-${index}`}
//       />
      
//       {user && ( // Display logout button only if user is logged in
//         <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
//       )}
      
//       <NavigationBar showHomeIcon={false} navigation={navigation} user={user} />

      
//     </SafeAreaView>
//   );
// };

// export default HomePage;





// import React, { useState, useEffect } from 'react';
// import { Alert, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Button, Linking } from 'react-native';
// import styles from '../stylesheets/HomePageStyles';
// import { Feather } from '@expo/vector-icons';
// import NavigationBar from '../app/NavigationBar';
// import ProfilePage from './ProfilePage'; // Import the ProfilePage component
// import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles
// import { fetchRecipesByMealType } from '../utils/recipeService';
// import { useNavigation } from '@react-navigation/native';
// import { db, auth, addFavRecipe, deleteFavRecipe } from '../firebase'; // Import Firebase auth
// import { doc, getDoc } from 'firebase/firestore';

// const HomePage = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [mealType, setMealType] = useState('');
//   const [user, setUser] = useState(null); // State to hold user information
//   const [fullName, setFullName] = useState(''); // State to hold user's full name
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         setUser(user);

//         try {
//           const docRef = doc(db, 'users', user.email);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const userData = docSnap.data();
//             setFullName(`${userData.firstName} ${userData.lastName}`);
//           } else {
//             console.error('User document not found');
//           }
//         } catch (error) {
//           console.error('Error fetching user:', error);
//         }
//       } else {
//         setUser(null);
//         setFullName('');
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const currentHour = new Date().getHours();
//       let mealType = '';

//       if (currentHour >= 5 && currentHour < 12) {
//         mealType = 'Breakfast';
//       } else if (currentHour >= 12 && currentHour < 16) {
//         mealType = 'Lunch';
//       } else if (currentHour >= 16 && currentHour < 22) {
//         mealType = 'Dinner';
//       }

//       setMealType(mealType);

//       try {
//         const fetchedRecipes = await fetchRecipesByMealType(mealType);
//         setRecipes(fetchedRecipes);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleProfilePress = () => {
//     setModalVisible(true); // Show the modal
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false); // Hide the modal
//   };

//   const handleOpenURL = (url) => {
//     Linking.openURL(url);
//   };

//   const handleAddFavorite = async (user, image, label, uri, url) => {
//     try {
//       await addFavRecipe(user, image, label, uri, url);
//       Alert.alert(
//         'Recipe Added!',
//         `${label} has beed added to favorites.`,
//         [
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ],
//         { cancelable: false }
//       )
//       console.log('Recipe added to favorites');
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//     }
//   };

//   const handleRemoveFavorite = async (user, uri) => {
//     try {
//       await deleteFavRecipe(user, uri);
//       console.log('Recipe removed from favorites');
//     } catch (error) {
//       console.error('Error removing from favorites:', error);
//     }
//   };
  
//   const handleLogout = () => {
//     auth.signOut()
//       .then(() => {
//         // Sign-out successful.
//         setUser(null);
//         setFullName('');
//         navigation.navigate('LoginPage'); // Assuming you have a login page to navigate to
//       })
//       .catch((error) => {
//         console.error('Error signing out:', error);
//       });
//   };

//   const renderRecipeItem = ({ item, index }) => {
//     // TODO: add a star button to add into favorites - only if user is authenticated.
//     const { recipe } = item;
//     return (
//       <View key={index} style={styles.recipeCard}>
//         <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
//         <Text style={styles.recipeTitle}>{recipe.label}</Text>
//         <TouchableOpacity onPress={() => handleOpenURL(recipe.url)}>
//           <Text style={styles.recipeUrl}>{recipe.url}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navIcon} onPress={() => handleAddFavorite(user, recipe.image, recipe.label, recipe.uri, recipe.url)}>
//           <Feather name="star" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navIcon} onPress={() => handleRemoveFavorite(user, recipe.uri)}>
//           <Feather name="minus" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     );
//   };
  
//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <Button onPress={handleLogout} title="Logout" color="#e74c3c" />
//       ),
//     });
//   }, [navigation]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Welcome {fullName}!</Text>
//         {user && (
//           <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//             <Feather name="log-out" size={20} color="black" />
//           </TouchableOpacity>
//         )}
//       </View>
//       <Text style={styles.subHeader}>Recommended Recipes for {mealType}</Text>
//       <FlatList
//         data={recipes}
//         renderItem={renderRecipeItem}
//         keyExtractor={(item, index) => `recipe-${index}`}
//       />
//       <NavigationBar showHomeIcon={false} navigation={navigation} user={user} />
//     </SafeAreaView>
//   );
// };

// export default HomePage;





import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Button, Linking, Alert } from 'react-native';
import styles from '../stylesheets/HomePageStyles';
import { Feather } from '@expo/vector-icons';
import NavigationBar from '../app/NavigationBar';
import ProfilePage from './ProfilePage'; // Import the ProfilePage component
import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles
import { fetchRecipesByMealType } from '../utils/recipeService';
import { useNavigation } from '@react-navigation/native';
import { db, auth, addFavRecipe, deleteFavRecipe } from '../firebase'; // Import Firebase auth
import { doc, getDoc } from 'firebase/firestore';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [mealType, setMealType] = useState('');
  const [user, setUser] = useState(null); // State to hold user information
  const [fullName, setFullName] = useState(''); // State to hold user's full name
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setFullName(`${userData.firstName} ${userData.lastName}`);
          } else {
            console.error('User document not found');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else {
        setUser(null);
        setFullName('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const currentHour = new Date().getHours();
      let mealType = '';

      if (currentHour >= 5 && currentHour < 12) {
        mealType = 'Breakfast';
      } else if (currentHour >= 12 && currentHour < 16) {
        mealType = 'Lunch';
      } else if (currentHour >= 16 && currentHour < 22) {
        mealType = 'Dinner';
      }

      setMealType(mealType);

      try {
        const fetchedRecipes = await fetchRecipesByMealType(mealType);
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleProfilePress = () => {
    setModalVisible(true); // Show the modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Hide the modal
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url);
  };

  const handleAddFavorite = async (user, image, label, uri, url) => {
    try {
      await addFavRecipe(user, image, label, uri, url);
      Alert.alert(
        'Recipe Added!',
        `${label} has beed added to favorites.`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
      console.log('Recipe added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setFullName('');
        navigation.navigate('LoginPage'); // Assuming you have a login page to navigate to
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const renderRecipeItem = ({ item, index }) => {
    // TODO: add a star button to add into favorites - only if user is authenticated.
    const { recipe } = item;
    return (
      <View key={index} style={styles.recipeCard}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <Text style={styles.recipeTitle}>{recipe.label}</Text>
        <TouchableOpacity onPress={() => handleOpenURL(recipe.url)}>
          <Text style={styles.recipeUrl}>{recipe.url}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => handleAddFavorite(user, recipe.image, recipe.label, recipe.uri, recipe.url)}>
          <Feather name="star" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleLogout} title="Logout" color="#e74c3c" />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome {fullName}!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Feather name="log-out" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeader}>Recommended Recipes for {mealType}</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item, index) => `recipe-${index}`}
      />
      <NavigationBar showHomeIcon={false} navigation={navigation} user={user} />
    </SafeAreaView>
  );
};

export default HomePage;