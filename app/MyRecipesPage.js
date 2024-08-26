import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from '../stylesheets/MyRecipesPageStyles';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

import { fetchUserRecipes, deleteCustomRecipe } from '../firebase';
import { auth } from '../firebase';
import NavigationBar from './NavigationBar';

const MyRecipesPage = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0); // Track the index of the current recipe
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigation = useNavigation();

  const loadRecipes = async () => {
    if (user) {
      try {
        const fetchedRecipes = await fetchUserRecipes(user);
        setRecipes(fetchedRecipes);
      } catch (error) {
        Alert.alert("Error", `Error fetching user recipes: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigation.navigate('LoginPage');
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [navigation, user]);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
      setEditMode(false);
    }, [])
  );

  const handleRecipePress = (recipe, index) => {
    if (editMode) {
      navigation.navigate('AddRecipePage', { recipe, user });
    } else {
      setSelectedRecipe(recipe);
      setSelectedRecipeIndex(index); // Set the current recipe index
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setSelectedRecipeIndex(0); // Reset index on close
  };

  const navigateRecipe = (direction) => {
    const newIndex = selectedRecipeIndex + direction;
    if (newIndex >= 0 && newIndex < recipes.length) {
      setSelectedRecipeIndex(newIndex);
      setSelectedRecipe(recipes[newIndex]); // Update the selected recipe based on the new index
    }
  };

  const confirmDelete = (recipe) => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this recipe?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => handleDelete(recipe.recipeName) }
      ]
    );
  };

  const handleDelete = async (recipeName) => {
    try {
      await deleteCustomRecipe(user, recipeName);
      setRecipes(recipes.filter(recipe => recipe.recipeName !== recipeName));
    } catch (error) {
      Alert.alert("Error", `Error deleting recipe: ${error.message}`);
    }
  };

  const renderRecipeItem = ({ item, index }) => (
    <View style={styles.recipeItemContainer}>
      <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item, index)}>
        <Text style={styles.recipeTitle}>{item.recipeName}</Text>
        <View style={styles.recipeDescription}>
          {item.ingredients.map((ingredient, i) => (
            <Text key={i}>{ingredient.name}: {ingredient.quantity}</Text>
          ))}
        </View>
      </TouchableOpacity>
      {editMode && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleRecipePress(item, index)}>
            <Feather name="edit" size={24} color={DARK_GREEN} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => confirmDelete(item)}>
            <Feather name="trash-2" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderModalContent = () => {
    if (!selectedRecipe) return null;

    return (
      <Modal visible={!!selectedRecipe} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedRecipe.recipeName}</Text>
            <Text style={styles.modalSubtitle}>Ingredients:</Text>
            <FlatList
              data={selectedRecipe.ingredients}
              renderItem={({ item, index }) => (
                <Text style={styles.modalText}>{`${index + 1}. ${item.name}: ${item.quantity}`}</Text>
              )}
              keyExtractor={(item, index) => `ingredient-${index}`}
            />
            <Text style={styles.modalSubtitle}>Steps:</Text>
            <FlatList
              data={selectedRecipe.productionSteps}
              renderItem={({ item, index }) => (
                <Text style={styles.modalText}>{`${index + 1}. ${item}`}</Text>
              )}
              keyExtractor={(item, index) => `step-${index}`}
            />
            <View style={styles.modalNavigation}>
              <TouchableOpacity
                style={[styles.navButton, selectedRecipeIndex === 0 && styles.disabledButton]}
                onPress={() => navigateRecipe(-1)}
                disabled={selectedRecipeIndex === 0}
              >
                <Feather name="arrow-left" size={24} color={selectedRecipeIndex === 0 ? LIGHT_GRAY : DARK_GREEN} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navButton, selectedRecipeIndex === recipes.length - 1 && styles.disabledButton]}
                onPress={() => navigateRecipe(1)}
                disabled={selectedRecipeIndex === recipes.length - 1}
              >
                <Feather name="arrow-right" size={24} color={selectedRecipeIndex === recipes.length - 1 ? LIGHT_GRAY : DARK_GREEN} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={DARK_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes</Text>
      {recipes.length === 0 ? (
        <View style={styles.centerContent}>
          <TouchableOpacity style={styles.bigPlusButton} onPress={() => navigation.navigate('AddRecipePage', { user })}>
            <Feather name="plus" size={50} color={WHITE} />
          </TouchableOpacity>
          <Text style={styles.noRecipesText}>There are no recipes saved, to add a recipe click the plus</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.smallPlusButton} onPress={() => navigation.navigate('AddRecipePage', { user })}>
            <Feather name="plus" size={24} color={WHITE} />
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
        <TouchableOpacity
          style={[styles.editButton, { alignSelf: 'center' }]} // Centering the button horizontally
          onPress={() => setEditMode(!editMode)}
        >
          <Text style={styles.editButtonText}>{editMode ? "Done" : "Edit"}</Text>
        </TouchableOpacity>
      )}
      <NavigationBar user={user} />
    </View>
  );
};

export default MyRecipesPage;
