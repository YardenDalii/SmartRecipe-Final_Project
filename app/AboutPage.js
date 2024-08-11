import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesheets/AboutPageStyles';

const AboutPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params || {};

  const handleDismiss = () => {
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Our App</Text>
      <Text style={styles.description}>
        This app provides a variety of features including recipe recommendations based on the time of day, searching for recipes using your camera, and more.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Dismiss" onPress={handleDismiss} />
      </View>
    </View>
  );
};

export default AboutPage;
