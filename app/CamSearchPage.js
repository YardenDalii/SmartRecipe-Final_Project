import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Linking, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchRecipesFromEdamam, filters } from '../utils/recipeService';
import styles from '../stylesheets/CamSearchPageStyles';
import NavigationBar from '../app/NavigationBar';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import { addFavRecipe } from '../firebase';


const CamSearchPage = () => {
  const route = useRoute();
  const { predictions, user } = route.params || {};  // Destructure predictions and user from route.params
  const initialPredictionText = predictions ? predictions.map(pred => pred.class).join(', ') : '';
  const [predictionText, setPredictionText] = useState(initialPredictionText);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [meatType, setMeatType] = useState('');
  const [showMeatInput, setShowMeatInput] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    diet: 'none',
    health: 'none',
    cuisineType: 'none',
    mealType: 'none',
    dishType: 'none'
  });
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const initialText = predictions ? predictions.map(pred => pred.class).join(', ') : '';
    console.log("initialText", initialText);
    setPredictionText(initialText);

    const hasBeef = initialText.toLowerCase().includes('beef');
    const hasMincedMeat = initialText.toLowerCase().includes('minced meat');

    if (hasBeef && hasMincedMeat) {
      setShowMeatInput(false);
    } else if (hasBeef) {
      setShowMeatInput(true);
    } else {
      setShowMeatInput(false);
    }
  }, [predictions]);

  const handleDoneEditing = () => {
    setIsEditing(false);
    const editedPredictions = predictionText.split(',').map(item => item.trim());
    console.log("predictionText", predictionText);

    const hasBeef = predictionText.toLowerCase().includes('beef');
    const hasMincedMeat = predictionText.toLowerCase().includes('minced meat');

    if (hasBeef && hasMincedMeat) {
    Alert.alert("Clarification Needed", "Both 'beef' and 'minced meat' detected. Please clarify.");
    setShowMeatInput(true);
  } else if (hasBeef) {
    setShowMeatInput(true);
  } else {
    setShowMeatInput(false);
  }
};

  const handleSearch = async () => {
    try {
      const editedPredictions = predictionText.split(',').map(item => item.trim());
      const newRecipes = await fetchRecipesFromEdamam(editedPredictions, '', 1, selectedFilters);
      setUpdatedRecipes(newRecipes);
    } catch (error) {
      Alert.alert(
        "Error",
        `Error fetching recipes: ${error.message}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      )
      // console.error('Error fetching recipes:', error);
    }
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch(err => Alert.alert(
                                        "Error",
                                        `Couldn't load page: ${error.message}`,
                                        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                                        { cancelable: false }
                                      )
    //console.error("Couldn't load page", err)
    );
  };


  const handleAddFavorite = async (user, image, label, uri, url) => {
    try {
      await addFavRecipe(user, image, label, uri, url);
      Alert.alert(
        'Recipe Added!',
        `${label} has beed added to favorites.`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
      console.log('Recipe added to favorites');
    } catch (error) {
      Alert.alert(
        "Error",
        `Error adding to favorites: ${error.message}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
    );
      // console.error('Error adding to favorites:', error);
    }
  };


  const handleMeatTypeSubmit = () => {
    const updatedText = predictionText.replace(/beef/gi, `beef (${meatType})`);
    setPredictionText(updatedText);
    setShowMeatInput(false);
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [category]: value
    }));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Ingredients:</Text>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}> 
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.buttonText}>{isEditing ? 'Done' : 'Edit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <Image
            source={require('../assets/filter.jpg')}
            style={styles.filterImage}
          />   
          </TouchableOpacity>

        </View>
        {!isEditing && (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
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
                <TouchableOpacity onPress={() => handleAddFavorite(user, recipe.image, recipe.label, recipe.uri, recipe.url)}>
                  <Feather name="star" size={24} color="black" />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Filters</Text>
            <ScrollView>
              {Object.keys(filters).map(category => (
                <View key={category} style={styles.filterSection}>
                  <Text style={styles.filterTitle}>{category}</Text>
                  <Picker
                    selectedValue={selectedFilters[category]}
                    onValueChange={value => handleFilterChange(category, value)}
                  >
                    {filters[category].map(option => (
                      <Picker.Item key={option} label={option} value={option} />
                    ))}
                  </Picker>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <NavigationBar user={user} />
    </View>
  );
};

export default CamSearchPage;