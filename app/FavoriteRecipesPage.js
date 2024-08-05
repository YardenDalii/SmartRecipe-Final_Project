import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import styles from '../stylesheets/FavoriteRecipesPageStyles'; // Make sure to create this stylesheet
import styles from '../stylesheets/HomePageStyles';
import { db, addFavRecipe, deleteFavRecipe } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import NavigationBar from './NavigationBar';
import { useNavigation } from '@react-navigation/native';

const FavoriteRecipesPage = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (user || user.email) {
        try {
          const docRef = doc(db, 'favorite_recipes', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRecipes(docSnap.data().recipes || []);
          } else {
            console.log('No favorite recipes found for this user.');
          }
        } catch (error) {
          console.error('Error fetching favorite recipes:', error);
        }
      } else {
        navigation.navigate('LoginPage'); // Redirect to login if user is not authenticated
      }
    };

    fetchFavoriteRecipes();
  }, [user]);


  const handleRemoveFavorite = async (user, recipeUri, label) => {
    try {
      await deleteFavRecipe(user, recipeUri);
      // Refresh favorite recipes
      const docRef = doc(db, 'favorite_recipes', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRecipes(docSnap.data().recipes || []);
      }

      Alert.alert(
        'Recipe Removed!!',
        `${label} has beed removed from favorites.`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
    } catch (error) {
      console.error('Error removing favorite recipe:', error);
    }
  };

  const renderRecipeItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.recipeCard}>
        <Image source={{ uri: item.recipeImage }} style={styles.recipeImage} />
        <Text style={styles.recipeTitle}>{item.recipeName}</Text>
        <TouchableOpacity onPress={() => handleOpenURL(item.recipeURL)}>
          <Text style={styles.recipeUrl}>{item.recipeURL}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => handleRemoveFavorite(user, item.recipeUri, item.recipeName)}>
          <Feather name="minus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUserText}>Please log in to view your favorite recipes.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorite Recipes</Text>
      </View>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item, index) => `recipe-${index}`}
      />
      <NavigationBar showHomeIcon={false} navigation={navigation} user={user} />
    </SafeAreaView>
  );
};

export default FavoriteRecipesPage;