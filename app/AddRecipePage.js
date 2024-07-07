import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import NavigationBar from '../app/NavigationBar';


const AddRecipePage = () => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [productionSteps, setProductionSteps] = useState('');

    const handleSave = () => {
        // Implement save logic here, e.g., send data to backend or store locally
        console.log('Recipe Name:', recipeName);
        console.log('Ingredients:', ingredients);
        console.log('Production Steps:', productionSteps);

        // Optionally, you can navigate back to previous screen or perform other actions
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Recipe Name"
                value={recipeName}
                onChangeText={setRecipeName}
            />
            <TextInput
                style={[styles.input, { height: 120 }]} // Adjust height as needed
                placeholder="Ingredients and Amounts"
                multiline
                numberOfLines={5} // Adjust based on your design
                value={ingredients}
                onChangeText={setIngredients}
            />
            <TextInput
                style={[styles.input, { height: 200 }]} // Adjust height as needed
                placeholder="Production Steps"
                multiline
                numberOfLines={10} // Adjust based on your design
                value={productionSteps}
                onChangeText={setProductionSteps}
            />
            <Button
                title="Save"
                onPress={handleSave}
            />
            <NavigationBar  />
        </ScrollView>

        
        
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
});

export default AddRecipePage;
