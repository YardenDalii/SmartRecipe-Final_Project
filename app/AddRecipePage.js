import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import NavigationBar from '../app/NavigationBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createCustomRecipe, updateCustomRecipe } from '../firebase';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

const AddRecipePage = () => {
  const route = useRoute();
  const { user, recipe } = route.params || {};
  const [recipeName, setRecipeName] = useState(recipe ? recipe.recipeName : '');
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients.map(ing => `${ing.name}: ${ing.quantity}`).join('\n') : ''
  );
  const [productionSteps, setProductionSteps] = useState(
    recipe ? recipe.productionSteps.join('\n') : ''
  );
  const navigation = useNavigation();

  const handleSave = async () => {
    const formattedIngredients = ingredients.split('\n').map(ingredient => ({
      name: ingredient.split(':')[0].trim(),
      quantity: ingredient.split(':')[1].trim()
    }));
    const formattedProductionSteps = productionSteps.split('\n');


    if (recipe) {
      // Update existing recipe
      const updatedRecipe = { ...recipe, recipeName, ingredients: formattedIngredients, productionSteps: formattedProductionSteps };
      await updateCustomRecipe(user, recipe.recipeName, updatedRecipe);
    } else {
      // Create new recipe
        await createCustomRecipe(user, recipeName, formattedIngredients, formattedProductionSteps);
      
    }


    navigation.navigate("MyRecipesPage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your recipe details</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Recipe Name"
          value={recipeName}
          onChangeText={setRecipeName}
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ingredients and Amounts (Example -> Tomato: 10g / Olive Oil: 3spoons) "
          multiline
          numberOfLines={5}
          value={ingredients}
          onChangeText={setIngredients}
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Production Steps (Each row is a step, example -> Slice the tomatoes into cubes.)"
          multiline
          numberOfLines={10}
          value={productionSteps}
          onChangeText={setProductionSteps}
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavigationBar user={user} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#F5F5F5", // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // Space around the title
    color: "#2F4F4F", // Dark green text color
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Add some bottom padding so content does not get hidden behind the navigation bar
  },
  input: {
    borderWidth: 1,
    borderColor: "#2F4F4F", // Dark green border
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: "#FFFFFF", // White background for inputs
    color: "#2F4F4F", // Dark green text color
  },
  textArea: {
    height: 120, // Text area height
  },
  button: {
    backgroundColor: "#2F4F4F", // Dark green color consistent with other pages
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF", // White text for contrast
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddRecipePage;
