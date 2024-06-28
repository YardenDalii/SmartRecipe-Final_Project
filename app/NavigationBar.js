import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import * as ImagePicker from 'expo-image-picker'; // Import for camera functionality
import styles from '../stylesheets/NavigationBarStyles';

const NavigationBar = ({ showHomeIcon = true, showSearchIcon = true }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('HomePage'); // Navigate to your home screen route
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen'); // Navigate to your search screen route
  };

  const handleCameraPress = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      // Open camera if permission granted
      let result = await ImagePicker.launchCameraAsync();
      console.log(result);
    } else {
      // Handle permissions denied
      console.log('Camera permission denied');
    }
  };

  const handlePlusPress = () => {
    navigation.navigate('AddRecipePage'); 
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
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
    </View>
  );
};

export default NavigationBar;
