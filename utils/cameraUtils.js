import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Alert, Platform, navigation } from 'react-native';
import { fetchRecipesFromEdamam } from '../utils/recipeService';

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const openCameraAndSendImage = async () => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera Permission Denied', 'Please grant camera access to take photos.');
      return { predictions: [], recipes: [] };
    }

    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      const capturedImageUri = result.uri || (result.assets && result.assets[0].uri);
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
        const { predictions, recipes } = await sendImageToRoboflow(base64Image);
        
        if (predictions.length === 0) {
          Alert.alert(
            'No Ingredients Detected',
            'No ingredients were detected in the captured image. Please try again.'
          );
        }
        
        return { predictions, recipes };
      } catch (error) {
        console.error('Error converting image to base64:', error);
        Alert.alert('Error', 'Failed to process the image.');
        return { predictions: [], recipes: [] };
      }
    } else {
      Alert.alert('Image capture cancelled or failed.');
      return { predictions: [], recipes: [] };
    }
  } catch (error) {
    console.error('Error opening camera:', error);
    Alert.alert('Error', 'Failed to open camera.');
    return { predictions: [], recipes: [] };
  }
};


const sendImageToRoboflow = async (base64Image) => {
  try {
    const response = await axios({
      method: "POST",
      url: 'https://detect.roboflow.com/smart-recipe/8',
      params: {
        api_key: 'exdYNCvMG7gXuZbha3yL'
      },
      data: base64Image,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const predictions = response.data["predictions"];
    if (predictions && predictions.length > 0) {
      const predictionsMap = new Map();
      predictions.forEach(prediction => {
        if (prediction.confidence >= 0.6) {
          const existingPrediction = predictionsMap.get(prediction.class);
          if (!existingPrediction || prediction.confidence > existingPrediction.confidence) {
            predictionsMap.set(prediction.class, {
              class: prediction.class,
              confidence: prediction.confidence.toFixed(2)
            });
          }
        }
      });

      const classes = Array.from(predictionsMap.values()).map(prediction => prediction.class);
      const recipes = await fetchRecipesFromEdamam(classes);

      console.log('Fetched recipes:', recipes.url); 

      const updatedPredictions = Array.from(predictionsMap.values());
      console.log('Predictions:', updatedPredictions);
      return { predictions: updatedPredictions, recipes }; // Pass recipes
    } else {
      return { predictions: [], recipes: [] }; // Return empty arrays if no predictions
    }
  } catch (error) {
    console.error('Error sending image to Roboflow:', error);
    Alert.alert('Error', 'Failed to send image to Roboflow.');
    return { predictions: [], recipes: [] }; // Return empty arrays on error
  }
};