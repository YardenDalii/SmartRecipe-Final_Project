import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, Image, Linking, Modal } from 'react-native';
import styles from '../stylesheets/SearchScreenStyles';
import NavigationBar from '../app/NavigationBar';
import { fetchRecipesFromEdamamByName, filters } from '../utils/recipeService';
import { Picker } from '@react-native-picker/picker';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    diet: 'none',
    health: 'none',
    cuisineType: 'none',
    mealType: 'none',
    dishType: 'none'
  });
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    try {
      const recipes = await fetchRecipesFromEdamamByName(selectedFilters, searchTerm, 2);
      setUpdatedRecipes(recipes);
    } catch (error) {
      console.error('error fetching recipes:', error);
    }
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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
      <Text style={styles.title}>General Search Page</Text>
      <Text>Enter recipe names and ingredient names</Text>
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchTerm}
        value={searchTerm}
        multiline
      />
      <TouchableOpacity style={styles.filterImageButton} onPress={toggleModal}>
        <Image
          source={require('../assets/filter.jpg')}
          style={styles.filterImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      

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

      <ScrollView>
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
      <NavigationBar showSearchIcon={false} />
    </View>
  );
};

export default SearchScreen;
