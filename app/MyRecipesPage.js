import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import styles from '../stylesheets/MyRecipesPageStyles'; // Import the main page styles
import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles

const MyRecipesPage = () => {
  const recipes = [
    { id: 1, title: 'Pasta Carbonara', description: 'Classic Italian pasta dish', ingredients: ['Pasta', 'Eggs', 'Bacon'], steps: ['Cook pasta', 'Fry bacon', 'Mix eggs with pasta'] },
    { id: 2, title: 'Chocolate Cake', description: 'Decadent chocolate dessert', ingredients: ['Chocolate', 'Flour', 'Sugar'], steps: ['Mix ingredients', 'Bake in oven', 'Enjoy!'] },
    // Add more recipes as needed
  ];

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderModalContent = () => {
    if (!selectedRecipe) return null;

    return (
      <Modal visible={!!selectedRecipe} animationType="slide" transparent>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>{selectedRecipe.title}</Text>
            <Text style={modalStyles.modalDescription}>{selectedRecipe.description}</Text>
            <Text style={modalStyles.modalSubtitle}>Ingredients:</Text>
            <FlatList
              data={selectedRecipe.ingredients}
              renderItem={({ item }) => <Text style={modalStyles.modalText}>{item}</Text>}
              keyExtractor={(item, index) => `ingredient-${index}`}
            />
            <Text style={modalStyles.modalSubtitle}>Steps:</Text>
            <FlatList
              data={selectedRecipe.steps}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {renderModalContent()}
    </View>
  );
};

export default MyRecipesPage;
