import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../stylesheets/AboutUsPageStyles'; // Import the styles from the separate file

const AboutUsPage = ({ navigation, user }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>How to find the perfect recipe in the shortest time?</Text>
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
            <View style={styles.developerSection}>
                <Text style={styles.developerTitle}>About the Developers</Text>
                <Text style={styles.developerDescription}>
                    This app was developed by Yarden Dali and Ester Moiseyev, passionate software engineers dedicated to creating seamless and user-friendly applications. We hope this app makes finding the perfect recipe easier and more enjoyable for you.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomePage", { user })}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AboutUsPage;