import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Button, Linking, Alert, ScrollView, Animated } from 'react-native';
import styles from '../stylesheets/HomePageStyles';
import menuStyles from '../stylesheets/MenuModalStyles';
import { Feather } from '@expo/vector-icons';
import NavigationBar from '../app/NavigationBar';
import { fetchRecipesByMealType } from '../utils/recipeService';
import { useNavigation } from '@react-navigation/native';
import { db, auth, addFavRecipe, fetchUserRecipes } from '../firebase';
import { onSnapshot, doc } from 'firebase/firestore';

const HomePage = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [mealType, setMealType] = useState('');
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(200)); // Initial value for X position, off-screen right


  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setFullName(`${userData.firstName} ${userData.lastName}`);
          }
        });

        const recipesRef = doc(db, 'custom_recipes', user.uid);
        const unsubscribeRecipes = onSnapshot(recipesRef, (recipesSnap) => {
          if (recipesSnap.exists()) {
            const userRecipesData = recipesSnap.data().recipes || [];
            setUserRecipes(userRecipesData);
          } else {
            setUserRecipes([]);
          }
        });

        const favoriteRecipesRef = doc(db, 'favorite_recipes', user.uid);
        const unsubscribeFavoriteRecipes = onSnapshot(favoriteRecipesRef, (favoriteSnap) => {
          if (favoriteSnap.exists()) {
            const favoriteRecipesData = favoriteSnap.data().recipes || [];
            setFavoriteRecipes(favoriteRecipesData);
          } else {
            setFavoriteRecipes([]);
          }
        });

        return () => {
          unsubscribeSnapshot();
          unsubscribeRecipes();
          unsubscribeFavoriteRecipes();
        };
      } else {
        setUser(null);
        setFullName('');
        setUserRecipes([]);
        setFavoriteRecipes([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
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
        setRecommendedRecipes(fetchedRecipes);
      } catch (error) {
        Alert.alert(
          "Error",
          `Error fetching recipes: ${error.message}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    };
    fetchRecommendedRecipes();
  }, [mealType]);

  const handleOpenURL = (url) => {
    Linking.openURL(url);
  };

  const handleAddFavorite = async (user, image, label, uri, url) => {
    if (!user) {
      // If the user is not logged in, show an alert
      Alert.alert(
        'Sign In Required',
        'In order to pick a favorite recipe, you need to sign in to the app.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    try {
      await addFavRecipe(user, image, label, uri, url);
      Alert.alert(
        'Recipe Added!',
        `${label} has been added to favorites.`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(
        "Error",
        `Error adding to favorites: ${error.message}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  const loadRecipes = async () => {
    if (user) {
      try {
        const fetchedRecipes = await fetchUserRecipes(user);
        setRecipes(fetchedRecipes);
      } catch (error) {
        Alert.alert(
          "Error",
          `Error fetching user recipes: ${error.message}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        setFullName('');
        setMenuModalVisible(false);
        navigation.navigate('LoginPage');
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          `Error signing out: ${error.message}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('AddRecipePage', { recipe, user });
  };

  const openMenuModal = () => {
    setMenuModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenuModal = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuModalVisible(false));
  };

  const navigateToAboutPage = () => {
    closeMenuModal();
    setMenuModalVisible(false);
    navigation.navigate('AboutPage', {user});
  };

  const navigateToAboutUsPage = () => {
    closeMenuModal();
    setMenuModalVisible(false);
    navigation.navigate('AboutUsPage', {user});
  };

  const renderUserRecipeItem = ({ item, index }) => (
    <TouchableOpacity style={styles.userRecipeCard} onPress={() => openRecipeModal(index)}>
      <Text
        style={styles.userRecipeTitle}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
      >
        {item.recipeName}
      </Text>
    </TouchableOpacity>
  );

  const renderRecommendedRecipeItem = ({ item, index }) => {
    const { recipe } = item;
    return (
      <View key={index} style={styles.recipeCard}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <Text style={styles.recipeTitle}>{recipe.label}</Text>
        <TouchableOpacity onPress={() => handleOpenURL(recipe.url)}>
          <Text style={styles.recipeUrl}  numberOfLines={2} ellipsizeMode="tail">{recipe.url}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => handleAddFavorite(user, recipe.image, recipe.label, recipe.uri, recipe.url)}>
          <Feather name="star" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFavoriteRecipeItem = ({ item, index }) => (
    <View key={index} style={styles.recipeCard}>
      <Image source={{ uri: item.recipeImage }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.recipeName}</Text>
      <TouchableOpacity onPress={() => handleOpenURL(item.recipeURL)}>
        <Text style={styles.recipeUrl}>{item.recipeURL}</Text>
      </TouchableOpacity>
    </View>
  );

  const openRecipeModal = (index) => {
    if (index >= 0 && index < userRecipes.length) {
      setCurrentRecipeIndex(index);
      setModalVisible(true);
    }
  };

  const closeRecipeModal = () => {
    setModalVisible(false);
  };

  const navigateRecipe = (direction) => {
    const newIndex = currentRecipeIndex + direction;
    if (newIndex >= 0 && newIndex < userRecipes.length) {
      setCurrentRecipeIndex(newIndex);
    }
  };

  const refreshRecommendedRecipes = () => {
    const shuffledRecipes = [...recommendedRecipes].sort(() => 0.5 - Math.random());
    setRecommendedRecipes(shuffledRecipes);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openMenuModal} style={styles.menuButton}>
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome {fullName}!</Text>
          <TouchableOpacity onPress={openMenuModal} style={menuStyles.menuButton}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity> 
        </View>
        {user && (
          <>
            <Text style={styles.subHeader}>My Recipes</Text>
            {userRecipes.length === 0 ? (
              <Text style={styles.noRecipesText}>No saved recipes yet.</Text>
            ) : (
              <FlatList
                data={userRecipes}
                renderItem={renderUserRecipeItem}
                keyExtractor={(item, index) => `user-recipe-${index}`}
                horizontal
              />
            )}
            <Text style={styles.subHeader}>Favorite Recipes</Text>
            {favoriteRecipes.length === 0 ? (
              <Text style={styles.noRecipesText}>No favorite recipes yet.</Text>
            ) : (
              <FlatList
                data={favoriteRecipes}
                renderItem={renderFavoriteRecipeItem}
                keyExtractor={(item, index) => `favorite-recipe-${index}`}
                horizontal
              />
            )}
            </>
        )}
        <View style={styles.refreshContainer}>
          <Text style={styles.subHeader}>Recommended Recipes for {mealType}</Text>
          <TouchableOpacity onPress={refreshRecommendedRecipes} style={styles.refreshButton}>
            <Feather name="refresh-cw" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={recommendedRecipes}
          renderItem={renderRecommendedRecipeItem}
          keyExtractor={(item, index) => `recommended-recipe-${index}`}
          horizontal
        />
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeRecipeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.userModalContent}>
              {userRecipes[currentRecipeIndex] ? (
                <ScrollView style={styles.modalScrollView}>
                  <Text style={styles.modalTitle}>{userRecipes[currentRecipeIndex].recipeName}</Text>
                  <Text style={styles.modalSectionTitle}>Ingredients:</Text>
                  {userRecipes[currentRecipeIndex].ingredients.map((ing, i) => (
                    <Text key={i} style={styles.modalText}>{`${ing.name}: ${ing.quantity}`}</Text>
                  ))}
                  <Text style={styles.modalSectionTitle}>Steps:</Text>
                  {userRecipes[currentRecipeIndex].productionSteps.map((step, i) => (
                    <Text key={i} style={styles.modalText}>{`${i + 1}. ${step}`}</Text>
                  ))}
                </ScrollView>
              ) : (
                <Text style={styles.modalTitle}>Recipe not found.</Text>
              )}
              <View style={styles.navigationButtons}>
                <TouchableOpacity onPress={() => navigateRecipe(-1)} disabled={currentRecipeIndex === 0}>
                  <Feather name="arrow-left" size={24} color={currentRecipeIndex === 0 ? "#ccc" : "black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateRecipe(1)} disabled={currentRecipeIndex === userRecipes.length - 1}>
                  <Feather name="arrow-right" size={24} color={currentRecipeIndex === userRecipes.length - 1 ? "#ccc" : "black"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={closeRecipeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {menuModalVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={menuModalVisible}
          onRequestClose={closeMenuModal}
        >
          <TouchableOpacity style={menuStyles.overlay} onPress={closeMenuModal} />
          <Animated.View
            style={[
              menuStyles.menuDropdownContainer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <TouchableOpacity onPress={closeMenuModal} style={menuStyles.closeButton}>
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <View style={menuStyles.divider} />
              <TouchableOpacity style={menuStyles.menuItem} onPress={navigateToAboutPage}>
                <Text style={menuStyles.menuItemText}>How to use the camera feature?</Text>
              </TouchableOpacity>
            <View style={menuStyles.divider} />
            <TouchableOpacity style={menuStyles.menuItem} onPress={navigateToAboutUsPage}>
                <Text style={menuStyles.menuItemText}>About Us</Text>
              </TouchableOpacity>
            <View style={menuStyles.divider} />
            <TouchableOpacity style={menuStyles.menuItemLogout} onPress={handleLogout}>
              <Text style={menuStyles.menuItemLogoutText}>Logout</Text>
            </TouchableOpacity>
            {/* <View style={menuStyles.menuItem}>
              <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
            </View> */}
          </Animated.View>
        </Modal>
      )}
      </ScrollView>
      <NavigationBar showHomeIcon={false} navigation={navigation} user={user} />
    </SafeAreaView>
  );
};

export default HomePage;
