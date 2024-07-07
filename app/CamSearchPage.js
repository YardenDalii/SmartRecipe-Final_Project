import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchRecipesFromEdamam } from '../utils/recipeService';
import styles from '../stylesheets/CamSearchPageStyles';
import NavigationBar from '../app/NavigationBar';

const CamSearchPage = () => {
  const route = useRoute();
  const { predictions } = route.params || {};
  
  // Initialize predictionText in state using predictions from route params
  const initialPredictionText = predictions ? predictions.map(pred => pred.class).join(', ') : '';
  const [predictionText, setPredictionText] = useState(initialPredictionText);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);

  // Update predictionText when predictions change
  useEffect(() => {
    setPredictionText(predictions ? predictions.map(pred => pred.class).join(', ') : '');
  }, [predictions]);

  const handleDoneEditing = () => {
    setIsEditing(false);
    const editedPredictions = predictionText.split(',').map(item => item.trim());
    setEditedPredictions(editedPredictions);
  };

  const handleSearch = async () => {
    try {
      const editedPredictions = predictionText.split(',').map(item => item.trim());
      const newRecipes = await fetchRecipesFromEdamam(editedPredictions, '', 1);
      setUpdatedRecipes(newRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.title}>The Ingredients:</Text>
        <View style={styles.predictionContainer}>
          <TextInput
            style={[styles.textInput, styles.boldText]}
            value={predictionText}
            onChangeText={setPredictionText}
            editable={isEditing}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.buttonText}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
        {!isEditing && (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        )}
        {updatedRecipes && updatedRecipes.length > 0 && (
          updatedRecipes.map((recipeData, index) => {
            const { recipe } = recipeData;
            return (
              <View key={index} style={styles.recipeCard}>
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{recipe.label}</Text>
                <TouchableOpacity onPress={() => handleOpenURL(recipe.url)}>
                  <Text style={styles.recipeUrl}>{recipe.url}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

export default CamSearchPage;
