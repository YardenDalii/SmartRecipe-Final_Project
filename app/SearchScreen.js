import React, { useState } from 'react';
import { View, TextInput, FlatList, Button, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from '../stylesheets/SearchScreenStyles';
import NavigationBar from '../app/NavigationBar';
import { fetchRecipesFromEdamam } from '../utils/recipeService';


const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  

  const handleSearch = async () => {
    try{
      const recipes = await fetchRecipesFromEdamam([], searchTerm, 2);
      setUpdatedRecipes(recipes);
    } catch (error) {
      console.error('error fetching recipes:', error);
    }
    
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> General search page</Text>
      <Text> In here you can enter recipes name and ingridients name</Text>
      <TextInput 
        style={styles.searchInput}
        onChangeText={setSearchTerm}
        value = {searchTerm}
        multiline
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
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
