import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/NavigationBarStyles';
import { openCameraAndSendImage } from '../utils/cameraUtils';
import { auth } from '../firebase'; // Import Firebase auth

const NavigationBar = ({ showHomeIcon = true, showSearchIcon = true, showPlusButton = true, user }) => {
  const navigation = useNavigation();
  const [predictions, setPredictions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Update isLoggedIn based on whether user is logged in
    });

    return () => unsubscribe();
  }, []);

  const handleHomePress = () => {
    navigation.navigate('HomePage', { user });
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen', { user });
  };

  const handleCameraPress = async () => {
    setPredictions([]);
    setRecipes([]);
    setLoading(true);

    const { predictions: newPredictions, recipes: newRecipes } = await openCameraAndSendImage(navigation);

    setPredictions(newPredictions);
    setRecipes(newRecipes);
    setLoading(false);

    if (newPredictions.length > 0) {
      navigation.navigate('CamSearchPage', { predictions: newPredictions, recipes: newRecipes, user });
    }
  };

  const handlePlusPress = () => {
    navigation.navigate('AddRecipePage', { user });
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
      {isLoggedIn && showPlusButton && (
        <TouchableOpacity style={styles.navIcon} onPress={handlePlusPress}>
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      )}
      {loading && (
        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default NavigationBar;
