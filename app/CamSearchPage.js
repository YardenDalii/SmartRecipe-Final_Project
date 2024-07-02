import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchRecipesFromEdamam } from '../utils/recipeService';
import styles from '../stylesheets/CamSearchPageStyles';
import NavigationBar from '../app/NavigationBar';

const CamSearchPage = () => {
  const route = useRoute();
  const { predictions, recipes } = route.params || {};
  const [editedClass, setEditedClass] = useState(predictions ? predictions[0].class : '');
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [updatedRecipes, setUpdatedRecipes] = useState(recipes || []);

  const handleSearch = async () => {
    try {
      const newRecipes = await fetchRecipesFromEdamam([editedClass]);
      setUpdatedRecipes(newRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {predictions && predictions.length > 0 ? (
          <View style={styles.predictionContainer}>
            <TextInput
              style={styles.textInput}
              value={editedClass}
              onFocus={() => setShowSearchButton(true)}
              onChangeText={text => setEditedClass(text)}
            />
          </View>
        ) : (
          <Text style={{ fontSize: 18, textAlign: 'center' }}>No predictions available</Text>
        )}
        {showSearchButton && (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        )}
        {updatedRecipes && updatedRecipes.length > 0 ? (
          updatedRecipes.map((recipeData, index) => {
            const { recipe } = recipeData;
            return (
              <View key={index} style={styles.recipeCard}>
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{recipe.label}</Text>
                <Text style={styles.recipeUrl}>{recipe.url}</Text>
              </View>
            );
          })
        ) : (
          <Text style={{ fontSize: 18, textAlign: 'center' }}>No recipes available</Text>
        )}
      </ScrollView>
      <NavigationBar  />
    </View>
  );
};

export default CamSearchPage;
