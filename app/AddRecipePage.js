import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import NavigationBar from '../app/NavigationBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createCustomRecipe, updateCustomRecipe } from '../firebase';

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
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={setRecipeName}
      />
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Ingredients and Amounts"
        multiline
        numberOfLines={5}
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        style={[styles.input, { height: 200 }]}
        placeholder="Production Steps"
        multiline
        numberOfLines={10}
        value={productionSteps}
        onChangeText={setProductionSteps}
      />
      <Button title="Save" onPress={handleSave} />
      <NavigationBar user={user} showPlusButton={false} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default AddRecipePage;
