import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesheets/AboutPageStyles';

const AboutPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params || {};
    
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>How to picture your ingredients in the best way:</Text>
        
        <View style={styles.tutorialBox}>
          <Text style={styles.boxTitle}>✔ Flash</Text>
          <Text style={styles.boxDescription}>
            The flash is needed to ensure the ingredients are well-lit, which improves the model's recognition accuracy.
          </Text>
        </View>

        <View style={styles.tutorialBox}>
          <Text style={styles.boxTitle}>✔ Distance</Text>
          <Text style={styles.boxDescription}>
            The ingredients should be pictured in a way that each one is fully visible without capturing unconnected objects.
          </Text>
        </View>

        <View style={styles.tutorialBox}>
          <Text style={styles.boxTitle}>✔ Amount of Ingredients</Text>
          <Text style={styles.boxDescription}>
            The amount of ingredients in a picture is unlimited and doesn't affect the model's accuracy.
          </Text>
        </View>

        <View style={styles.tutorialBox}>
          <Text style={styles.boxTitle}>✔ Background</Text>
          <Text style={styles.boxDescription}>
            There is no restriction on the background behind the ingredients, so feel free to use any setting.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage', { user })}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>  
  );
};

export default AboutPage;
