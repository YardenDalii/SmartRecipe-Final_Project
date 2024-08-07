import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, Image, Linking, Modal } from 'react-native';
import styles from '../stylesheets/SearchScreenStyles';
import NavigationBar from '../app/NavigationBar';
import { fetchRecipesFromEdamam, filters } from '../utils/recipeService';
import { Picker } from '@react-native-picker/picker';

const SearchScreen = ( { route } ) => {
  const { user } = route.params;
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
  console.log("user info 2", user);
  const handleSearch = async () => {
    try {
      const recipes = await fetchRecipesFromEdamam([], searchTerm, 2, selectedFilters);
      setUpdatedRecipes(recipes);
    } catch (error) {
      Alert.alert(
        "Error",
        `error fetching recipes: ${error.message}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      // console.error('error fetching recipes:', error);
    }
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch(err => Alert.alert(
                                              "Error",
                                              `Couldn't load page: ${error.message}`,
                                              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                                              { cancelable: false }
                                            )
    // console.error("Couldn't load page", err)
    );
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
      
      <NavigationBar showSearchIcon={false} user = {user}/>
    </View>
  );
};

export default SearchScreen;
