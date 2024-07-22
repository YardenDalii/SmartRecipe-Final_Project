
// const MyRecipesPage = () => {
//   const recipes = [
//     { id: 1, title: 'Pasta Carbonara', description: 'Classic Italian pasta dish', ingredients: ['Pasta', 'Eggs', 'Bacon'], steps: ['Cook pasta', 'Fry bacon', 'Mix eggs with pasta'] },
//     { id: 2, title: 'Chocolate Cake', description: 'Decadent chocolate dessert', ingredients: ['Chocolate', 'Flour', 'Sugar'], steps: ['Mix ingredients', 'Bake in oven', 'Enjoy!'] },
//     // Add more recipes as needed
//   ];

//   const [selectedRecipe, setSelectedRecipe] = useState(null);

//   const handleRecipePress = (recipe) => {
//     setSelectedRecipe(recipe);
//   };

//   const closeModal = () => {
//     setSelectedRecipe(null);
//   };

//   const renderRecipeItem = ({ item }) => (
//     <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
//       <Text style={styles.recipeTitle}>{item.title}</Text>
//       <Text style={styles.recipeDescription}>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   const renderModalContent = () => {
//     if (!selectedRecipe) return null;

//     return (
//       <Modal visible={!!selectedRecipe} animationType="slide" transparent>
//         <View style={modalStyles.modalContainer}>
//           <View style={modalStyles.modalContent}>
//             <Text style={modalStyles.modalTitle}>{selectedRecipe.title}</Text>
//             <Text style={modalStyles.modalDescription}>{selectedRecipe.description}</Text>
//             <Text style={modalStyles.modalSubtitle}>Ingredients:</Text>
//             <FlatList
//               data={selectedRecipe.ingredients}
//               renderItem={({ item }) => <Text style={modalStyles.modalText}>{item}</Text>}
//               keyExtractor={(item, index) => `ingredient-${index}`}
//             />
//             <Text style={modalStyles.modalSubtitle}>Steps:</Text>
//             <FlatList
//               data={selectedRecipe.steps}
//               renderItem={({ item }) => <Text style={modalStyles.modalText}>{item}</Text>}
//               keyExtractor={(item, index) => `step-${index}`}
//             />
//             <TouchableOpacity style={modalStyles.modalCloseButton} onPress={closeModal}>
//               <Text style={modalStyles.modalCloseButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={recipes}
//         renderItem={renderRecipeItem}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={{ flexGrow: 1 }}
//       />
//       {renderModalContent()}
//     </View>
//   );
// };

// export default MyRecipesPage;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, ActivityIndicator, Button, Alert, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/MyRecipesPageStyles'; // Import the main page styles
import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles
import { fetchUserRecipes, deleteRecipe } from '../firebase'; // Make sure these functions are correctly implemented in firebase.js
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

  const confirmDelete = (recipeId) => {
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
          onPress: () => handleDelete(recipeId)
        }
      ]
    );
  };

  const handleDelete = async (recipeId) => {
    try {
      await deleteRecipe(recipeId); // Ensure deleteRecipe is correctly implemented in firebase.js
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeItemContainer}>
      <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
        <Text style={styles.recipeTitle}>{item.recipeName}</Text>
        <Text style={styles.recipeDescription}>{item.instruction}</Text>
      </TouchableOpacity>
      {editMode && (
        <>
          <Button title="Edit" onPress={() => handleRecipePress(item)} />
          <Button title="Delete" onPress={() => confirmDelete(item.id)} />
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
        <Text style={styles.noRecipesText}>There are no recipes saved</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
      {renderModalContent()}
      {recipes.length > 0 && (
        <Button
          title={editMode ? "Done" : "Edit"}
          onPress={() => setEditMode(!editMode)}
          style={buttonStyles.editButton}
        />
      )}
      <NavigationBar user={user} />
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  editButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  }
});

export default MyRecipesPage;
