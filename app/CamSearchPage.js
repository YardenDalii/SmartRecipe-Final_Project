import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchRecipesFromEdamam } from '../utils/recipeService';
import styles from '../stylesheets/CamSearchPageStyles';
import NavigationBar from '../app/NavigationBar';

const CamSearchPage = () => {
  const route = useRoute();
  const { predictions } = route.params || {};
  
  const initialPredictionText = predictions ? predictions.map(pred => pred.class).join(', ') : '';
  const [predictionText, setPredictionText] = useState(initialPredictionText);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [meatType, setMeatType] = useState('');
  const [showMeatInput, setShowMeatInput] = useState(false);

  useEffect(() => {
    const initialText = predictions ? predictions.map(pred => pred.class).join(', ') : '';
    console.log("initialText",initialText);
    setPredictionText(initialText);
    if (initialText.toLowerCase().includes('beef')) {
      setShowMeatInput(true);
    } else {
      setShowMeatInput(false);
    }
    console.log("showMeatInput",showMeatInput);
  }, [predictions]);

  const handleDoneEditing = () => {
    setIsEditing(false);
    const editedPredictions = predictionText.split(',').map(item => item.trim());
    setEditedPredictions(editedPredictions);
    console.log("predictionText",predictionText);
    if (predictionText.toLowerCase().includes('beef')) {
      setShowMeatInput(true);
    } else {
      setShowMeatInput(false);
    }
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

  const handleMeatTypeSubmit = () => {
    const updatedText = predictionText.replace(/beef/gi, `beef (${meatType})`);
    setPredictionText(updatedText);
    setShowMeatInput(false);
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
        {showMeatInput && (
          <View style={styles.meatInputContainer}>
            <Text style={styles.meatInputLabel}>Please specify the type of meat:</Text>
            <TextInput
              style={styles.meatInput}
              value={meatType}
              onChangeText={setMeatType}
            />
            <TouchableOpacity style={styles.meatInputButton} onPress={handleMeatTypeSubmit}>
              <Text style={styles.meatInputButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
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
