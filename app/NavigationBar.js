import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Platform, Text } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import * as ImagePicker from 'expo-image-picker'; 
import axios from 'axios'; 
import styles from '../stylesheets/NavigationBarStyles';
import * as FileSystem from 'expo-file-system';

const NavigationBar = ({ showHomeIcon = true, showSearchIcon = true }) => {
  const navigation = useNavigation();
  const [predictions, setPredictions] = useState([]);

  const handleHomePress = () => {
    navigation.navigate('HomePage'); 
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen'); 
  };

  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera Permission Denied', 'Please grant camera access to take photos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync();
    console.log('ImagePicker result:', result);
    if (!result.cancelled) {
      const capturedImageUri = result.uri || (result.assets && result.assets[0].uri);
      console.log('Image captured URI:', capturedImageUri);
      
      let base64Image;
      try {
        if (Platform.OS === 'web') {
          const response = await fetch(capturedImageUri);
          const blob = await response.blob();
          base64Image = await convertBlobToBase64(blob);
        } else {
          base64Image = await FileSystem.readAsStringAsync(capturedImageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }
        console.log('Base64 Image:', base64Image); // Add logging to check base64 image string
        sendImageToRoboflow(base64Image);
      } catch (error) {
        console.error('Error converting image to base64:', error);
        Alert.alert('Error', 'Failed to process the image.');
      }
    } else {
      Alert.alert('Image capture cancelled or failed.');
    }
  };

  const handlePlusPress = () => {
    navigation.navigate('AddRecipePage'); 
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const sendImageToRoboflow = async (base64Image) => {
    try {
      const response = await axios({method: "POST", 
                                    url: 'https://detect.roboflow.com/smart-recipe/8',
                                    params: {
                                              api_key: 'exdYNCvMG7gXuZbha3yL'
                                    },
                                    data: base64Image, 
                                    headers: {
                                      'Content-Type': 'application/json'
                                    }
      });
      console.log('Roboflow response:', response.data["predictions"]);
      const predictions = response.data["predictions"];
      // Extract predictions from response and update state
      if (response.data && response.data.predictions && response.data.predictions.length > 0) {
        const updatedPredictions = response.data.predictions.map(prediction => ({
          class: prediction.class,
          confidence: prediction.confidence.toFixed(2)
        }));
        setPredictions(updatedPredictions);
      } else {
        setPredictions([]);
      }

      
    } catch (error) {
      console.error('Error sending image to Roboflow:', error);
      Alert.alert('Error', 'Failed to send image to Roboflow.');
    }
  };
  

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {predictions.length > 0 ? (
        predictions.map((prediction, index) => (
          <Text key={index} style={{ marginBottom: 10, fontSize: 18, textAlign: 'center' }}>
            {`Class: ${prediction.class}, Confidence: ${prediction.confidence}`}
          </Text>
        ))
      ) : (
        <Text style={{ fontSize: 18, textAlign: 'center' }}>No predictions available</Text>
      )}
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
      </View>
    </View>
  );
};

export default NavigationBar;
