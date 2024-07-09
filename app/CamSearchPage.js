import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Linking, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchRecipesFromEdamam, filters } from '../utils/recipeService';
import styles from '../stylesheets/CamSearchPageStyles';
import NavigationBar from '../app/NavigationBar';
import { Picker } from '@react-native-picker/picker';


const CamSearchPage = () => {
  const route = useRoute();
  const { predictions } = route.params || {};  
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
      const newRecipes = await fetchRecipesFromEdamam(editedPredictions, '', 1, selectedFilters);
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
        <TouchableOpacity style={styles.filterImageButton} onPress={toggleModal}>
        <Image
          source={require('../assets/filter.jpg')}
          style={styles.filterImage}
        />
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
      <NavigationBar />
    </View>
  );
};

export default CamSearchPage;
