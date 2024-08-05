import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, ActivityIndicator, Alert, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from '../stylesheets/MyRecipesPageStyles'; // Import the main page styles
import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles

import { fetchUserRecipes, deleteCustomRecipe } from '../firebase'; // Make sure these functions are correctly implemented in firebase.js
import { auth } from '../firebase'; // Ensure correct path to your firebase setup
import NavigationBar from './NavigationBar';

const MyRecipesPage = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigation = useNavigation();

  const loadRecipes = async () => {
    if (user) {
      console.log("MY_RECIPE_WORK_ALREADY!!!")
      try {
        const fetchedRecipes = await fetchUserRecipes(user);
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigation.navigate('LoginPage'); // Redirect to login if user is not authenticated
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [navigation, user]);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
      setEditMode(false); // Reset edit mode when the component is focused
    }, [])
  );

  const handleRecipePress = (recipe) => {
    if (editMode) {
      navigation.navigate('AddRecipePage', { recipe, user });
    } else {
      setSelectedRecipe(recipe);
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const confirmDelete = (recipe) => {
    console.log("RECIPE ID: ", recipe.recipeName);
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this recipe?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => handleDelete(recipe.recipeName)
        }
      ]
    );
  };

  const handleDelete = async (recipeName) => {
    try {
      await deleteCustomRecipe(user, recipeName); // Ensure deleteRecipe is correctly implemented in firebase.js
      setRecipes(recipes.filter(recipe => recipe.recipeName !== recipeName));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeItemContainer}>
      <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
        <Text style={styles.recipeTitle}>{item.recipeName}</Text>
        <View style={styles.recipeDescription}>
        {item.ingredients.map((ingredient, index) => (
          <Text key={index}>{ingredient.name}: {ingredient.quantity}</Text>
        ))}
      </View>
      </TouchableOpacity>
      {editMode && (
        <>
          <Button title="Edit" onPress={() => handleRecipePress(item)} />
          <Button title="Delete" onPress={() => confirmDelete(item)} />
        </>
      )}
    </View>
  );

  const renderModalContent = () => {
    if (!selectedRecipe) return null;

    return (
      <Modal visible={!!selectedRecipe} animationType="slide" transparent>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>{selectedRecipe.recipeName}</Text>
            <Text style={modalStyles.modalSubtitle}>Ingredients:</Text>
            <FlatList
              data={selectedRecipe.ingredients}
              renderItem={({ item }) => <Text style={modalStyles.modalText}>{item.name}: {item.quantity}</Text>}
            />
            <Text style={modalStyles.modalSubtitle}>Steps:</Text>
            <FlatList
              data={selectedRecipe.productionSteps}
              renderItem={({ item }) => <Text style={modalStyles.modalText}>{item}</Text>}
              keyExtractor={(item, index) => `step-${index}`}
            />
            <TouchableOpacity style={modalStyles.modalCloseButton} onPress={closeModal}>
              <Text style={modalStyles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {recipes.length === 0 ? (
        <View style={styles.centerContent}>
          <TouchableOpacity style={styles.bigPlusButton} onPress={() => navigation.navigate('AddRecipePage', { user })}>
            <Feather name="plus" size={50} color="white" />
          </TouchableOpacity>
          <Text style={styles.noRecipesText}>There are no recipes saved, to add a recipe click the plus</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.smallPlusButton} onPress={() => navigation.navigate('AddRecipePage', { user })}>
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
          <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.recipeName}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        </>

        
      )}
      {renderModalContent()}
      {recipes.length > 0 && (
        <Button
          title={editMode ? "Done" : "Edit"}
          onPress={() => setEditMode(!editMode)}
          style={styles.editButton}
        />
      )}
      <NavigationBar user={user} />
    </View>
  );
};

export default MyRecipesPage;
