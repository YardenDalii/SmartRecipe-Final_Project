import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesheets/AboutPageStyles';

const AboutPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>how to find the perfect recipe in the shortest time?</Text>
      <Text style={styles.description}>
        ✔ Searching for a recipe by picturing the ingredients you have.
      </Text>
      <Text style={styles.description}>
        ✔ Image recognition model with 80% accuracy.
      </Text>
      <Text style={styles.description}>
        ✔ Recipe Management platform:
      </Text>
      <View style={styles.subList}>
        <Text style={styles.description}>
          ✔ Option to save favorite recipes.
        </Text>
        <Text style={styles.description}>
          ✔ Option to write down and save your own recipes.
        </Text>
      </View>
      <Text style={styles.description}>
        ✔ Searching by a recipe name.
      </Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LoginPage")}>
              <Text style={styles.buttonText}>Back To Login Page</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutPage;
