import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/NavigationBarStyles';
import { openCameraAndSendImage } from '../utils/cameraUtils';

const NavigationBar = ({ showHomeIcon = true, showSearchIcon = true }) => {
  const navigation = useNavigation();
  const [predictions, setPredictions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleHomePress = () => {
    navigation.navigate('HomePage');
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };

  const handleCameraPress = async () => {
    setPredictions([]); // Reset predictions before capturing a new image
    setRecipes([]); // Reset recipes
    setLoading(true); // Set loading to true
    const { predictions: newPredictions, recipes: newRecipes } = await openCameraAndSendImage();
    setPredictions(newPredictions); // Set the new predictions after the image is processed
    setRecipes(newRecipes); // Set the new recipes
    setLoading(false); // Set loading to false
    if (newPredictions.length > 0) {
      console.log('Predictions:', newPredictions);
      navigation.navigate('CamSearchPage', { predictions: newPredictions, recipes: newRecipes });
    }
  };

  const handlePlusPress = () => {
    navigation.navigate('AddRecipePage');
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      {showHomeIcon && (
        <TouchableOpacity style={styles.navIcon} onPress={handleHomePress}>
          <Entypo name="home" size={24} color="green" />
        </TouchableOpacity>
      )}
      {showSearchIcon && (
        <TouchableOpacity style={styles.navIcon} onPress={handleSearchPress}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.navIcon} onPress={handleCameraPress}>
        <Feather name="camera" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navIcon} onPress={handlePlusPress}>
        <Feather name="plus" size={24} color="black" />
      </TouchableOpacity>
      {loading && (
         <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default NavigationBar;
